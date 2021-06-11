const assert = require("assert");
const { readFileSync } = require("fs");
const ganache = require("ganache-cli");
const Web3 = require("web3");

const toWei = (str) => Web3.utils.toWei(str, "ether");
const fromWei = (str) => Web3.utils.fromWei(str, "ether");

const web3 = new Web3(
  ganache.provider({
    accounts: [
      { balance: toWei("100") }, // admin
      { balance: toWei("100") }, // manager
      { balance: toWei("100") }, // investor
    ],
    //gasLimit: 6721975,
  })
);
const CompanyProducerJSON = JSON.parse(
  readFileSync("../build/CompanyProducer.json", "utf-8")
);
const CompanyJSON = JSON.parse(readFileSync("../build/Company.json", "utf-8"));
const StonkJSON = JSON.parse(readFileSync("../build/Stonk.json", "utf-8"));

let accounts;
let companyProducer;
let company;
let stonk;
const gas = { gas: 6721975, gasPrice: "20000000000" }; //default ganache-cli params

before(async () => {
  // get list of accounts
  accounts = await web3.eth.getAccounts();

  // deploy companyProducer
  companyProducer = await new web3.eth.Contract(CompanyProducerJSON.abi)
    .deploy({ data: CompanyProducerJSON.evm.bytecode.object })
    .send({ from: accounts[0], ...gas });
  console.log("companyProducer deployed");

  // create company
  await companyProducer.methods
    .createCompany("ali mama shop", "ALI", 900) //900 shares outstanding
    .send({ from: accounts[1], ...gas });

  const getCompanyAddresses = await companyProducer.methods
    .getCompanyAddresses()
    .call();
  company = await new web3.eth.Contract(
    CompanyJSON.abi,
    getCompanyAddresses[0]
  );

  console.log("company created");

  const stonkAddress = await company.methods.getStonkAddress().call();
  stonk = await new web3.eth.Contract(StonkJSON.abi, stonkAddress);

  console.log("stonk created");
});

// testing

describe("TESTS", () => {
  // create specific company at address
  it("deploys a companyProducer and a company", async () => {
    assert.ok(companyProducer.options.address);
    assert.ok(company.options.address);
    const totalSupply = await stonk.methods.totalSupply().call();
    assert.strictEqual(totalSupply, "900");
  });

  it("marks caller as the company manager", async () => {
    const manager = await company.methods.manager().call();
    assert.strictEqual(accounts[1], manager);
  });

  it("creates funding round", async () => {
    company.methods
      .createFundingRound(toWei("10"), 100) //10 ETH, 100 shares offered (10% stake)
      .send({ from: accounts[1], ...gas });
  });

  it("records the amount invested by each person", async () => {
    let investedAmount;
    investedAmount = await company.methods
      .getInvestedAmount(accounts[2])
      .call();
    assert.strictEqual(parseInt(investedAmount), 0);
    await company.methods.invest().send({
      value: toWei("8"),
      from: accounts[2],
      ...gas,
    });
    investedAmount = await company.methods
      .getInvestedAmount(accounts[2])
      .call();
    assert.strictEqual(investedAmount, toWei("8"));
  });

  it("allows manager to reject funding round and refund investors", async () => {
    await company.methods.invest().send({
      value: toWei("2"),
      from: accounts[1],
      ...gas,
    });

    fundingRoundSummary = await company.methods
      .getFundingRoundSummary(0)
      .call();
    console.log(fundingRoundSummary);

    const begBalance = fromWei(await web3.eth.getBalance(accounts[2]));

    await company.methods.rejectFundingRound().send({
      from: accounts[1],
      ...gas,
    });

    const endBalance = fromWei(await web3.eth.getBalance(accounts[2]));

    assert.strictEqual(parseFloat(endBalance) - parseFloat(begBalance), 8);
  });

  it("allows manager to accept funding round and shares are distributed", async () => {
    company.methods
      .createFundingRound(toWei("5"), 100) //5 ETH, 100 shares offered (10% stake)
      .send({ from: accounts[1], ...gas });

    await company.methods.invest().send({
      value: toWei("4"),
      from: accounts[2],
      ...gas,
    });

    await company.methods.invest().send({
      value: toWei("1"),
      from: accounts[1],
      ...gas,
    });

    await company.methods.acceptFundingRound().send({
      from: accounts[1],
      ...gas,
    });

    const totalSupply = await stonk.methods.totalSupply().call();
    console.log(totalSupply);
    assert.strictEqual(parseInt(totalSupply), 1000);
    const mgrShares = await stonk.methods.balanceOf(accounts[1]).call();
    assert.strictEqual(parseInt(mgrShares), 20);
    const investorShares = await stonk.methods.balanceOf(accounts[2]).call();
    assert.strictEqual(parseInt(investorShares), 80);
  });

  it("ensures tokenized shares can be transferred", async () => {
    await stonk.methods.transfer(accounts[0], 20).send({
      from: accounts[1],
      ...gas,
    });

    const mgrShares = await stonk.methods.balanceOf(accounts[1]).call();
    assert.strictEqual(parseInt(mgrShares), 0);
    const adminShares = await stonk.methods.balanceOf(accounts[0]).call();
    assert.strictEqual(parseInt(adminShares), 20);
  });

  it("allows manager to withdraw funds", async () => {
    const begBalance = fromWei(await web3.eth.getBalance(accounts[0]));
    await company.methods.withdraw(toWei("5"), accounts[0]).send({
      from: accounts[1],
      ...gas,
    });
    const endBalance = fromWei(await web3.eth.getBalance(accounts[0]));
    assert(parseFloat(endBalance) - parseFloat(begBalance) == 5);
  });
});

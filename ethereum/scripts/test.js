const fs = require("fs");
const path = require("path");
const Web3 = require("web3");
const ganache = require("ganache-cli");
const assert = require("assert");

const toWei = (str) => Web3.utils.toWei(str, "ether");
const fromWei = (str) => Web3.utils.fromWei(str, "ether");

const p = path.resolve(__dirname, "../build/contracts.json");
const { CompanyProducer, Company } = JSON.parse(fs.readFileSync(p, "utf-8"));

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

let accounts;
let companyProducer;
let company;
const gas = { gas: 6721975, gasPrice: "20000000000" }; //default ganache-cli params

before(async () => {
  // get list of accounts
  accounts = await web3.eth.getAccounts();
  console.log(accounts);

  // deploy companyProducer
  companyProducer = await new web3.eth.Contract(CompanyProducer.abi)
    .deploy({ data: CompanyProducer.evm.bytecode.object })
    .send({ from: accounts[0], ...gas });
  console.log("companyProducer deployed");

  // create company
  await companyProducer.methods
    .createCompany("ali mama shop", "ALI", 900) //900 shares outstanding
    .send({ from: accounts[1], ...gas });

  const companyAddresses = await companyProducer.methods
    .getCompanyAddresses()
    .call();
  company = await new web3.eth.Contract(Company.abi, companyAddresses[0]);

  console.log("company created");
});

// testing

describe("TESTS", () => {
  it("deploys a companyProducer, creates a company and tokenized shares", async () => {
    assert.ok(companyProducer.options.address);
    assert.ok(company.options.address);
    const totalSupply = await company.methods.totalSupply().call();
    assert.strictEqual(totalSupply, "900");
  });

  it("marks caller as the company manager", async () => {
    const managerAddress = await company.methods.managerAddress().call();
    assert.strictEqual(accounts[1], managerAddress);
  });

  it("creates funding round", async () => {
    company.methods
      .createFundingRound(toWei("10"), 100) //10 ETH, 100 shares offered (10% stake)
      .send({ from: accounts[1], ...gas });
  });

  it("records the amount invested by each person", async () => {
    let investedAmount;
    investedAmount = await company.methods.getInvestment(accounts[2]).call();
    assert.strictEqual(parseInt(investedAmount), 0);
    await company.methods.invest().send({
      value: toWei("8"),
      from: accounts[2],
      ...gas,
    });
    investedAmount = await company.methods.getInvestment(accounts[2]).call();
    assert.strictEqual(investedAmount, toWei("8"));
  });

  it("allows manager to reject funding round and refund investors", async () => {
    await company.methods.invest().send({
      value: toWei("1"),
      from: accounts[1],
      ...gas,
    });

    const begBalance = fromWei(await web3.eth.getBalance(accounts[2]));

    await company.methods.concludeFundingRound().send({
      from: accounts[1],
      ...gas,
    });

    const endBalance = fromWei(await web3.eth.getBalance(accounts[2]));

    assert.strictEqual(parseFloat(endBalance) - parseFloat(begBalance), 8);
  });

  it("allows manager to accept funding round and distribute tokenized shares", async () => {
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

    let fundingRoundSummary = await company.methods
      .getFundingRoundSummary(2)
      .call();
    console.log(fundingRoundSummary);

    await company.methods.concludeFundingRound().send({
      from: accounts[1],
      ...gas,
    });

    const totalSupply = await company.methods.totalSupply().call();
    console.log(totalSupply);
    assert.strictEqual(parseInt(totalSupply), 1000);
    const mgrShares = await company.methods.balanceOf(accounts[1]).call();
    assert.strictEqual(parseInt(mgrShares), 20);
    const investorShares = await company.methods.balanceOf(accounts[2]).call();
    assert.strictEqual(parseInt(investorShares), 80);
  });

  it("ensures tokenized shares can be transferred", async () => {
    await company.methods.transfer(accounts[0], 20).send({
      from: accounts[1],
      ...gas,
    });

    const mgrShares = await company.methods.balanceOf(accounts[1]).call();
    assert.strictEqual(parseInt(mgrShares), 0);
    const adminShares = await company.methods.balanceOf(accounts[0]).call();
    assert.strictEqual(parseInt(adminShares), 20);
  });

  it("allows manager to withdraw funds", async () => {
    const begBalance = fromWei(await web3.eth.getBalance(accounts[0]));
    await company.methods.withdraw(toWei("1"), accounts[0]).send({
      from: accounts[1],
      ...gas,
    });
    const endBalance = fromWei(await web3.eth.getBalance(accounts[0]));
    assert(parseFloat(endBalance) - parseFloat(begBalance) == 1);
  });

  it("prints details", async () => {
    let companyDetails = await company.methods.getCompanyDetails().call();
    console.log(companyDetails);
    assert.strictEqual(companyDetails[0], "ali mama shop");
  });

  it("allows manager to payout dividends to token holders", async () => {
    const begBalance = fromWei(await web3.eth.getBalance(accounts[0]));
    console.log(begBalance);
    await company.methods.payoutDividends(toWei("4")).send({
      from: accounts[1],
      ...gas,
    });
    const endBalance = fromWei(await web3.eth.getBalance(accounts[0]));
    console.log(endBalance);
    //assert(parseFloat(endBalance) - parseFloat(begBalance) == 4);
  });
});

const assert = require("assert");
const { readFileSync } = require("fs");
const ganache = require("ganache-cli");
const Web3 = require("web3");

const toWei = (x) => Web3.utils.toWei(x, "ether");
const fromWei = (x) => Web3.utils.fromWei(x, "ether");

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

let accounts;
let companyProducer;
let company;
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

  const companies = await companyProducer.methods.getCompanies().call();
  company = await new web3.eth.Contract(CompanyJSON.abi, companies[0]);
  console.log("company created");
});

// testing

describe("TESTS", () => {
  // create specific company at address
  it("deploys a companyProducer and a company", () => {
    assert.ok(companyProducer.options.address);
    assert.ok(company.options.address);
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
    fundingRoundSummary = await company.methods
      .getFundingRoundSummary(0)
      .call();
    console.log(fundingRoundSummary);

    const begBalance = fromWei(await web3.eth.getBalance(accounts[2]));
    console.log(begBalance);

    await company.methods.rejectFundingRound().send({
      from: accounts[1],
      ...gas,
    });

    const endingBalance = fromWei(await web3.eth.getBalance(accounts[2]));
    console.log(endingBalance);

    assert(parseFloat(endingBalance) - parseFloat(begBalance) == 8);
  });
});

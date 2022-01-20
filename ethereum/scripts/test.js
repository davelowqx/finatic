const fs = require("fs");
const path = require("path");
const Web3 = require("web3");
const ganache = require("ganache-cli");
const assert = require("assert");

const fromWei = (str) => Web3.utils.fromWei(`${str}`, "ether");
const toWei = (str) => Web3.utils.toWei(`${str}`, "ether");

const p = path.resolve(__dirname, "../build/contracts.json");
const { CampaignProducer, Campaign } = JSON.parse(fs.readFileSync(p, "utf-8"));

const web3 = new Web3(
  ganache.provider({
    accounts: [
      { balance: toWei("100") }, // admin
      { balance: toWei("100") }, // manager
      { balance: toWei("100") }, // investor
    ],
  })
);

let accounts;
let campaignProducer;
let campaign;
const gas = { gas: 6721975, gasPrice: "20000000000" }; //default ganache-cli params

before(async () => {
  // get list of accounts
  accounts = await web3.eth.getAccounts();
  console.log(accounts);

  // deploy campaignProducer
  campaignProducer = await new web3.eth.Contract(CampaignProducer.abi)
    .deploy({ data: CampaignProducer.evm.bytecode.object })
    .send({ from: accounts[0], ...gas });
  console.log("campaignProducer deployed");

  // create campaign
  let campaignAddress;
  await campaignProducer.methods
    .listCampaign("ali mama shop", "ALI", toWei("0.01")) //0.01 ETH
    .send({ from: accounts[1], ...gas })
    .on("receipt", async (receipt) => {
      campaignAddress =
        receipt.events.ListCampaign.returnValues.campaignAddress;
    });
  campaign = await new web3.eth.Contract(Campaign.abi, campaignAddress);
  console.log("campaign created");
});

// testing

describe("TESTS", () => {
  it("deploys a campaignProducer, creates a campaign", async () => {
    assert.ok(campaignProducer.options.address);
    assert.ok(campaign.options.address);
  });

  it("campaign has correct target amount", async () => {
    const totalSupply = await campaign.methods.targetAmount().call();
    assert.strictEqual(totalSupply, toWei("0.01"));
  });

  it("campaign manager is caller", async () => {
    const managerAddress = await campaign.methods.managerAddress().call();
    assert.strictEqual(accounts[1], managerAddress);
  });

  it("allows investment", async () => {
    await campaign.methods.invest().send({
      value: toWei("0.005"),
      from: accounts[2],
      ...gas,
    });
    const investedAmount = await web3.eth.getBalance(campaign.options.address);
    assert.strictEqual(investedAmount, toWei("0.005"));
  });

  it("allows manager to conclude campaign and refund investors", async () => {
    const begBalance = await web3.eth.getBalance(accounts[2]);

    await campaign.methods
      .concludeCampaign()
      .send({
        from: accounts[1],
        ...gas,
      })
      .on("receipt", (receipt) => console.log("concluding campaign, refund"));

    const endBalance = await web3.eth.getBalance(accounts[2]);

    console.log(fromWei(endBalance - begBalance), "ETH difference");
    assert.ok(endBalance - begBalance < toWei("0.005"));
  });

  it("allows manager to conclude campaign and distribute tokenized shares", async () => {
    await campaign.methods.invest().send({
      value: toWei("0.005"),
      from: accounts[1],
      ...gas,
    });

    await campaign.methods
      .concludeFundingRound()
      .send({
        from: accounts[1],
        ...gas,
      })
      .on("receipt", (receipt) =>
        console.log("conclude campaign, distribute)")
      );

    const totalSupply = await campaign.methods.totalSupply().call();
    console.log(totalSupply);
    assert.strictEqual(parseInt(totalSupply), fromWei("0.01"));
    const mgrShares = await campaign.methods.balanceOf(accounts[1]).call();
    assert.strictEqual(parseInt(mgrShares), fromWei("0.005"));
    const investorShares = await campaign.methods.balanceOf(accounts[2]).call();
    assert.strictEqual(parseInt(investorShares), fromWei("0.005"));
  });

  //   it("ensures tokenized shares can be transferred", async () => {
  //     await campaign.methods
  //       .transfer(accounts[0], 20)
  //       .send({
  //         from: accounts[1],
  //         ...gas,
  //       })
  //       .on("receipt", (receipt) => console.log("transfer"));

  //     const mgrShares = await campaign.methods.balanceOf(accounts[1]).call();
  //     assert.strictEqual(parseInt(mgrShares), 900);
  //     const adminShares = await campaign.methods.balanceOf(accounts[0]).call();
  //     assert.strictEqual(parseInt(adminShares), 20);
  //   });

  //   it("allows manager to withdraw funds", async () => {
  //     const begBalance = fromWei(await web3.eth.getBalance(accounts[1]));
  //     await campaign.methods
  //       .withdraw(toWei("1"))
  //       .send({
  //         from: accounts[1],
  //         ...gas,
  //       })
  //       .on("receipt", (receipt) => console.log("withdrawal"));

  //     const endBalance = fromWei(await web3.eth.getBalance(accounts[1]));
  //     assert.strictEqual(parseFloat(endBalance) - parseFloat(begBalance), 1);
  //   });
});

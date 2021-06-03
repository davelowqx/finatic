const assert = require("assert");
const { readFileSync } = require("fs");
const ganache = require("ganache-cli");
const Web3 = require("web3");

const web3 = new Web3(
  ganache.provider({
    accounts: [
      { balance: Web3.utils.toWei("1000", "ether") },
      { balance: Web3.utils.toWei("100", "ether") },
      { balance: Web3.utils.toWei("100", "ether") },
    ],
  })
);
const compiledCampaignFactory = JSON.parse(
  readFileSync("../build/CampaignFactory.json", "utf-8")
);
const compiledCampaign = JSON.parse(
  readFileSync("../build/Campaign.json", "utf-8")
);

let accounts;
let campaignFactory;
let campaign;
let campaignAddress;
const gas = { gas: 1500000, gasPrice: "30000000000000" };

beforeEach(async () => {
  // get list of accounts
  accounts = await web3.eth.getAccounts();

  // deploy campaignFactory
  campaignFactory = await new web3.eth.Contract(compiledCampaignFactory.abi)
    .deploy({ data: compiledCampaignFactory.evm.bytecode.object })
    .send({ from: accounts[0], ...gas });

  // create sample campaign with target 100 wei
  await campaignFactory.methods
    .createCampaign(100)
    .send({ from: accounts[0], ...gas });

  // check the campaigns
  const addresses = await campaignFactory.methods.getCampaigns().call();
  campaignAddress = addresses[0];

  campaign = await new web3.eth.Contract(
    // parse as JSON the ABI for campaign
    // use this code when contract already deployed and want web3 to know of its existance
    compiledCampaign.abi,
    campaignAddress
  );
});
// testing
describe("Campaigns", () => {
  it("deploys a campaignFactory and a campaign", () => {
    assert.ok(campaignFactory.options.address);
    assert.ok(campaign.options.address);
  });

  it("marks caller as the campaign founder", async () => {
    const founder = await campaign.methods.founder().call();
    assert.strictEqual(accounts[0], founder);
  });

  it("records the amount invested by each person", async () => {
    let investedAmount;
    investedAmount = await campaign.methods.investors(accounts[1]).call();
    assert.strictEqual(parseInt(investedAmount), 0);
    await campaign.methods.invest().send({
      value: 200,
      from: accounts[1],
      ...gas,
    });
    investedAmount = await campaign.methods.investors(accounts[1]).call();
    assert.strictEqual(parseInt(investedAmount), 200);
    await campaign.methods.invest().send({
      value: 100,
      from: accounts[1],
      ...gas,
    });
    investedAmount = await campaign.methods.investors(accounts[1]).call();
    assert.strictEqual(parseInt(investedAmount), 300);
  });
  /*
  //check if person contributed minimum amount
  it("requires a minimum contribution ", async () => {
    //send in less than minimum contribution
    try {
      await campaign.methods.contribute().send({
        value: "5",
        from: accounts[1],
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });
*/

  it("allows founder to create spending requests", async () => {
    await campaign.methods
      .createRequest("buy dildos", "100", accounts[0])
      .send({
        from: accounts[0],
        ...gas,
      });

    // check if request was made
    const request = await campaign.methods.requests(0).call();

    // dont need assert all info of request, just assert 1
    assert.strictEqual("buy dildos", request.description);
  });

  //end to end, create campaign, invest in it, create request, approve request and finalise request, assert somebody receive money
  it("processes requests", async () => {
    await campaign.methods.invest().send({
      from: accounts[0],
      value: Web3.utils.toWei("10", "ether"),
      ...gas,
    });

    await campaign.methods
      .createRequest("A", Web3.utils.toWei("5", "ether"), accounts[2])
      .send({ from: accounts[0], ...gas });

    await campaign.methods.approveRequest(0).send({
      from: accounts[0],
      ...gas,
    });

    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0],
      ...gas,
    });

    let balance = await web3.eth.getBalance(accounts[2]);
    balance = Web3.utils.fromWei(balance, "ether");
    balance = parseInt(balance);

    assert(balance == 105);
  });
});

const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledFactory = require("../ethereum/build/CampaignFactory.json");
const compiledCampaign = require("../ethereum/build/Campaign.json");
const { compile } = require("solc");

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  // get list of accounts
  accounts = await web3.eth.getAccounts();

  // deploy instance of factory contract (use this code when want deploy new contract)
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: "1000000" });

  // create campaign with 100 wei
  await factory.methods.createCampaign("100").send({
    from: accounts[0],
    gas: "1000000",
  });

  // check the campaigns
  const addresses = await factory.methods.getDeployedCampaigns().call();
  campaignAddress = addresses[0];

  campaign = await new web3.eth.Contract(
    // parse as JSON the ABI for campaign
    // use this code when contract already deployed and want web3 to know of its existance
    JSON.parse(compiledCampaign.interface),
    campaignAddress
  );
});

// testing
describe("Campaigns", () => {
  // check if factory and campaign smart contract is deployed
  it("deploys a factory and a campaign", () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  // check if address of person making the campaign is the owner of campaign
  it("marks caller as the campaign manager", async () => {
    const manager = await campaign.methods.manager().call();
    assert.equal(accounts[0], manager);
  });

  //if able to donate money to campaign, check if approver
  it("allows people to contribute money and marks them as approvers", async () => {
    await campaign.methods.contribute().send({
      value: "200",
      // ganache automatically creates 10 accounts
      from: accounts[1],
    });
    const isContributor = await campaign.methods.approvers(accounts[1]).call();
    assert(isContributor);
  });

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

  //assert manager can create payment request
  it("allows a manager to create payment request ", async () => {
    await campaign.methods
      .createRequest("buy dildos", "100", accounts[1])
      .send({
        from: accounts[0],
        gas: "1000000",
      });

    // check if request was made
    const request = await campaign.methods.requests(0).call();

    // dont need assert all info of request, just assert 1
    assert.strictEqual("buy dildos", request.description);
  });

  //end to end, create campaign, contribute to it, create request, approve request and finalise request, assert somebody receive money
  it("processes requests", async () => {
    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei("10", "ether"),
    });

    await campaign.methods
      .createRequest("A", web3.utils.toWei("5", "ether"), accounts[1])
      .send({ from: accounts[0], gas: "1000000" });

    await campaign.methods.approveRequest(0).send({
      from: accounts[0],
      gas: "1000000",
    });

    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: "1000000",
    });

    let balance = await web3.eth.getBalance(accounts[1]);
    balance = web3.utils.fromWei(balance, "ether");
    balance = parseFloat(balance);
    console.log(balance);
    assert(balance > 104);
  });
});

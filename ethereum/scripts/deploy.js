const fs = require("fs");
const path = require("path");
const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");

const provider = new HDWalletProvider({
  mnemonic:
    "oyster exercise random pledge thrive food mail hover knee cry sure eternal",
  providerOrUrl:
    process.env.NODE_ENV === "development"
      ? "ws://localhost:8545"
      : "https://rinkeby.infura.io/v3/795a9e8cca664f128bcdae95c3d9f59a",
  numberOfAddresses: 1,
});

const web3 = new Web3(provider);

const { CampaignProducer } = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../build/contracts.json"), "utf-8")
);

(async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("> deploying from:", accounts[0]);
  const gas = { gas: 6721975, gasPrice: "20000000000" }; //default ganache-cli params

  const campaignProducer = await new web3.eth.Contract(CampaignProducer.abi)
    .deploy({ data: CampaignProducer.evm.bytecode.object })
    .send({ from: accounts[0], ...gas });

  const campaignProducerAddress = campaignProducer.options.address;
  console.log("> successfully deployed at:", campaignProducerAddress);

  provider.engine.stop();
  process.exit();
})();

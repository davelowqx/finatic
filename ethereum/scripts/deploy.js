const HDWalletProvider = require("@truffle/hdwallet-provider"); //deprecated
const Web3 = require("web3");
const fs = require("fs");
const path = require("path");

const p = path.resolve(__dirname, "../build/CampaignFactory.json");
const compiledCampaignFactory = JSON.parse(fs.readFileSync(p, "utf-8"));

const provider = new HDWalletProvider(
  //  "oyster exercise random pledge thrive food mail hover knee cry sure eternal",
  //  "https://rinkeby.infura.io/v3/795a9e8cca664f128bcdae95c3d9f59a"
  "breeze feed charge guilt dawn column voyage quarter weird boil surround peace",
  "ws://localhost:8545"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const contract = await new web3.eth.Contract(compiledCampaignFactory.abi)
    .deploy({ data: compiledCampaignFactory.evm.bytecode.object })
    .send({ from: accounts[1], gas: 1500000, gasPrice: "30000000000000" });

  return contract.options.address;
};

deploy().then(
  (address) => {
    fs.writeFileSync(
      path.resolve(__dirname, "../contractAddress.json"),
      JSON.stringify({
        address,
      })
    );
    console.log(`ok: ${address}`);
  },
  (err) => {
    console.log(`failed: ${err}`);
  }
);

const fs = require("fs");
const path = require("path");
const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider"); //deprecated

const p = path.resolve(__dirname, "../build/contracts.json");
const { CompanyProducer } = JSON.parse(fs.readFileSync(p, "utf-8"));

const web3 = new Web3(
  new HDWalletProvider(
    "oyster exercise random pledge thrive food mail hover knee cry sure eternal",
    // "https://rinkeby.infura.io/v3/795a9e8cca664f128bcdae95c3d9f59a"
    "ws://localhost:8545"
  )
);

(async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("deploy from", accounts[0]);

  const contract = await new web3.eth.Contract(CompanyProducer.abi)
    .deploy({ data: CompanyProducer.evm.bytecode.object })
    .send({ from: accounts[0], gas: 6721975, gasPrice: "20000000000" });

  const address = contract.options.address;
  fs.writeFileSync(
    path.resolve(__dirname, "../address.json"),
    JSON.stringify({
      address,
    })
  );

  console.log("ok");
})();

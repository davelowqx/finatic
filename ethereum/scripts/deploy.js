const fs = require("fs");
const path = require("path");
const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider"); //deprecated
const admin = require("firebase-admin");

const { CompanyProducer } = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../build/contracts.json"), "utf-8")
);
const data = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../build/sampledata.json"), "utf-8")
);
const serviceAccount = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, "../../firebase/serviceAccount.json"),
    "utf-8"
  )
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

const web3 = new Web3(
  new HDWalletProvider(
    "oyster exercise random pledge thrive food mail hover knee cry sure eternal",
    // "https://rinkeby.infura.io/v3/795a9e8cca664f128bcdae95c3d9f59a"
    "ws://localhost:8545"
  )
);

(async () => {
  const accounts = await web3.eth.getAccounts();
  const options = { from: accounts[0], gas: 6721975, gasPrice: "20000000000" }; //default ganache-cli params

  console.log("deploy from", accounts[0]);

  const companyProducer = await new web3.eth.Contract(CompanyProducer.abi)
    .deploy({ data: CompanyProducer.evm.bytecode.object })
    .send(options);

  const companyProducerAddress = companyProducer.options.address;
  console.log("deployed at", companyProducerAddress);

  //@truffle/hd-wallet-provider cannot listen to events?
  /*
  companyProducer.events.CreateCompany({}, (err, res) => {
    if (!err) {
      console.log(res);
    }
  });
  */

  console.log("creating companies");
  let i = 0;
  for (company of data) {
    await companyProducer.methods
      .createCompany(company.name, company.symbol, company.sharesOutstanding)
      .send(options);
    const companyAddress = await companyProducer.methods
      .companyAddresses(i++)
      .call();
    console.log({
      companyAddress,
      name: company.name,
      symbol: company.symbol,
      sharesOutstanding: company.sharesOutstanding,
    });
    db.collection("compaies").doc(companyAddress).set({
      company,
    });
  }

  console.log("writing to database...");
  fs.writeFileSync(
    path.resolve(__dirname, "../address.json"),
    JSON.stringify({
      companyProducerAddress,
    })
  );

  console.log("complete, presss ctrl+c to terminate");
})();

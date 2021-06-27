const fs = require("fs");
const path = require("path");
const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const admin = require("firebase-admin");

const toWei = (str) => Web3.utils.toWei(str, "ether");

const randInt = (i) => Math.floor(Math.random() * i);

const { CompanyProducer, Company } = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../build/contracts.json"), "utf-8")
);
const data = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../build/sampledata.json"), "utf-8")
);
const serviceAccount = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, "../../firebase/serviceAccountKey.json"),
    "utf-8"
  )
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

const provider = new HDWalletProvider({
  mnemonic:
    "oyster exercise random pledge thrive food mail hover knee cry sure eternal",
  providerOrUrl:
    `${process.env.NODE_ENV}` === "development"
      ? "ws://localhost:8545"
      : "https://rinkeby.infura.io/v3/795a9e8cca664f128bcdae95c3d9f59a",
  numberOfAddresses: 5,
});

const web3 = new Web3(provider);

(async () => {
  const accounts = await web3.eth.getAccounts();
  const gas = { gas: 6721975, gasPrice: "20000000000" }; //default ganache-cli params

  const companyProducer = await new web3.eth.Contract(CompanyProducer.abi)
    .deploy({ data: CompanyProducer.evm.bytecode.object })
    .send({ from: accounts[0], ...gas });

  const companyProducerAddress = companyProducer.options.address;
  console.log("deployed at", companyProducerAddress);

  console.log("creating companies");
  let i = 0;
  for (obj of data) {
    const { name, symbol, sharesOutstanding, description } = obj;
    await companyProducer.methods
      .listCompany(name, symbol, sharesOutstanding)
      .send({ from: accounts[i % 5], ...gas }); //different managers
    const companyAddress = await companyProducer.methods
      .companyAddresses(i)
      .call();

    const company = new web3.eth.Contract(Company.abi, companyAddress);
    let sharesOffered = 0;

    if (Math.random() > 0.5) {
      //create funding round
      console.log("creating funding round");
      sharesOffered = parseInt(Math.random() * 50);
      await company.methods
        .createFundingRound(
          toWei((sharesOffered / 4).toString()),
          sharesOffered
        )
        .send({ from: accounts[i % 5], ...gas });
      for (let n = 0; n < randInt(5); n++) {
        console.log("investing in funding round");
        await company.methods.invest().send({
          value: toWei(`${0.25 + randInt(1)}`), //random amount
          from: accounts[randInt(5)], //random investor
          ...gas,
        });
      }

      if (Math.random() > 0.5) {
        console.log("concluding funding round");
        //conclude funding round
        await company.methods
          .concludeFundingRound()
          .send({ from: accounts[i % 5], ...gas });
      }
    }

    const isFinancing = await company.methods.isFinancing().call();
    const fundingRoundDetails = await company.methods
      .getFundingRoundDetails()
      .call();
    const currentAmount = fundingRoundDetails[0];
    const targetAmount = fundingRoundDetails[1];

    const companyDetails = {
      companyAddress,
      name,
      symbol,
      sharesOutstanding,
      description,
      isFinancing,
      currentAmount,
      targetAmount,
      sharesOffered,
    };
    console.log(companyDetails);
    await db.collection("companies").doc(companyAddress).set(companyDetails);
    i++;
  }

  fs.writeFileSync(
    path.resolve(__dirname, "../address.json"),
    JSON.stringify({
      address: companyProducerAddress,
    })
  );

  provider.engine.stop();

  console.log("complete, next dev");
  process.exit();
})();

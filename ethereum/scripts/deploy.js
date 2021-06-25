const fs = require("fs");
const path = require("path");
const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider"); //deprecated
const admin = require("firebase-admin");

const toWei = (str) => Web3.utils.toWei(str, "ether");

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
  //databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
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
  const gas = { gas: 6721975, gasPrice: "20000000000" }; //default ganache-cli params

  const companyProducer = await new web3.eth.Contract(CompanyProducer.abi)
    .deploy({ data: CompanyProducer.evm.bytecode.object })
    .send({ from: accounts[0], ...gas });

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
  for (obj of data) {
    const { name, symbol, sharesOutstanding, description } = obj;
    await companyProducer.methods
      .createCompany(name, symbol, sharesOutstanding)
      .send({ from: accounts[i % 5], ...gas }); //different managers
    const companyAddress = await companyProducer.methods
      .companyAddresses(i)
      .call();

    const company = new web3.eth.Contract(Company.abi, companyAddress);
    const sharesOffered = 0;

    if (Math.random() > 0.5) {
      //create funding round
      console.log("creating funding round");
      await company.methods
        .createFundingRound(toWei("10"), 10)
        .send({ from: accounts[i % 5], ...gas });
      sharesOffered = 10;
      for (let n = 0; n < 3; n++) {
        console.log("investing in funding round");
        await company.methods.invest().send({
          value: toWei(`${parseInt(1 + Math.random() * 5)}`), //random amount
          from: accounts[parseInt(Math.random() * 10)], //random investor
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
      sharesOffered,
      description,
      isFinancing,
      targetAmount,
      currentAmount,
    };
    console.log(companyDetails);
    db.collection("companies").doc(companyAddress).set(companyDetails);
    i++;
  }

  fs.writeFileSync(
    path.resolve(__dirname, "../address.json"),
    JSON.stringify({
      address: companyProducerAddress,
    })
  );

  console.log("complete, npm run dev");
})();

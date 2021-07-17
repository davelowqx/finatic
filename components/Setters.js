import { db } from "../firebase";
import { companyProducer, Company } from "../ethereum/contracts";
import web3 from "../ethereum/web3";

const toWei = (str) => web3.utils.toWei(str, "ether");

export async function invest({ address, amount }) {
  const company = Company(address);
  const accounts = await web3.eth.getAccounts();
  await company.methods.invest().send({
    from: accounts[0],
    value: toWei(amount),
  });

  await db
    .collection("companies")
    .doc(address)
    .update({
      currentAmount: firebase.firestore.FieldValue.increment(amount),
    });
}

export async function createFundingRound({
  address,
  targetAmount,
  sharesOffered,
}) {
  const company = Company(address);
  const accounts = await web3.eth.getAccounts();
  await company.methods
    .createFundingRound(toWei(targetAmount), sharesOffered)
    .send({
      from: accounts[0],
    });

  await db.collection("companies").doc(address).set(
    {
      isFinancing: true,
      currentAmount: 0,
      targetAmount,
      sharesOffered,
    },
    { merge: true }
  );
}

export async function concludeFundingRound({ address }) {
  const company = Company(address);
  const accounts = await web3.eth.getAccounts();
  await company.methods.concludeFundingRound().send({
    from: accounts[0],
  });
}

export async function listCompany(
  { name, symbol, sharesOutstanding, description },
  func
) {
  const accounts = await web3.eth.getAccounts();

  companyProducer.once("ListCompany", async (err, res) => {
    if (!err) {
      const address = res.returnValues.addr;
      await db.collection("companies").doc(address).set({
        address,
        name,
        symbol,
        sharesOutstanding,
        description,
        isFinancing: false,
      });
      console.log(address);
      func(address);
    } else {
      console.log(err);
    }
  });

  await companyProducer.methods
    .listCompany(name, symbol, sharesOutstanding)
    .send({
      from: accounts[0],
    });
}

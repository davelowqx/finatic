import { db } from "../firebase";
import { companyProducer, Company } from "../ethereum/contracts";
import web3 from "../ethereum/web3";

const toWei = (str) => web3.utils.toWei(str, "ether");

const getActiveAccount = async () => (await web3.eth.getAccounts())[0];

export async function invest({ companyAddress, amount }) {
  const company = Company(companyAddress);
  await company.methods.invest().send({
    from: await getActiveAccount(),
    value: toWei(amount),
  });

  await db
    .collection("companies")
    .doc(companyAddress)
    .collection("activeFundingRoundDetails")
    .update({
      currentAmount: firebase.firestore.FieldValue.increment(amount),
    });
}

export async function createFundingRound({
  companyAddress,
  targetAmount,
  sharesOffered,
}) {
  const company = Company(companyAddress);
  await company.methods
    .createFundingRound(toWei(targetAmount), sharesOffered)
    .send({
      from: await getActiveAccount(),
    });

  await db.collection("companies").doc(companyAddress).set(
    {
      isFinancing: true,
    },
    { merge: true }
  );

  await db
    .collection("companies")
    .doc(companyAddress)
    .collection("activeFundingRoundDetails")
    .set(
      {
        currentAmount: 0,
        targetAmount,
        sharesOffered,
      },
      { merge: true }
    );
}

export async function concludeFundingRound({ companyAddress }) {
  const company = Company(companyAddress);
  await company.methods.concludeFundingRound().send({
    from: await getActiveAccount(),
  });
  await db.collection("companies").doc(companyAddress).set(
    {
      activeFundingRoundDetails: {},
    },
    { merge: true }
  );
}

export async function withdraw({ withdrawAmount, companyAddress }) {
  const company = Company(companyAddress);
  await company.methods.withdraw(toWei(withdrawAmount)).send({
    from: await getActiveAccount(),
  });
}

export async function payoutDividends({ dividendAmount, companyAddress }) {
  const company = Company(companyAddress);
  await company.methods.payoutDividends(toWei(dividendAmount)).send({
    from: await getActiveAccount(),
  });
}

export async function listCompany(
  { name, symbol, sharesOutstanding, description },
  func
) {
  companyProducer.once("ListCompany", async (err, res) => {
    if (!err) {
      const companyAddress = res.returnValues.companyAddress;
      await db.collection("companies").doc(companyAddress).set({
        companyAddress,
        name,
        symbol,
        sharesOutstanding,
        description,
        isFinancing: false,
        activeFundingRoundDetails: {},
      });
      console.log(companyAddress);
      func(companyAddress);
    } else {
      console.log(err);
    }
  });

  await companyProducer.methods
    .listCompany(name, symbol, sharesOutstanding)
    .send({
      from: await getActiveAccount(),
    });
}

import { db, storage } from "../firebase";
import { companyProducer, Company } from "../ethereum/contracts";
import web3 from "../ethereum/web3";
import { useRouter } from "next/router";

const toWei = (str) => web3.utils.toWei(str, "ether");

const getActiveAccount = async () => (await web3.eth.getAccounts())[0];

export async function invest({ companyAddress, amount }) {
  const company = Company(companyAddress);
  await company.methods.invest().send({
    from: await getActiveAccount(),
    value: toWei(amount),
  });

  const activeFundingRoundDetailsETH = await company.methods
    .getActiveFundingRoundDetails()
    .call();
  const activeFundingRoundDetails = {
    currentAmount: activeFundingRoundDetailsETH[0],
    targetAmount: activeFundingRoundDetailsETH[1],
    sharesOffered: activeFundingRoundDetailsETH[2],
    sharePrice: activeFundingRoundDetailsETH[3],
    sharesOutstanding: activeFundingRoundDetailsETH[4],
    creationTimestamp: activeFundingRoundDetailsETH[5],
    investorsCount: activeFundingRoundDetailsETH[6],
  };

  await fetch(
    `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://fundsme.vercel.app"
    }/api/companies/${companyAddress}`,
    {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify({
        activeFundingRoundDetails,
      }),
    }
  );
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

  const activeFundingRoundDetailsETH = await company.methods
    .getActiveFundingRoundDetails()
    .call();
  const activeFundingRoundDetails = {
    currentAmount: activeFundingRoundDetailsETH[0],
    targetAmount: activeFundingRoundDetailsETH[1],
    sharesOffered: activeFundingRoundDetailsETH[2],
    sharePrice: activeFundingRoundDetailsETH[3],
    sharesOutstanding: activeFundingRoundDetailsETH[4],
    creationTimestamp: activeFundingRoundDetailsETH[5],
    investorsCount: activeFundingRoundDetailsETH[6],
  };

  await fetch(
    `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://fundsme.vercel.app"
    }/api/companies/${companyAddress}`,
    {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify({
        isFinancing: true,
        activeFundingRoundDetails,
      }),
    }
  );
}

export async function concludeFundingRound({ companyAddress }) {
  const company = Company(companyAddress);
  await company.methods.concludeFundingRound().send({
    from: await getActiveAccount(),
  });
  await fetch(
    `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://fundsme.vercel.app"
    }/api/companies/${companyAddress}`,
    {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify({
        isFinancing: false,
        activeFundingRoundDetails: {},
      }),
    }
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

/*
export async function listCompany({
  name,
  symbol,
  sharesOutstanding,
  image,
  description,
}) {
  const postData = (imageUrl, companyAddress) => {
    fetch(
      `${
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : "https://fundsme.vercel.app"
      }/api/companies/new`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          name,
          symbol,
          description,
          imageUrl,
          companyAddress,
        }),
      }
    ).then(() => {
      const router = useRouter();
      router.push(companyAddress);
    });
  };

  companyProducer.once("ListCompany", async (err, res) => {
    if (!err) {
      const companyAddress = res.returnValues.companyAddress;
      // upload image to db
      try {
        const uploadTask = storage
          .ref()
          .child(`images/${companyAddress}`)
          .put(image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (err) => {
            console.log("upload error", err);
            postData("https://via/placeholder.com/450.png", companyAddress);
          },
          () => {
            // success
            uploadTask.snapshot.ref.getDownloadURL().then((imageUrl) => {
              postData(imageUrl, companyAddress);
            });
          }
        );
      } catch (e) {
        console.log(e);
      }
    } else {
      throw err;
    }
  });

  await companyProducer.methods
    .listCompany(name, symbol, sharesOutstanding)
    .send({
      from: await getActiveAccount(),
    });
}

*/

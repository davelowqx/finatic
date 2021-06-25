import { db } from "../firebase";
import { CompanyProducer, Company } from "../ethereum/contracts";

function timeStampToDate(timeStamp) {
  const MONTH = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date(timeStamp * 1e3);
  return `${MONTH[date.getMonth()]} ${date.getDay()}, ${date.getFullYear()}`;
}

export async function getCompanySummaries() {
  const companyAddresses = await CompanyProducer.methods
    .getCompanyAddresses()
    .call();

  const promises = companyAddresses.map((address) => {
    return db
      .collection("companies")
      .doc(address)
      .get()
      .then((doc) => {
        return { address, ...doc.data() };
      });
  });
  const companySummaries = await Promise.all(promises);
  return companySummaries;
}

export async function getCompanyDetails(address) {
  const company = Company(address);
  let companyDetailsETH = await company.methods.getCompanyDetails().call();

  const companyDetailsDB = await db
    .collection("companies")
    .doc(address)
    .get()
    .then((doc) => {
      return { address, ...doc.data() };
    });

  companyDetailsETH = {
    name: companyDetailsETH[0],
    symbol: companyDetailsETH[1],
    sharesOutstanding: companyDetailsETH[2],
    balance: companyDetailsETH[3],
    manager: companyDetailsETH[4],
    fundingRoundsCount: companyDetailsETH[5],
    isFinancing: companyDetailsETH[6],
    listingTimestamp: companyDetailsETH[7],
    sharePrice: companyDetailsETH[8],
  };

  return {
    ...companyDetailsDB,
    balance: companyDetailsETH.balance,
    isFinancing: companyDetailsETH.isFinancing,
    date: timeStampToDate(companyDetailsETH.listingTimestamp),
    manager: companyDetailsETH.manager,
    fundingRoundsCount: companyDetailsETH.fundingRoundsCount,
    valuation:
      companyDetailsETH.valuation > 0 ? companyDetailsETH.valuation : "???",
  };
}

export async function getFundingRoundSummary(address, i) {
  const company = Company(address);
  const fundingRoundSummary = await company.methods
    .getFundingRoundSummary(i)
    .call();

  return {
    creationTimestamp: fundingRoundSummary[0],
    valuation: fundingRoundSummary[1],
  };
}

export async function getFundingRoundDetails(address) {
  const company = Company(address);
  const fundingRoundDetails = await company.methods
    .getFundingRoundDetails()
    .call();

  return {
    currentAmount: fundingRoundDetails[0],
    targetAmount: fundingRoundDetails[1],
    sharesOffered: fundingRoundDetails[2],
    sharePrice: fundingRoundDetails[3],
    creationTimestamp: fundingRoundDetails[4],
    investorsCount: fundingRoundDetails[5],
  };
}

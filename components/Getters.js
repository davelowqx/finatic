import { db } from "../firebase";
import { CompanyProducer, Company } from "../ethereum/contracts";
import web3 from "../ethereum/web3";

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

const fromWei = (str) => web3.utils.fromWei(str, "ether");

/**
 * optimizing for speed, retrieved from database
 * @returns [{company}, ...]
 */
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
        const {
          description,
          sharesOffered,
          sharesOutstanding,
          name,
          isFinancing,
          targetAmount = 0,
          currentAmount = 0,
        } = doc.data();
        return {
          name,
          address,
          description,
          valuation:
            (fromWei(targetAmount) / sharesOffered) * sharesOutstanding,
          isFinancing,
          progress: (100 * currentAmount) / targetAmount,
        };
      });
  });
  const companySummaries = await Promise.all(promises);
  return companySummaries;
}

/**
 * optimizing for data integrity, retrieved from ethereum network
 * @param address - smart contract address of company
 * @returns object representing company details *
 * {name, symbol, sharesOutstanding, balance, manager,
 * fundingRoundsCount, isFinancing, listingDate, description, valuation}
 */
export async function getCompanyDetails({ address }) {
  const company = Company(address);
  const companyDetailsETH = await company.methods.getCompanyDetails().call();
  const { description } = await db
    .collection("companies")
    .doc(address)
    .get()
    .then((doc) => doc.data());

  const companyDetails = {
    name: companyDetailsETH[0],
    symbol: companyDetailsETH[1],
    sharesOutstanding: companyDetailsETH[2],
    balance: companyDetailsETH[3],
    manager: companyDetailsETH[4],
    fundingRoundsCount: companyDetailsETH[5],
    isFinancing: companyDetailsETH[6],
    listingDate: timeStampToDate(companyDetailsETH[7]),
    sharePrice: fromWei(companyDetailsETH[8]),
  };

  return {
    ...companyDetails,
    address,
    description,
    valuation:
      companyDetails.sharePrice > 0
        ? companyDetails.sharePrice * companyDetails.sharesOutstanding
        : "???",
  };
}

//retrieve from ethereum?
export async function getFundingRoundSummary({ address, index }) {
  const company = Company(address);
  const fundingRoundSummary = await company.methods
    .getFundingRoundSummary(index)
    .call();

  return {
    creationTimestamp: fundingRoundSummary[0],
    valuation: fromWei(fundingRoundSummary[1]),
  };
}

//retrieve from ethereum?
export async function getFundingRoundDetails({ address }) {
  const company = Company(address);
  const fundingRoundDetails = await company.methods
    .getFundingRoundDetails()
    .call();

  const currentTime = await web3.eth.getBlock("latest");

  return {
    currentAmount: fromWei(fundingRoundDetails[0]),
    targetAmount: fromWei(fundingRoundDetails[1]),
    sharesOffered: fundingRoundDetails[2],
    sharePrice: fromWei(fundingRoundDetails[3]),
    daysLeft: (fundingRoundDetails[4] + 60 * 86400 - currentTime) / 86400,
    investorsCount: fundingRoundDetails[5],
  };
}

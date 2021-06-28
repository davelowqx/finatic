import { Company } from "../ethereum/contracts";
import web3 from "../ethereum/web3";

const fromWei = (str = "0") => web3.utils.fromWei(str, "ether");

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

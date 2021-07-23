import { Company } from "../../../ethereum/contracts";
import { db } from "../../../firebase";
import web3 from "../../../ethereum/web3";

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

export default async (req, res) => {
  const address = req.query.address;

  if (req.method === "GET") {
    try {
      const company = Company(address);
      const companyDetailsETH = await company.methods
        .getCompanyDetails()
        .call();
      const { description } = await db
        .collection("companies")
        .doc(address)
        .get()
        .then((doc) => doc.data());

      const companyDetails = {
        name: companyDetailsETH[0],
        symbol: companyDetailsETH[1],
        sharesOutstanding: companyDetailsETH[2],
        balance: fromWei(companyDetailsETH[3]),
        manager: companyDetailsETH[4],
        fundingRoundsCount: companyDetailsETH[5],
        isFinancing: companyDetailsETH[6],
        listingDate: timeStampToDate(companyDetailsETH[7]),
        currentValuation: fromWei(companyDetailsETH[8]),
        postMoneyValuation: fromWei(companyDetailsETH[9]),
      };

      const currentFundingRoundDetailsETH = await company.methods
        .getFundingRoundDetails()
        .call();

      const currentTime = await web3.eth.getBlock("latest");

      const currentFundingRoundDetails = {
        currentAmount: fromWei(currentFundingRoundDetailsETH[0]),
        targetAmount: fromWei(currentFundingRoundDetailsETH[1]),
        sharesOffered: currentFundingRoundDetailsETH[2],
        sharePrice: fromWei(currentFundingRoundDetailsETH[3]),
        daysLeft:
          (currentFundingRoundDetailsETH[4] + 60 * 86400 - currentTime) / 86400,
        investorsCount: currentFundingRoundDetailsETH[5],
      };

      // TODO: get from db instead
      const fundingRoundSummariesPromises = Array(
        companyDetails.fundingRoundsCount
      )
        .fill()
        .map(async (_, i) => {
          company.methods
            .getFundingRoundSummary(i + 1)
            .call()
            .then((arr) => {
              return {
                creationTimestamp: arr[0],
                valuation: fromWei(arr[1]),
              };
            });
        });

      const fundingRoundSummaries = await Promise.all(
        fundingRoundSummariesPromises
      );

      const data = {
        ...companyDetails,
        currentFundingRoundDetails,
        fundingRoundSummaries,
        address,
        description,
      };
      res.status(200).json(data);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
};

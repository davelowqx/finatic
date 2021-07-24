import { Company } from "../../../ethereum/contracts";
import { db } from "../../../firebase";
import { fromWei } from "../../../components/utils";

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
        sharesOutstanding: parseInt(companyDetailsETH[2]),
        balance: fromWei(companyDetailsETH[3]),
        manager: companyDetailsETH[4],
        fundingRoundsCount: parseInt(companyDetailsETH[5]),
        isFinancing: companyDetailsETH[6],
        listingTimestamp: parseInt(companyDetailsETH[7]),
        currentValuation: fromWei(companyDetailsETH[8]),
        postMoneyValuation: fromWei(companyDetailsETH[9]),
      };

      const { fundingRoundsCount } = companyDetails;

      let activeFundingRoundDetails = {};
      if (companyDetails.isFinancing) {
        const activeFundingRoundDetailsETH = await company.methods
          .getActiveFundingRoundDetails()
          .call();

        activeFundingRoundDetails = {
          currentAmount: fromWei(activeFundingRoundDetailsETH[0]),
          targetAmount: fromWei(activeFundingRoundDetailsETH[1]),
          sharesOffered: activeFundingRoundDetailsETH[2],
          sharePrice: fromWei(activeFundingRoundDetailsETH[3]),
          creationTimestamp: activeFundingRoundDetailsETH[4],
          investorsCount: activeFundingRoundDetailsETH[5],
        };
      }

      const fundingRoundSummariesPromises = Array(fundingRoundsCount)
        .fill()
        .map((_, i) => {
          return company.methods
            .getFundingRoundSummary(i)
            .call()
            .then((arr) => {
              return {
                creationTimestamp: arr[0],
                valuation: fromWei(arr[1]),
                success: arr[2],
              };
            });
        });

      const fundingRoundSummaries = await Promise.all(
        fundingRoundSummariesPromises
      );

      const data = {
        ...companyDetails,
        activeFundingRoundDetails,
        fundingRoundSummaries,
        address,
        description,
      };
      console.log(data);
      res.status(200).json(data);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
};

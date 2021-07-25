import { Company } from "../../../ethereum/contracts";
import { db } from "../../../firebase";
import { fromWei } from "../../../components/utils";

export default async (req, res) => {
  const companyAddress = req.query.companyAddress;

  if (req.method === "GET") {
    try {
      const company = Company(companyAddress);
      const companyDetailsETH = await company.methods
        .getCompanyDetails()
        .call();
      const {
        name,
        symbol,
        description,
        imageUrl,
        isFinancing,
        activeFundingRoundDetails,
      } = await db
        .collection("companies")
        .doc(companyAddress)
        .get()
        .then((doc) => doc.data());

      const companyDetails = {
        name,
        symbol,
        description,
        imageUrl,
        companyAddress,
        isFinancing,
        activeFundingRoundDetails,
        sharesOutstanding: parseInt(companyDetailsETH[2]),
        balance: fromWei(companyDetailsETH[3]),
        managerAddress: companyDetailsETH[4],
        fundingRoundsCount: parseInt(companyDetailsETH[5]),
        listingTimestamp: parseInt(companyDetailsETH[7]),
        currentValuation: fromWei(companyDetailsETH[8]),
      };

      const { fundingRoundsCount } = companyDetails;

      const fundingRoundSummaries = await Promise.all(
        Array(fundingRoundsCount)
          .fill()
          .map((_, i) => {
            return company.methods
              .getFundingRoundSummary(i)
              .call()
              .then((arr) => {
                return {
                  creationTimestamp: arr[0],
                  valuation: fromWei(arr[1]),
                  status: arr[2],
                };
              });
          })
      );

      const data = {
        ...companyDetails,
        fundingRoundSummaries,
      };
      // console.log(data);
      res.status(200).json(data);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
};

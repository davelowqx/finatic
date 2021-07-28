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
        .then((doc) => {
          if (doc.exists) {
            return doc.data();
          } else {
            return {
              name: "",
              symbol: "",
              description: "",
              imageUrl: "",
              isFinancing: false,
            };
          }
        });

      const companyDetails = {
        name,
        symbol,
        description,
        imageUrl,
        companyAddress,
        isFinancing,
        sharesOutstanding: parseInt(companyDetailsETH[2]),
        balance: fromWei(companyDetailsETH[3]),
        managerAddress: companyDetailsETH[4],
        fundingRoundsCount: parseInt(companyDetailsETH[5]),
        listingTimestamp: parseInt(companyDetailsETH[7]),
        currentValuation: fromWei(companyDetailsETH[8]),
      };

      let activeFundingRoundDetailsConverted = {};
      if (isFinancing) {
        const {
          currentAmount,
          targetAmount,
          sharesOffered,
          sharePrice,
          sharesOutstanding,
          creationTimestamp,
          investorsCount,
        } = activeFundingRoundDetails;
        activeFundingRoundDetailsConverted = {
          currentAmount: fromWei(currentAmount),
          targetAmount: fromWei(targetAmount),
          sharesOffered: parseInt(sharesOffered),
          sharesOutstanding: parseInt(sharesOutstanding),
          sharePrice: fromWei(sharePrice),
          creationTimestamp: parseInt(creationTimestamp),
          investorsCount: parseInt(investorsCount),
        };
      }

      const fundingRoundSummaries = await Promise.all(
        Array(companyDetails.fundingRoundsCount)
          .fill()
          .map((_, i) => {
            return company.methods
              .getFundingRoundSummary(i)
              .call()
              .then((arr) => {
                return {
                  creationTimestamp: arr[0],
                  sharePrice: fromWei(arr[1]),
                  sharesOutstanding: arr[2],
                  status: parseInt(arr[3]),
                };
              });
          })
      );

      const data = {
        ...companyDetails,
        activeFundingRoundDetails: activeFundingRoundDetailsConverted,
        fundingRoundSummaries,
      };
      // console.log(data);
      res.status(200).json(data);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  } else if (req.method === "PUT") {
    try {
      console.log("PUT request", req.body);
      await db
        .collection("companies")
        .doc(companyAddress)
        .set(req.body, { merge: true });
      res.status(200).json(data);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
};

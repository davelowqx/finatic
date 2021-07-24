import { companyProducer } from "../../../ethereum/contracts";
import { db } from "../../../firebase";
import { fromWei } from "../../../components/utils";

/**
 * retrieved from database
 * @returns [{company}, ...]
 */
export default async (req, res) => {
  if (req.method === "GET") {
    try {
      const companyAddresses = await companyProducer.methods
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
              name,
              isFinancing,
              activeFundingRoundDetails,
            } = doc.data();
            const { currentAmount, targetAmount, creationTimestamp } =
              activeFundingRoundDetails;
            return {
              name,
              address,
              description,
              activeFundingRoundDetails: {
                targetAmount: !!targetAmount ? fromWei(targetAmount) : 0,
                creationTimestamp,
              },
              isFinancing,
              progress: Math.round((100 * currentAmount) / targetAmount),
            };
          });
      });
      const companySummaries = await Promise.all(promises);
      res.status(200).json(companySummaries);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
};

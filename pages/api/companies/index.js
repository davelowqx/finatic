import { companyProducer } from "../../../ethereum/contracts";
import { db } from "../../../firebase";
import web3 from "../../../ethereum/web3";

const fromWei = (val) => web3.utils.fromWei(val.toString(), "ether");

/**
 * optimizing for speed, retrieved from database
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
              currentAmount: fromWei(currentAmount),
              targetAmount: fromWei(targetAmount),
              valuation:
                (fromWei(targetAmount) / sharesOffered) * sharesOutstanding,
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

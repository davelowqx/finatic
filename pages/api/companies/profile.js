import { companyProducer, Company } from "../../../ethereum/contracts";
import { db } from "../../../firebase";
import { fromWei } from "../../../components/utils";

export default async (req, res) => {
  const profileAddress = req.query.address;
  if (req.method === "GET") {
    try {
      const companyAddresses = await companyProducer.methods
        .getCompanyAddresses()
        .call();
      const investmentPromises = companyAddresses.map(async (companyAddress) => {
        const company = Company(companyAddress);
        const amount = await company.methods.balanceOf(profileAddress).call();
	const xxx = await db.collection("companies").get(companyAddress).get(...)
	
        return {
		amount,
		companyAddress,
		symbol: "",
		name: ""

	};
      });
      const investments = Promise.all(investmentPromises);
      res.status(200).json(investments);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
};

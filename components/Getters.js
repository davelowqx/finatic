import { db } from "../firebase";
import { CompanyProducer } from "../ethereum/contracts";

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

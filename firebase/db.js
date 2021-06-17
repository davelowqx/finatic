import firebase from "firebase/app";
import "firebase/firestore";
import firebaseConfig from "./firebaseConfig.json";
import { CompanyProducer } from "../ethereum/contracts";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
console.log("firebase initialised");

const db = firebase.firestore();

export default db;

export const getCompanySummaries = async () => {
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
};

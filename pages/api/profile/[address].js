import React from "react";
import { companyProducer, Company } from "../../../ethereum/contracts";
import { db } from "../../../firebase";
import { fromWei } from "../../../components/utils";
import { AccountContext } from "../../../components/context/AccountContext";

export default async (req, res) => {
  const profileAddress = "0xb273bFAc12ef7D4021c12dF8deB9d825A19e6Aa1";
  // const profileAddress = req.query;

  if (req.method === "GET") {
    try {
      const companyAddresses = await companyProducer.methods
        .getCompanyAddresses()
        .call();

      const investmentPromises = companyAddresses.map(
        async (companyAddress) => {
          const company = Company(companyAddress);
          const amount = await company.methods.balanceOf(profileAddress).call();
          const fbinfo = await db
            .collection("companies")
            .doc(companyAddress)
            .get()
            .then((doc) => {
              const { name, symbol } = doc.data();
              return {
                name,
                symbol,
              };
            });

          return {
            companyAddress: companyAddress,
            companyName: fbinfo.name,
            companySymbol: fbinfo.symbol,
            companyHolding: fromWei(amount),
          };
        }
      );

      const investments = await Promise.all(investmentPromises);

      res.status(200).json(investments);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
};

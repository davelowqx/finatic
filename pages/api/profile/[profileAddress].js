import React from "react";
import { companyProducer, Company } from "../../../ethereum/contracts";
import { db } from "../../../firebase";
import { fromWei } from "../../../components/utils";
import { AccountContext } from "../../../components/context/AccountContext";

export default async (req, res) => {
  const profileAddress = req.query.profileAddress;

  if (req.method === "GET") {
    try {
      const companyAddresses = await companyProducer.methods
        .getCompanyAddresses()
        .call();

      const investmentPromises = companyAddresses.map(
        async (companyAddress) => {
          const company = Company(companyAddress);
          const numberOfShares = parseInt(
            await company.methods.balanceOf(profileAddress).call()
          );
          const companySummary = await db
            .collection("companies")
            .doc(companyAddress)
            .get()
            .then((doc) => {
              if (doc.exists) {
                const { name, symbol } = doc.data();
                return {
                  name,
                  symbol,
                };
              } else {
                return { name: "", symbol: "" };
              }
            });

          return {
            companyAddress,
            ...companySummary,
            numberOfShares,
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

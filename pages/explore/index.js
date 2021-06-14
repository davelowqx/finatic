import React from "react";
import Layout from "../../components/Layout";
import CompanyCards from "../../components/CompanyCards";
import { CompanyProducer, Company } from "../../ethereum/contracts";

export async function getServerSideProps() {
  const companyAddresses = await CompanyProducer.methods
    .getCompanyAddresses()
    .call();
  const companySummaries = [];
  for (let address of companyAddresses) {
    const company = Company(address);
    const companySummary = await company.methods.getCompanySummary().call();
    companySummaries.push({
      address,
      name: companySummary[0],
      symbol: companySummary[1],
      sharesOutstanding: companySummary[2],
      isFinancing: companySummary[3],
    });
  }
  return { props: { companySummaries } };
}

export default function Explore({ companySummaries }) {
  return (
    <Layout>
      <h3>Companies</h3>
      <CompanyCards companySummaries={companySummaries} />
    </Layout>
  );
}

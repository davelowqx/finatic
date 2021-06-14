import React from "react";
import Layout from "../../components/Layout";
import CompanyCards from "../../components/CompanyCards";
import { CompanyProducer, Company } from "../../ethereum/contracts";

export async function getServerSideProps() {
  return { props: { companySummaries } };
}

export default function ExploreFiltered({ companySummaries }) {
  return (
    <Layout>
      <h3>Companies</h3>
      <CompanyCards companySummaries={companySummaries} />
    </Layout>
  );
}

import React from "react";
import Layout from "../../components/Layout";
import CompanyCards from "../../components/CompanyCards";
import { Header, Button } from "semantic-ui-react";
import { CompanyProducer, Company } from "../../ethereum/contracts";
import db from "../../firebase/db";

export async function getServerSideProps() {
  const companyAddresses = await CompanyProducer.methods
    .getCompanyAddresses()
    .call();
  const companySummaries = [];
  let i = 0;
  await db
    .collection("companies")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        companySummaries[i++] = { address: doc.id, ...doc.data() };
      });
    });
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
  const [gridView, setGridView] = React.useState(true);
  return (
    <Layout>
      <Button.Group size="mini">
        <Button
          color={gridView ? "blue" : ""}
          onClick={() => setGridView(true)}
        >
          Grid
        </Button>
        <Button
          color={gridView ? "" : "blue"}
          onClick={() => setGridView(false)}
        >
          List
        </Button>
      </Button.Group>

      <Header as="h5" color="grey" textAlign="center">
        {companySummaries.length} Companies Raising Capital
      </Header>
      <CompanyCards companySummaries={companySummaries} gridView={gridView} />
    </Layout>
  );
}

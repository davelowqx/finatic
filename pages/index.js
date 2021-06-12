import React from "react";
import { Card, Button } from "semantic-ui-react";
import Link from "next/link";
import Layout from "../components/Layout";
import { CompanyProducer, Company } from "../ethereum/contracts";

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
      isSeekingFunding: companySummary[3],
    });
  }
  return { props: { companySummaries } };
}

export default function CampaignIndex({ companySummaries }) {
  return (
    <Layout>
      <h3>Companies</h3>
      <Link href="/companies/new">
        <a>
          <Button
            floated="right"
            content="List Company"
            icon="add circle"
            primary={true}
          />
        </a>
      </Link>
      <Card.Group centered>
        {companySummaries
          .reverse()
          .map(({ address, name, sharesOutstanding, isSeekingFunding }) => (
            <Card
              href={`/companies/${address}`}
              image="https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
              header={name}
              meta={`${sharesOutstanding}`}
              description="Add company description here"
              extra="extra shit"
              fluid={true}
              color={isSeekingFunding ? "green" : "red"}
            />
          ))}
      </Card.Group>
    </Layout>
  );
}

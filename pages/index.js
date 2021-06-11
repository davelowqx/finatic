import React from "react";
import { Card, Button } from "semantic-ui-react";
import { truncateAddress } from "../components/Formatter";
import Link from "next/link";
import Layout from "../components/Layout";
import { companyProducer } from "../ethereum/contracts";

export async function getServerSideProps() {
  const companyAddresses = await companyProducer.methods
    .getCompanyAddresses()
    .call();
  return { props: { companyAddresses } };
}

export default function CampaignIndex({ companyAddresses }) {
  const items = companyAddresses
    .slice()
    .reverse()
    .map((address) => {
      return {
        header: `Company ${truncateAddress(address)}`,
        description: (
          <Link href={`/companies/${address}`}>
            <a>View Details</a>
          </Link>
        ),
        fluid: true,
      };
    });

  return (
    <Layout>
      <div>
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
        {<Card.Group items={items} />};
      </div>
    </Layout>
  );
}

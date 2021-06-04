import React from "react";
import { Card, Button } from "semantic-ui-react";
import { truncateAddress } from "../components/Formatter";
import Link from "next/link";
import Layout from "../components/Layout";
import campaignFactory from "../ethereum/campaignFactory";

export async function getServerSideProps() {
  const campaigns = await campaignFactory.methods.getCampaigns().call();
  return { props: { campaigns } };
}

export default function CampaignIndex({ campaigns }) {
  const items = campaigns
    .slice()
    .reverse()
    .map((address) => {
      return {
        header: `Campaign ${truncateAddress(address)}`,
        description: (
          <Link href={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true,
      };
    });

  return (
    <Layout>
      <div>
        <h3>Open Campaigns</h3>
        <Link href="/campaigns/new">
          <a>
            <Button
              floated="right"
              content="Create Campaign"
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

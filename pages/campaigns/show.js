import React from "react";
import { Card, Grid, Button } from "semantic-ui-react";
import Layout from "../../components/Layout";
import Link from "next/link";
import { truncateAddress } from "../../components/Formatter";

import Campaign from "../../ethereum/campaigns";
import web3 from "../../ethereum/web3";
import ContributionForm from "../../components/ContributionForm";

export async function getServerSideProps(context) {
  const address = context.query.address;
  const campaign = Campaign(address);

  const summary = await campaign.methods.getSummary().call();

  // pull address from the prop and details of it from summary
  return {
    props: {
      address,
      target: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      investorsCount: summary[3],
      creator: summary[4],
    },
  };
}

export default function CampaignShow({
  address,
  target,
  balance,
  requestsCount,
  investorsCount,
  creator,
}) {
  const items = [
    {
      header: creator,
      meta: "Address of Creator",
      description: "The creator can make spending requests",
      style: { overflowWrap: "anywhere" },
    },
    {
      header: target + " ETH",
      meta: "Target Amount",
      description: "Target amount to be raised",
      style: { overflowWrap: "anywhere" },
    },
    {
      header: requestsCount,
      meta: "Number of Requests",
      description: "Requests made to withdraw from the funds",
      style: { overflowWrap: "anywhere" },
    },
    {
      header: investorsCount,
      meta: "Number of Investors",
      description:
        "Number of unique addresses that contributed to this project",
      style: { overflowWrap: "anywhere" },
    },
    {
      header: web3.utils.fromWei(balance, "ether") + " ETH",
      meta: "Fund Balance",
      description: "The balance is how much money this fund has to spend",
      style: { overflowWrap: "anywhere" },
    },
  ];

  return (
    <Layout>
      <h3>{"Campaign " + truncateAddress(address)}</h3>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            <Card.Group items={items} />
          </Grid.Column>
          <Grid.Column width={6}>
            <ContributionForm address={address} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Link href={`/campaigns/${address}/requests`}>
              <a>
                <Button primary>View Requests</Button>
              </a>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
}

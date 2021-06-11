import React from "react";
import { Card, Grid, Button } from "semantic-ui-react";
import Layout from "../../components/Layout";
import { truncateAddress } from "../../components/Formatter";

import { company } from "../../ethereum/contracts";
import web3 from "../../ethereum/web3";
import ContributionForm from "../../components/ContributionForm";

export async function getServerSideProps(context) {
  const address = context.params.address;
  const comp = company(address);

  const summary = await comp.methods.getCompanySummary().call();

  // pull address from the prop and details of it from summary
  return {
    props: {
      address,
      name: summary[0],
      symbol: summary[1],
      manager: summary[2],
      balance: summary[3],
      fundingRoundsCount: summary[4],
      isSeekingFunding: summary[5],
    },
  };
}

export default function CampaignDetails({
  address,
  name,
  symbol,
  manager,
  balance,
  fundingRoundsCount,
  isSeekingFunding,
}) {
  const items = [
    {
      header: manager,
      meta: "Address of Manager",
      description: "The manager has control over the funds",
      style: { overflowWrap: "anywhere" },
    },
    {
      header: web3.utils.fromWei(balance, "ether") + " ETH",
      meta: "Company Balance",
      description: "Amount in company's account",
      style: { overflowWrap: "anywhere" },
    },
    {
      header: fundingRoundsCount,
      meta: "Number of Funding Rounds",
      description: "",
      style: { overflowWrap: "anywhere" },
    },
  ];

  return (
    <Layout>
      <h3>{`${name}, ${truncateAddress(address)}`}</h3>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            <Card.Group items={items} />
          </Grid.Column>
          <Grid.Column width={6}>
            <ContributionForm address={address} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
}

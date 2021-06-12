import React from "react";
import { Card, Grid } from "semantic-ui-react";
import Layout from "../../components/Layout";

import { Company } from "../../ethereum/contracts";
import web3 from "../../ethereum/web3";
import ContributionForm from "../../components/ContributionForm";

export async function getServerSideProps(context) {
  const address = context.params.address;
  const company = Company(address);

  const companyDetails = await company.methods.getCompanyDetails().call();

  return {
    props: {
      address,
      name: companyDetails[0],
      symbol: companyDetails[1],
      sharesOutstanding: companyDetails[2],
      balance: companyDetails[3],
      manager: companyDetails[4],
      fundingRoundsCount: companyDetails[5],
      isSeekingFunding: companyDetails[6],
    },
  };
}

export default function CampaignDetails({
  address,
  name,
  symbol,
  sharesOutstanding,
  balance,
  manager,
  fundingRoundsCount,
  isSeekingFunding,
}) {
  const items = [
    {
      header: "???",
      meta: "Current Valuation",
      description: "",
      style: { overflowWrap: "anywhere" },
    },
    {
      header: sharesOutstanding,
      meta: "Shares Outstanding",
      description: "",
      style: { overflowWrap: "anywhere" },
    },
    {
      header: manager,
      meta: "Address of Manager",
      description: "",
      style: { overflowWrap: "anywhere" },
    },
    {
      header: web3.utils.fromWei(balance, "ether") + " ETH",
      meta: "Company Balance",
      description: "",
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
      <h3>{`${name} (${symbol})`}</h3>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            <Card.Group items={items} />
          </Grid.Column>
          <Grid.Column width={6}>
            <ContributionForm
              isSeekingFunding={isSeekingFunding}
              address={address}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
}

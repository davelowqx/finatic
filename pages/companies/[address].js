import React from "react";
import { Card, Grid } from "semantic-ui-react";

import web3 from "../../ethereum/web3";
import FundingStatus from "../../components/FundingStatus";
import { getCompanyDetails } from "../../components/Getters";

export async function getServerSideProps(context) {
  const companyDetails = await getCompanyDetails({
    address: context.params.address,
  });
  return { props: companyDetails };
}

export default function CompanyDetails({
  address,
  name,
  symbol,
  sharesOutstanding,
  description,
  balance,
  manager,
  fundingRoundsCount,
  isFinancing,
  sharePrice,
  listingDate,
}) {
  const items = [
    {
      header:
        sharePrice > 0 ? `${sharePrice * sharesOutstanding} ETH` : "Unknown",
      meta: "Current Valuation",
      style: { overflowWrap: "anywhere" },
    },
    {
      header: sharesOutstanding,
      meta: "Shares Outstanding",
      style: { overflowWrap: "anywhere" },
    },
    {
      header: address,
      meta: "Address of Smart Contract",
      style: { overflowWrap: "anywhere" },
    },
    {
      header: manager,
      meta: "Address of Manager",
      style: { overflowWrap: "anywhere" },
    },
    {
      header: listingDate,
      meta: "Date Listed",
      style: { overflowWrap: "anywhere" },
    },
    {
      header: web3.utils.fromWei(balance, "ether") + " ETH",
      meta: "Company Balance",
      style: { overflowWrap: "anywhere" },
    },
    {
      header: fundingRoundsCount,
      meta: "Number of Funding Rounds",
      style: { overflowWrap: "anywhere" },
    },
  ];

  return (
    <>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            <h3>{`${name} (${symbol})`}</h3>
            <div>{description}</div>
            <br />
            <Card.Group items={items} />
          </Grid.Column>
          <Grid.Column width={6}>
            <FundingStatus
              fundingRoundsCount={fundingRoundsCount}
              isFinancing={isFinancing}
              address={address}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}

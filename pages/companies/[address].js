import React from "react";
import { Button, Image, Header, Card, Grid, Feed } from "semantic-ui-react";

import web3 from "../../ethereum/web3";
import FundingStatus from "../../components/FundingStatus";
import { getCompanyDetails } from "../../components/Getters";
import CopyButton from "../../components/CopyButton";

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
  listingDate,
  preMoneyValuation,
  postMoneyValuation,
}) {
  const truncateAddress = (str) => {
    if (str.length == 42) {
      const s = str.toUpperCase();
      return `0x${s.substring(2, 6)}...${s.substring(38)}`;
    }
  };

  const items = [
    {
      header: truncateAddress(address),
      meta: "Address of Smart Contract",
      style: { overflowWrap: "anywhere" },
    },
    {
      header: truncateAddress(manager),
      meta: "Address of Manager",
      style: { overflowWrap: "anywhere" },
    },
    {
      header:
        preMoneyValuation === "0" ? "UNKNOWN" : `${preMoneyValuation} ETH`,
      meta: "Pre-Money Valuation",
      style: { overflowWrap: "anywhere" },
    },
    {
      header: postMoneyValuation === "0" ? "NA" : `${postMoneyValuation} ETH`,
      meta: "Post-Money Valuation",
      style: { overflowWrap: "anywhere" },
    },
    {
      header: sharesOutstanding,
      meta: "Shares Outstanding",
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
    {
      header: listingDate,
      meta: "Date Listed",
      style: { overflowWrap: "anywhere" },
    },
  ];

  return (
    <>
      <br />
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            <div className="companies-container cardborder">
              <CopyButton floated="right" text={address} />
              <div style={{ fontSize: "1.25rem" }}>
                INVEST IN <b>{`${name} (${symbol})`}</b>
              </div>
              <Image
                className="companies-image"
                bordered
                centered
                fluid
                src="/static/company-image.jpg"
              />
              <div>
                <div
                  style={{ float: "left" }}
                  className="companies-pre-description"
                >
                  website
                </div>
                <div
                  style={{
                    position: "absolute",
                    left: "47%",
                  }}
                  className="companies-pre-description"
                >
                  location
                </div>
                <div
                  style={{ float: "right" }}
                  className="companies-pre-description"
                >
                  date
                </div>
              </div>
              <br />
              <Header as="h3">Company Description:</Header>
              <div className="companies-description">{description}</div>
              <br />
              <Header as="h3">Company Details:</Header>
              <div className="companies-details">
                <Card.Group items={items} />
              </div>
              <br />
              <Header as="h3">Downloads:</Header>
              <div className="companies-download-container">
                <div style={{ display: "inline-block" }}>
                  <Button secondary style={{ margin: "1em" }}>
                    Financial Details
                  </Button>
                  <Button secondary style={{ margin: "1em" }}>
                    Disclosures
                  </Button>
                  <Button secondary style={{ margin: "1em" }}>
                    Contract Details
                  </Button>
                  <Button secondary style={{ margin: "1em" }}>
                    Company Roadmap
                  </Button>
                  <Button secondary style={{ margin: "1em" }}>
                    Pitchdeck
                  </Button>
                  <Button secondary style={{ margin: "1em" }}>
                    Founders
                  </Button>
                </div>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={6}>
            <Grid.Row>
              <FundingStatus
                fundingRoundsCount={fundingRoundsCount}
                isFinancing={isFinancing}
                address={address}
              />
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}

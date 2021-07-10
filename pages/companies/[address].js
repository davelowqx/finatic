import React from "react";
import { Button, Image, Header, Card, Grid, Feed } from "semantic-ui-react";
import FundingStatus from "../../components/FundingStatus";
import CopyButton from "../../components/CopyButton";

export async function getServerSideProps(context) {
  return { props: { address: context.params.address } };
}

export default function Company({ address }) {
  const [companyDetails, setCompanyDetails] = React.useState({
    address,
    name: "",
    symbol: "",
    sharesOutstanding: 0,
    description: "",
    balance: 0,
    manager: "",
    fundingRoundsCount: 0,
    isFinancing: false,
    listingDate: "",
    preMoneyValuation: "",
    postMoneyValuation: "",
    currentFundingRoundDetails: {},
    fundingRoundSummaries: [],
  });
  React.useEffect(async () => {
    const companyDetails = await fetch(
      `${
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : "https://fundsme.vercel.app"
      }/api/companies/${address}`
    ).then((res) => res.json());
    console.log(companyDetails);
    setCompanyDetails(companyDetails);
  }, []);

  const {
    name,
    symbol,
    description,
    fundingRoundSummaries,
    currentFundingRoundDetails,
    isFinancing,
  } = companyDetails;

  return (
    <div>
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
                <Details companyDetails={{ ...companyDetails, address }} />
              </div>
              <Downloads address={address} />
              <br />
            </div>
          </Grid.Column>
          <Grid.Column width={6}>
            <Grid.Row>
              <FundingStatus
                fundingRoundSummaries={fundingRoundSummaries}
                currentFundingRoundDetails={currentFundingRoundDetails}
                address={address}
                isFinancing={isFinancing}
              />
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}


const Details = ({ companyDetails }) => {
  const truncateAddress = (str) => {
    if (`${str}`.length == 42) {
      const s = str.toUpperCase();
      return `0x${s.substring(2, 6)}...${s.substring(38)}`;
    }
  };

  const [items, setItems] = React.useState([]);
  React.useEffect(() => {
    const {
      address,
      sharesOutstanding,
      balance,
      manager,
      fundingRoundsCount,
      listingDate,
      preMoneyValuation,
      postMoneyValuation,
    } = companyDetails;
    setItems([
      {
        key: 0,
        header: truncateAddress(address),
        meta: "Address of Smart Contract",
      },
      {
        key: 1,
        header: truncateAddress(manager),
        meta: "Address of Manager",
      },
      {
        key: 2,
        header:
          preMoneyValuation === "0" ? "UNKNOWN" : `${preMoneyValuation} ETH`,
        meta: "Pre-Money Valuation",
      },
      {
        key: 3,
        header: postMoneyValuation === "0" ? "NA" : `${postMoneyValuation} ETH`,
        meta: "Post-Money Valuation",
      },
      {
        key: 4,
        header: sharesOutstanding,
        meta: "Shares Outstanding",
      },
      {
        key: 5,
        header: balance + " ETH",
        meta: "Company Balance",
      },
      {
        key: 6,
        header: fundingRoundsCount,
        meta: "Number of Funding Rounds",
      },
      {
        key: 7,
        header: listingDate,
        meta: "Date Listed",
      },
    ]);
  }, [companyDetails]);

  return <Card.Group items={items} />;
};

const Downloads = ({ address }) => {
  return (
    <div>
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
  );
};
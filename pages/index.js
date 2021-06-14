import React from "react";
import { Button, Grid } from "semantic-ui-react";
import Layout from "../components/Layout";
import CompanyCards from "../components/CompanyCards";

export async function getServerSideProps() {
  const companySummaries = [
    {
      address: "",
      name: "Apple Inc.",
      symbol: "AAPL",
      sharesOutstanding: 1000,
      isFinancing: false,
    },
    {
      address: "",
      name: "Microsoft Inc.",
      symbol: "MSFT",
      sharesOutstanding: 2000,
      isFinancing: true,
    },
    {
      address: "",
      name: "Google Inc.",
      symbol: "GOOG",
      sharesOutstanding: 3000,
      isFinancing: true,
    },
    {
      address: "",
      name: "Facebook",
      symbol: "FB",
      sharesOutstanding: 4000,
      isFinancing: false,
    },
  ];

  return { props: { companySummaries } };
}

export default function LandingPage({ companySummaries }) {
  return (
    <Layout>
      <Grid>
        <Grid.Row>
          <Grid.Column width={11}>
            <h2>The web3 stonk market</h2>
            <p>Join us in democratizing financial markets for all.</p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={11}>
            <h2>Raising Now</h2>
          </Grid.Column>
          <Grid.Column width={5}>
            <Button
              href="/explore?isFinancing=true"
              floated="right"
              content="Explore"
              color="green"
              labelPosition="right"
              icon="right arrow"
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <CompanyCards
              companySummaries={companySummaries.filter((x) => x.isFinancing)}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={11}>
            <h2>Funded</h2>
          </Grid.Column>
          <Grid.Column width={5}>
            <Button
              href="/explore?isFinancing=false"
              floated="right"
              content="View Funded"
              color="blue"
              labelPosition="right"
              icon="right arrow"
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <CompanyCards
              companySummaries={companySummaries.filter((x) => !x.isFinancing)}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
}

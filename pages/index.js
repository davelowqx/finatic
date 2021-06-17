import React from "react";
import { Button, Grid } from "semantic-ui-react";
import Layout from "../components/layout/Layout";
import CompanyCards from "../components/CompanyCards";
import { getCompanySummaries } from "../firebase/db";

export async function getServerSideProps() {
  const companySummaries = await getCompanySummaries();
  return { props: { companySummaries } };
}

export default function LandingPage({ companySummaries }) {
  return (
    <Layout>
      <Grid>
        <Grid.Row>
          <Grid.Column width={11}>
            <h2>The web3 stonk market</h2>
          </Grid.Column>
          <Grid.Column width={5}>
            <Button
              href="/signup"
              floated="right"
              content="JOIN US"
              color="red"
              labelPosition="right"
              icon="right arrow"
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <div>
              We're building the decentralised version of the NASDAQ and NYSE,
              an alternative to a system that's
              <b>
                {" "}
                opaque, tightly controlled, and held together by decades-old
                infrastructure and processes
              </b>
              . At it's core is the Ethereum Network, quietly insuring the
              integrity of your funds and your assets.
              <br />
              <div></div>
              Welcome to the world of DeFi - we hope you enjoy your stay.
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={10}>
            <h2>Financing Now</h2>
          </Grid.Column>
          <Grid.Column width={6}>
            <Button
              href="/explore?isFinancing=true"
              floated="right"
              content="EXPLORE"
              color="green"
              labelPosition="right"
              icon="right arrow"
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <CompanyCards
              companySummaries={companySummaries
                .filter((x) => x.isFinancing)
                .slice(0, 3)}
              gridView
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={10}>
            <h2>Funded</h2>
          </Grid.Column>
          <Grid.Column width={6}>
            <Button
              href="/explore?isFinancing=false"
              floated="right"
              content="VIEW FUNDED"
              color="blue"
              labelPosition="right"
              icon="right arrow"
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <CompanyCards
              companySummaries={companySummaries
                .filter((x) => !x.isFinancing)
                .slice(0, 3)}
              gridView
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
}

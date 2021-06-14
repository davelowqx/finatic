import React from "react";
import { Button, Grid } from "semantic-ui-react";
import Layout from "../components/Layout";
import CompanyCards from "../components/CompanyCards";
import db from "../firebase/db";

export async function getServerSideProps() {
  const companySummaries = [];
  let i = 0;
  await db
    .collection("companies")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        companySummaries[i++] = { address: doc.id, ...doc.data() };
      });
    });
  return { props: { companySummaries } };
}

export default function LandingPage({ companySummaries }) {
  console.log(companySummaries);
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
            <h2>Financing Now</h2>
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

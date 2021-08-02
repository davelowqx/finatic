import React from "react";
import { Header, Grid } from "semantic-ui-react";
import { AccountContext } from "../../components/context/AccountContext";
import { truncateAddress } from "../../components/utils";
import Portfolio from "../../components/Portfolio";

export async function getServerSideProps(context) {
  return { props: { profileAddress: context.params.profileAddress } };
}

export default function Profile({ profileAddress }) {
  return (
    <div>
      <br />
      <br />
      <div className="cardborder">
        <br />
        <br />
        <Grid centered>
          <Grid.Row>
            <Grid.Column width={14}>
              <Header as="h3">
                Viewing Holdings of{" "}
                <span style={{ textDecoration: "underline" }}>
                  {profileAddress}
                </span>
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={14}>
              <Portfolio profileAddress={profileAddress} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <br />
        <br />
        <br />
      </div>
      <br />
    </div>
  );
}

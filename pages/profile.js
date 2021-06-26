import React from "react";
import ConnectWallet from "../components/ConnectWallet";
import {
  Image,
  Icon,
  Container,
  Header,
  Button,
  Grid,
  Card,
} from "semantic-ui-react";

export default function profile() {
  return (
    <div>
      <br />
      <br />
      <div className="cardborder">
        <Grid centered columns={1}>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <Image src="/static/logo.svg" size="mini" centered />
              <Header as="h3">
                Welcome back,
                <br />
                <br />
                Login below or create an account to continue.
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column computer={12} mobile={16}>
              <ConnectWallet></ConnectWallet>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
  );
}

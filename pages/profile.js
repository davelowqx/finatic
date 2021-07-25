import React from "react";
import { Header, Grid } from "semantic-ui-react";
import { AccountContext } from "../components/context/AccountContext";
import { truncateAddress } from "../components/utils";
import ProfileTransactions from "../components/ProfileTransactions";
import Link from "next/link";

export default function profile() {
  const [account, setAccount] = React.useContext(AccountContext);

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
                Welcome back,{" "}
                <span style={{ color: "blue" }}>
                  {!account ? "NOT LOGGED IN" : truncateAddress(account)}
                </span>
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={14}>
              <div className="cardborder container14">
                <Header as="h3">Latest Transactions</Header>
                <br />
                <ProfileTransactions profileAddress={account} />
              </div>
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

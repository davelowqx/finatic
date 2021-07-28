import React from "react";
import { Header, Grid } from "semantic-ui-react";
import { AccountContext } from "../../components/context/AccountContext";
import { truncateAddress } from "../../components/utils";
import Portfolio from "../../components/Portfolio";

export default function Profile() {
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
              <br />
              <Portfolio profileAddress={account} />
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

import React from "react";
import { Header, Grid } from "semantic-ui-react";
import { AccountContext } from "../../components/context/AccountContext";
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
                <span style={{ textDecoration: "underline" }}>
                  {!account ? "NOT LOGGED IN" : account}
                </span>
              </Header>
              <div>Here are your holdings:</div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={14}>
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

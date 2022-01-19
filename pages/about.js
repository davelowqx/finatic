import React from "react";
import {
  Image,
  Icon,
  Container,
  Header,
  Button,
  Grid,
  Card,
  Divider,
} from "semantic-ui-react";

export default function About() {
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
              <Header as="h3">About</Header>
              <div>
                When a founder lists his campaign on <b>finatic</b>, a smart
                contract is created on the Ethereum Network, storing immutable
                details about the Campaign such as the Campaign's name, symbol,
                the manager's Ethereum address and the target amount to be
                raised. The creation of the smart contract will incur some gas
                fees, preventing misuse of the platform.
                <br />
                <br />
                Investors are then able to invest in the campaign. After 60
                days, the manager shall conclude the fundraise. If the target is
                met, tokenized shares of the Campaign will be issued to the
                investors. These ERC-20 tokens which can be easily managed with
                a MetaMask wallet. The manager will then be able to use the
                proceeds of the funding round for his intended objectives.
                However, if the fundraise fails to meet its target, all
                investors will be fully refunded.
              </div>
              <br />
              <br />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
      <br />
    </div>
  );
}

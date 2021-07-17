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
import Link from "next/link";

export default function faq() {
  return (
    <div>
      <br />
      <br />
      <div className="cardborder">
        <Grid centered>
          <Grid.Row></Grid.Row>
          <Grid.Row>
            <Grid.Column width={14}>
              <Header as="h3">How fundSME works</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={14}>
              <div>
                When a startup lists on fundSME, a smart contract is created on
                the Ethereum Network, storing immutable details about the
                company such as the company's name and symbol, the manager's
                Ethereum address and the current shares outstanding. The
                creation of the smart contract will incur some gas fees,
                preventing misuse of the platform. Thereafter, the manager will
                be able to create funding rounds with target amounts to raise
                and additional shares to be offered. Investors are able to
                invest in these funding rounds, where the minimum investment
                will be equal to the price of one share. After 60 days, the
                manager will conclude the funding round. If the funding goals
                are met, tokenized shares of the company will be issued to the
                investors. These shares are ERC-20 tokens which can be easily
                added to a MetaMask wallet. However, if the funding round failed
                to meet its target, all investors will be fully refunded.
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={14}>
              <Divider />
              <Header as="h3">
                Why choose fundSME over other investing platforms?
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={14}>
              <div>
                Most other equity financing platforms depend on a central
                authority for trust. As history has shown time and again, having
                a single point of failure can prove fatal, especially when
                dealing with large pools of capital. On the other hand, fundSME
                is one of the many Decentralised Finance projects leveraging on
                the well-established Ethereum Network. The rules governing every
                action on this platform are etched in{" "}
                <a href="https:github.com/davelowqx/fundsme">code</a> and stored
                immutably on the Ethereum Network as smart contracts.
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
  );
}

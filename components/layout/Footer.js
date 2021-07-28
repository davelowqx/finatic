import React from "react";
import { List, Image, Header, Icon, Grid, Divider } from "semantic-ui-react";

export default function Layout(props) {
  return (
    <footer>
      <br />
      <Divider section />
      <Grid centered>
        <Grid.Row divided>
          <Grid.Column width={3}>
            <Image
              className="footer-logo-image"
              circular
              size="mini"
              src="/static/logo.svg"
            />
            <div>
              <Header as="h3">fundSME</Header>
            </div>
            <br />
            <div style={{ marginTop: "1em" }}>
              Invest in startups on the Ethereum Network
            </div>
          </Grid.Column>
          <Grid.Column width={3}>
            <div>
              <Header as="h3">General</Header>
            </div>
            <br />
            <List animated divided verticalAlign="middle">
              <List.Item>
                <List.Content>
                  <List.Header as="a" href="/about#howitworks">
                    How It Works
                  </List.Header>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header as="a" href="/about#contactus">
                    Contact Us
                  </List.Header>
                </List.Content>
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <div>
              <Header as="h3">For Investors</Header>
            </div>
            <br />
            <List animated divided verticalAlign="middle">
              <List.Item>
                <List.Content>
                  <List.Header as="a" href="/about#whyinvest">
                    Why Invest
                  </List.Header>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header as="a" href="/about#risks">
                    Risks
                  </List.Header>
                </List.Content>
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <div>
              <Header as="h3">For Companies</Header>
            </div>
            <br />
            <List animated divided verticalAlign="middle">
              <List.Item>
                <List.Content>
                  <List.Header as="a" href="/about#whyraise">
                    Why Raise
                  </List.Header>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header as="a" href="/about#instruments">
                    Instruments
                  </List.Header>
                </List.Content>
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <div>
              <Header as="h3">Links</Header>
            </div>
            <br />
            <div style={{ marginTop: "1em" }}>
              <a href="https:github.com/davelowqx/fundsme">
                <Icon name="github" />
              </a>
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Divider section />
            <div className="centercontainer2" style={{ marginBottom: "-1em" }}>
              <Icon
                style={{ margin: "1em 0.5em" }}
                size="big"
                name="money bill alternate outline"
              />
              <Header as="h2" style={{ marginBottom: "1em" }}>
                <a href="/about">
                  Refer a startup and stand a chance to receive 1 ETH
                </a>
              </Header>
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Divider section />
            <div className="footer-text">
              fundSME is not regulated by any governmental body.
            </div>
            <br />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </footer>
  );
}

import React from "react";
import { List, Image, Header, Icon, Grid, Divider } from "semantic-ui-react";
import Link from "next/link";

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
              Allowing anyone to invest in early-stage companies
            </div>
          </Grid.Column>
          <Grid.Column width={3}>
            <div>
              <Header as="h3">For Investors</Header>
            </div>
            <br />
            <List animated divided verticalAlign="middle">
              <List.Item>
                <List.Content>
                  <List.Header as="a" href="/about">
                    Why Invest
                  </List.Header>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header as="a" href="/about">
                    How it works
                  </List.Header>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header as="a" href="/about">
                    FAQ
                  </List.Header>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header as="a" href="/about">
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
                  <List.Header as="a" href="/about">
                    Why Raise
                  </List.Header>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header as="a" href="/about">
                    Learn
                  </List.Header>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header as="a" href="/about">
                    FAQ
                  </List.Header>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header as="a" href="/about">
                    Instruments
                  </List.Header>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header as="a" href="/about">
                    Crowd SAFE
                  </List.Header>
                </List.Content>
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <div>
              <Header as="h3">Company</Header>
            </div>
            <br />
            <List animated divided verticalAlign="middle">
              <List.Item>
                <List.Content>
                  <List.Header as="a" href="/about">
                    About
                  </List.Header>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header as="a" href="/about">
                    Blog
                  </List.Header>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header as="a" href="/about">
                    Events
                  </List.Header>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header as="a" href="/about">
                    Contact
                  </List.Header>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header as="a" href="/about">
                    We're Hiring!
                  </List.Header>
                </List.Content>
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <div>
              <Header as="h3">Follow</Header>
            </div>
            <br />
            <div style={{ marginTop: "1em" }}>
              <Icon name="facebook" />
              <Icon name="instagram" />
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Divider section />
            <div className="centercontainer2" style={{ marginBottom: "-1em" }}>
              <Icon
                style={{ marginTop: "1em", marginBottom: "1em" }}
                size="big"
                name="money bill alternate outline"
              />
              <Header as="h2" style={{ marginBottom: "1em" }}>
                <a href="/about">Refer a startup, get $1,000</a>
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

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
              src="https://previews.dropbox.com/p/orig/ABOFglUnB0co3MIZAsQjxdb-UXaxiGNCkfbnYiLHsfTO5tFnl9z79ILZQgLc7gnIAqenGQhMJs0AeqQTJvFNcmAQByHbp_3msax_QA1V16x0kqYQTfdMIucEivw43tZDAQOmeCfmoBzhkvMWf6tOpDQbLYSMDcv2DuAn2Rlfw3zFkrmLjjZo9ISTCfRCFRXu8xaURtqGeC_R5s0XQOxo38OxpeE_6B863zyryZtuoKj0E2XuGvbp0pl_vVTaRHx7c4-pg7ZDTGp2KuA1GDezIU2vxXrSv0m-P0sCCflMUX8hWbLL6VuIARInYr3tJmZBmYiYhMmNdPheG-ydVpHbKkJx/p.svg"
            />
            <div>
              <Header as="h3">fundSME</Header>
            </div>
            <br />
            <div style={{ marginTop: "1em" }}>
              Giving everyone access to early-stage startup investing
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
                  <List.Header as="a">Why Invest</List.Header>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header as="a">How it works</List.Header>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header as="a">FAQ</List.Header>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header as="a">Risks</List.Header>
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
                  <List.Header as="a">Why Raise</List.Header>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header as="a">Learn</List.Header>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header as="a">FAQ</List.Header>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header as="a">Instruments</List.Header>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header as="a">Crowd SAFE</List.Header>
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
                  <List.Header as="a">About</List.Header>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header as="a">Blog</List.Header>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header as="a">Events</List.Header>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header as="a">Contact</List.Header>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header as="a">We're Hiring!</List.Header>
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
              <Icon size="big" name="facebook" />
              <Icon size="big" name="instagram" />
              <Icon size="big" name="twitter" />
              <Icon size="big" name="linkedin" />
              <Icon size="big" name="reddit" />
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
                <a>Refer a startup, get $1,000</a>
              </Header>
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Divider section />
            <div className="footer-text">
              fundSME is not regulated by any governmental body.
              <br />
              <br />
              This site (the "Site") is owned and maintained by TwoFinGeeks
              Inc., which is not a registered broker-dealer. TwoFinGeeks Inc.
              does not give investment advice, endorsement, analysis or
              recommendations with respect to any securities.
              <br />
              <br />
              All securities listed here are being offered by, and all
              information included on this Site is the responsibility of, the
              applicable issuer of such securities. There is no intermediary
              facilitating the offering as everything is automated through the
              smart contract. All funding-portal activities are governed and
              conducted by the smart contract
              <br />
              <br />
              Certain pages discussing the mechanics and providing educational
              materials regarding regulation crowdfunding offerings may refer to
              TwoFinGeeks as “fundSME", solely for explanatory purposes.
              TwoFinGeeks will not make investment recommendations and no
              communication, through this Site or in any other medium should be
              construed as a recommendation for any security offered on or off
              this investment platform.
              <br />
              <br />
              Investment opportunities posted on this Site are private
              placements of securities that are not publicly traded, involve a
              high degree of risk, may lose value, are subject to holding period
              requirements and are intended for investors who do not need a
              liquid investment. Past performance is not indicative of future
              results. Investors must be able to afford the loss of their entire
              investment. Qualified investors, which may be restricted to only
              Accredited Investors or non-U.S. persons, should invest in
              offerings hosted by fundSME.
              <br />
              <br />
              Neither fundSME nor any of their officers, directors, agents and
              employees makes any warranty, express or implied, of any kind
              whatsoever related to the adequacy, accuracy or completeness of
              any information on this Site or the use of information on this
              site. Offers to sell securities can only be made through official
              offering documents that contain important information about the
              investment and the issuers, including risks. Investors should
              carefully read the offering documents. Investors should conduct
              their own due diligence and are encouraged to consult with their
              tax, legal and financial advisors.
              <br />
              <br />
              By accessing the Site and any pages thereof, you agree to be bound
              by the fundSME Terms of Use and Privacy Policy. Please also see
              fundSME Business Continuity Plan and Additional Risk Disclosures.
              <br />
              <br />
              Investors should verify any issuer information they consider
              important before making an investment. Investments in private
              companies are particularly risky and may result in total loss of
              invested capital. Past performance of a security or a company does
              not guarantee future results or returns. Only investors who
              understand the risks of early stage investment and who meet the
              fundSME's investment criteria may invest.
              <br />
              <br />
              fundSME will not verify information provided by companies on this
              Site and makes no assurance as to the completeness or accuracy of
              any such information. Additional information about companies
              fundraising on the Site can be found by doing your own due
              diligence, or the offering documentation located on the Site.
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </footer>
  );
}

import React from "react";
import {
  Image,
  Icon,
  Container,
  Header,
  Button,
  Grid,
  Card,
} from "semantic-ui-react";
import Link from "next/link";

export default function faq() {
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
                Welcome to fundSME!
                <br />
                <br />
                Login below or create an account to continue.
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column computer={12} mobile={16}>
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
                materials regarding regulation crowdfunding offerings may refer
                to TwoFinGeeks as “fundSME", solely for explanatory purposes.
                TwoFinGeeks will not make investment recommendations and no
                communication, through this Site or in any other medium should
                be construed as a recommendation for any security offered on or
                off this investment platform.
                <br />
                <br />
                Investment opportunities posted on this Site are private
                placements of securities that are not publicly traded, involve a
                high degree of risk, may lose value, are subject to holding
                period requirements and are intended for investors who do not
                need a liquid investment. Past performance is not indicative of
                future results. Investors must be able to afford the loss of
                their entire investment. Qualified investors, which may be
                restricted to only Accredited Investors or non-U.S. persons,
                should invest in offerings hosted by fundSME.
                <br />
                <br />
                Neither fundSME nor any of their officers, directors, agents and
                employees makes any warranty, express or implied, of any kind
                whatsoever related to the adequacy, accuracy or completeness of
                any information on this Site or the use of information on this
                site. Offers to sell securities can only be made through
                official offering documents that contain important information
                about the investment and the issuers, including risks. Investors
                should carefully read the offering documents. Investors should
                conduct their own due diligence and are encouraged to consult
                with their tax, legal and financial advisors.
                <br />
                <br />
                By accessing the Site and any pages thereof, you agree to be
                bound by the fundSME Terms of Use and Privacy Policy. Please
                also see fundSME Business Continuity Plan and Additional Risk
                Disclosures.
                <br />
                <br />
                Investors should verify any issuer information they consider
                important before making an investment. Investments in private
                companies are particularly risky and may result in total loss of
                invested capital. Past performance of a security or a company
                does not guarantee future results or returns. Only investors who
                understand the risks of early stage investment and who meet the
                fundSME's investment criteria may invest.
                <br />
                <br />
                fundSME will not verify information provided by companies on
                this Site and makes no assurance as to the completeness or
                accuracy of any such information. Additional information about
                companies fundraising on the Site can be found by doing your own
                due diligence, or the offering documentation located on the
                Site.
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
  );
}

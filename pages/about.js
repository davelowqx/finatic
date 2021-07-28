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
              <Header as="h3">Preface</Header>
              <div>
                <p>
                  Previously, angel investing was only available to the
                  wealthiest people, with regulators commonly citing the high
                  risks of investing in early stage companies. This is
                  controversial, as life changing wealth can be created by
                  investing early. This spurred us to create fundSME, where
                  anyone with an Ethereum wallet can back projects they believe
                  in.
                </p>
              </div>
              <br />
              <Divider id="howitworks" />
              <Header as="h3">How fundSME platform works</Header>
              <div>
                When a founder lists his company on fundSME, a smart contract is
                created on the <span>Ethereum Network</span>, storing immutable
                details about the company such as the company's name, symbol,
                the manager's Ethereum address and the current shares
                outstanding. These shares will be to deposited in the manager's
                address, allowing him to distribute them to the existing
                shareholders. Additionally, the creation of the smart contract
                will incur some gas fees, preventing misuse of the platform.
                <br />
                <br />
                Thereafter, the manager will be able raise capital by creating
                funding rounds with a target amount and additional shares to be
                offered. Investors are able to invest in these funding rounds,
                where the minimum investment will be equal to the price of one
                share. After 60 days, the manager shall conclude the funding
                round. If the funding goals are met, tokenized shares of the
                company will be issued to the investors. These shares are ERC-20
                tokens which can be easily added to a MetaMask wallet. The
                manager will then be able to use the proceeds of the funding
                round for business operations. However, if the funding round
                fails to meet its target, all investors will be fully refunded.
                Additionally, the manager is able to payout dividends to all
                shareholders.
                <br />
                <br />
                All participants are able to freely view the holdings of other
                ethereum addresses to aid their decision making. For example, an
                investor may check if the founder owns a majority stake of his
                own company.
              </div>
              <br />
              <Divider id="whyinvest" />
              <Header as="h3">Why invest on fundSME?</Header>
              <div>
                <p>
                  Most other equity financing platforms depend on a central
                  authority for trust and lack transparency. As history has
                  shown time and again, depending on a single entity for trust
                  is never reliable, especially when there is conflict of
                  interest and large amounts of capital are at stake. On the
                  other hand, fundSME is one of the many Decentralised Finance
                  projects leveraging on the well-established Ethereum Network.
                  The rules governing every action on this platform are etched
                  in <a href="https:github.com/davelowqx/fundsme">code</a> and
                  stored immutably on smart contracts in the Ethereum Network.
                </p>
                <br />
              </div>
              <Divider id="risks" />
              <Header as="h3">What are the risks?</Header>
              <div>
                <p>
                  Every investor should be aware that investing in companies on
                  fundSME's platform involves a high degree of risk, regardless
                  of any assurance provided by the company.
                  <br />
                  <br />
                  There can be no assurance that: any information or projection
                  by the company has been validated or is reliable, a startup
                  will achieve its business plan, or an investor will receive a
                  return of any part of its investment or any investment
                  purchased through the Republic platform will be able to be
                  resold.
                  <br />
                  <br />
                  The following considerations, among others, should be
                  carefully evaluated before making an investment in a company
                  through its offering on Republic.
                  <br />
                  <br />
                  Risk inherent in startup investments; investors may, and
                  frequently do, lose all of their investment Investments in
                  startups (including early-stage ventures and emerging
                  technology companies) involve a high degree of risk.
                  <br />
                  <br />
                  Financial and operating risks confronting startups are
                  significant. While targeted returns should reflect the
                  perceived level of risk in any investment situation, such
                  returns may never be realized and/or may not be adequate to
                  compensate an investor for risks taken.
                  <br />
                  <br />
                  Loss of an investor’s entire investment is possible and can
                  easily occur. Moreover, the timing of any return on investment
                  is highly uncertain. The startup market is highly competitive
                  and the percentage of companies that survive and prosper is
                  small.
                  <br />
                  <br />
                  Startups often experience unexpected problems in the areas of
                  product development, manufacturing, marketing, financing, and
                  general management, among others, which frequently cannot be
                  solved. Startups may require substantial amounts of financing,
                  which may not be available through institutional private
                  placements, the public markets or otherwise.
                </p>
                <br />
              </div>
              <Divider id="whyraise" />
              <Header as="h3">Why raise capital with fundSME?</Header>
              <div>
                <p>
                  By listing your company on fundSME, you can benefit from
                  having a diversified broad base of retail investors, without
                  the constant pressure of institutional money who are primarily
                  concerned with short term profits.
                </p>
                <br />
              </div>
              <Divider id="instruments" />
              <Header as="h3">
                What are the investment instruments available on fundSME?
              </Header>
              <div>
                <p>
                  Currently, fundSME only offers equity financing. We are
                  exploring the possibility of incorporating other structures
                  such as debt and convertable notes.
                </p>
                <br />
              </div>
              <Divider id="contactus" />
              <Header as="h3">How do we contact the TwoFinGeeks team?</Header>
              <div>We prefer to stay anonymous, thanks.</div>
              <br />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
      <br />
    </div>
  );
}

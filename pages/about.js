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

export default function about() {
  return (
    <div>
      <br />
      <br />
      <div className="cardborder" id="whyinvest">
        <br />
        <br />
        <Grid centered>
          <Grid.Row>
            <Grid.Column width={14}>
              <Header as="h3">Why invest in Early Stage Startups?</Header>
              <div>
                <p>
                  Angel investing — hunting for a unicorn — was previously
                  available to only the wealthiest 3% of the US population. With
                  fundSME, everyone can invest in private startups for a chance
                  to earn a return. Unicorns are startups that reach the
                  valuation of over $1B. If you find and invest in one at an
                  early stage, you could earn a significant return on
                  investment. While no one can predict which companies will
                  become unicorns, fundSME gives you access to companies who
                  have the potential to become one.
                </p>
              </div>
            </Grid.Column>
          </Grid.Row>
          <Divider id="howitworks" />
          <Grid.Row>
            <Grid.Column width={14}>
              <Header as="h3">How fundSME platform works</Header>
              <div>
                When a startup lists on fundSME, a smart contract is created on
                the <span>Ethereum Network</span>, storing immutable details
                about the company such as the company's name and symbol, the
                manager's Ethereum address and the current shares outstanding.
                The creation of the smart contract will incur some gas fees,
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
          <Divider id="whyus" />
          <Grid.Row>
            <Grid.Column width={14}>
              <Header as="h3">
                Why choose fundSME over other investing platforms?
              </Header>
              <div>
                <p>
                  Most other equity financing platforms depend on a central
                  authority for trust. As history has shown time and again,
                  having a single point of failure can prove fatal, especially
                  when dealing with large pools of capital. On the other hand,
                  fundSME is one of the many Decentralised Finance projects
                  leveraging on the well-established Ethereum Network. The rules
                  governing every action on this platform are etched in{" "}
                  <a href="https:github.com/davelowqx/fundsme">code</a> and
                  stored immutably on the Ethereum Network as smart contracts.
                </p>
                <br />
              </div>
            </Grid.Column>
          </Grid.Row>
          <Divider id="risks" />
          <Grid.Row>
            <Grid.Column width={14}>
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
            </Grid.Column>
          </Grid.Row>
          <Divider id="whyraise" />
          <Grid.Row>
            <Grid.Column width={14}>
              <Header as="h3">
                As a company, why should I raise my money with fundSME?
              </Header>
              <div>
                <p>
                  fundSME provides companies an end-to-end solution of governing
                  your equity through the disbursement of shares on the
                  platform. Additionally, owners who issue shares of their
                  company receive the cash directly from the investors through
                  the smart contract, making it a safe form of equity investing.
                </p>
                <br />
              </div>
            </Grid.Column>
          </Grid.Row>
          <Divider id="learn" />
          <Grid.Row>
            <Grid.Column width={14}>
              <Header as="h3">
                How can I learn more about equity financing?
              </Header>
              <div>
                <p>
                  We suggest watcing YouTube videos on the subject matter and
                  visiting websites such as{" "}
                  <a href="https://www.investopedia.com/terms/e/equityfinancing.asp">
                    Investopedia
                  </a>
                  .
                </p>
                <br />
              </div>
            </Grid.Column>
          </Grid.Row>
          <Divider id="instruments" />
          <Grid.Row>
            <Grid.Column width={14}>
              <Header as="h3">
                What are the investment instruments available on fundSME?
              </Header>
              <div>
                <p>
                  fundSME currently offers only one type of financing
                  instruments which is equity financing. In the future, we look
                  forward to providing debt financing and convertable notes.
                </p>
                <br />
              </div>
            </Grid.Column>
          </Grid.Row>
          <Divider id="about" />
          <Grid.Row>
            <Grid.Column width={14}>
              <Header as="h3">
                What is fundSME and who are the TwoFinGeeks?
              </Header>
              <div>
                <p>
                  fundSME is a decentralised platform built on the ethereum
                  network, linking businesses seeking equity financing with
                  everyday investors. fundSME creates a seamless investment
                  process through the use of smart contracts to automate the
                  equity financing process securely on the blockchain. Please
                  refer to our package.json on our{" "}
                  <a href="https:github.com/davelowqx/fundsme">github</a> to see
                  what is our techstack.
                </p>
                <br />
              </div>
            </Grid.Column>
          </Grid.Row>
          <Divider id="community" />
          <Grid.Row>
            <Grid.Column width={14}>
              <Header as="h3">Is there a community telegram channel?</Header>
              <div>
                <p>No, you are on your own.</p>
                <br />
              </div>
            </Grid.Column>
          </Grid.Row>
          <Divider id="contactus" />
          <Grid.Row>
            <Grid.Column width={14}>
              <Header as="h3">How do we contact the TwoFinGeeks team?</Header>
              <div>
                <p>
                  For technical queries, call Dave at +65 8817 9584 <br />
                  For general queries, call David at +65 8288 3695
                </p>
                <br />
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
      <br />
    </div>
  );
}

import React from "react";
import {
  Image,
  Icon,
  Divider,
  Container,
  Header,
  Button,
  Grid,
  Card,
} from "semantic-ui-react";
import Layout from "../components/layout/Layout";
import CompanyCards from "../components/CompanyCards";
import { getCompanySummaries } from "../firebase/db";

export async function getServerSideProps() {
  const companySummaries = await getCompanySummaries();
  return { props: { companySummaries } };
}

export default function LandingPage({ companySummaries }) {
  return (
    <Layout>
      <Grid>
        <Grid.Row
          style={{
            marginBottom: "5em",
          }}
        >
          <Grid.Column width={9}>
            <Container
              text
              style={{
                marginTop: "1.5em",
                marginBottom: "1.5em",
                paddingLeft: "1em",
              }}
            >
              <Header
                as="h1"
                content="Invest in local founders building the future
                "
                style={{
                  fontSize: "4em",
                  fontWeight: "normal",
                  marginTop: "1.5em",
                  marginBottom: "1em",
                }}
              />
              <Header
                as="h2"
                content="Invest as little as $100 in the startups and small businesses you believe in."
                style={{
                  fontSize: "1.7em",
                  fontWeight: "normal",
                  marginTop: "1.5em",
                  marginBottom: "1em",
                }}
              />
              <Button
                primary
                size="huge"
                href="/login"
                style={{
                  fontSize: "1.5em",
                  fontWeight: "bold",
                  marginTop: "1.5em",
                }}
              >
                JOIN NOW
                <Icon name="right arrow" />
              </Button>
              <Header
                as="h4"
                style={{
                  fontWeight: "normal",
                  marginBottom: "1em",
                  color: "grey",
                }}
              >
                Investments are risky, illiquid and may result in total loss of
                capital. <a href="/faq">Learn more</a>
              </Header>
            </Container>
          </Grid.Column>
          <Grid.Column width={7}>
            <Image
              className="posterboy"
              src="https://previews.dropbox.com/p/thumb/ABNKx3djUmsMCys_DsjnZOi54AY0okqR1AIIzeQl7YSkivO49OuZ-6nKLlocJ41PDwLXICyn_fIZtlBd_CO3knvgjmEYeiJIThq3G3vzk5Ihv2KW6495CzpulqIyhQOcFcbdx2_AxrjIWeEX3SPqTTyEii94nEVoMuVqKZMJRvEDZ5o9R45m_pnRNxq1F4XoRTgl_oZc-gPIbuv-KMn5wlRdTvkF65BvK8-LiFHoJm1ztxBcaLyDFtmXj-VkMIiCaG-6PxtWq_DOYV2SqaGmsbKS3mwPcwn6DATz9qN9bACxfLL725tmoLqGY-cFWU2heo6zSzfAEWmNjE8c9hk3t-r3IsvbXlMQQOyIt4_dufimRHn2fJxIs08Q4H8wuYw6UiN2pRcFEPtFytxYsX7JGugvSR6RvsHtxYnYDCAEdh2zVRjCd_nGR-iaWiPSAuSJKcyJMqPZoBUpOtrcPfTmM0iK0NuE9ju-ubuVLNtSTHc_rA/p.png"
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            <Card fluid className="eq-card">
              <Card.Content>
                <Card.Header>$150M+</Card.Header>
                <Card.Description>Invested</Card.Description>
              </Card.Content>
              <Card.Content extra className="cardtext">
                in the past 12 months
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={4}>
            <Card fluid className="eq-card">
              <Card.Content>
                <Card.Header>1+ Million</Card.Header>
                <Card.Description>Members</Card.Description>
              </Card.Content>
              <Card.Content extra className="cardtext">
                Individual {"&"} Institutional investor community
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={8}>
            <div className="container50">
              <Card fluid className="eq-card">
                <Card.Content>
                  <Card.Header as="h1">250+</Card.Header>
                  <Card.Description>Deals Done</Card.Description>
                </Card.Content>
                <Card.Content extra className="cardtext">
                  From A to CF to D, seed to pre-IPO
                </Card.Content>
              </Card>
            </div>
            <div className="container50">
              <div fluid className="eq-card cardborder">
                <div className="container25">
                  <div className="centeredtext">text</div>
                </div>
                <div className="container25">
                  <div className="centeredtext">text</div>
                </div>
                <div className="container25">
                  <div className="centeredtext">text</div>
                </div>
                <div className="container25">
                  <div className="centeredtext">text</div>
                </div>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={10}>
            <Header
              as="h1"
              content="Invest Now"
              style={{
                fontSize: "3em",
                fontWeight: "bold",
                marginTop: "1.5em",
              }}
            />
          </Grid.Column>
          <Grid.Column width={6}></Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <CompanyCards
              companySummaries={companySummaries
                .filter((x) => x.isFinancing)
                .slice(0, 3)}
              gridView
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={10}>
            <h2>Funded</h2>
          </Grid.Column>
          <Grid.Column width={6}>
            <Button
              href="/explore?isFinancing=false"
              floated="right"
              content="VIEW FUNDED"
              color="blue"
              labelPosition="right"
              icon="right arrow"
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <CompanyCards
              companySummaries={companySummaries
                .filter((x) => !x.isFinancing)
                .slice(0, 3)}
              gridView
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
}

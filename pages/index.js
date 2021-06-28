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
import CompanyCards from "../components/CompanyCards";

export default function LandingPage() {
  const [companySummaries, setCompanySummaries] = React.useState([]);
  React.useEffect(async () => {
    const companySummaries = await fetch(
      `${
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : "https://fundsme.vercel.app"
      }/api/companies`
    ).then((res) => res.json());
    setCompanySummaries(companySummaries);
  }, []);

  return (
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
          <Image className="posterboy" src="/static/posterboy.png" />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={4}>
          <Card className="eq-card">
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
          <Card className="eq-card">
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
            <Card className="eq-card">
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
            <div fluid="true" className="eq-card cardborder">
              <div className="container25">
                <div className="centeredtext">Company A Stats</div>
              </div>
              <div className="container25">
                <div className="centeredtext">Company B Stats</div>
              </div>
              <div className="container25">
                <div className="centeredtext">Company C Stats</div>
              </div>
              <div className="container25">
                <div className="centeredtext">Company D Stats</div>
              </div>
            </div>
          </div>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <br></br>
        <br></br>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={10}>
          <Header
            as="h1"
            content="Invest Now"
            style={{
              fontSize: "3em",
              fontWeight: "bold",
            }}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <Button
            href="/explore?isFinancing=false"
            floated="right"
            content="SEE THEM"
            color="green"
            labelPosition="right"
            icon="right arrow"
          />
        </Grid.Column>
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
        <br />
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={10}>
          <Header
            as="h1"
            content="Funded"
            style={{
              fontSize: "3em",
              fontWeight: "bold",
            }}
          />
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
  );
}

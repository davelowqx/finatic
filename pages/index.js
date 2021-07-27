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
import CompanyCards from "../components/CompanyCards";

export default function LandingPage() {
  const [companySummaries, setCompanySummaries] = React.useState([]);
  React.useEffect(() => {
    fetch(
      `${
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : "https://fundsme.vercel.app"
      }/api/companies`
    )
      .then((res) => res.json())
      .then((deets) => setCompanySummaries(deets.error ? [] : deets));
  }, []);
  // TODO: handle error fetching data

  return (
    <Grid centered>
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
              content="Invest in startups, on the Ethereum Network"
              style={{
                fontSize: "4em",
                fontWeight: "normal",
                marginTop: "1.5em",
                marginBottom: "1em",
              }}
            />
            <Header
              as="h2"
              content="Hold ERC-20 tokenized shares of companies building the future"
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
              href="/about"
              style={{
                fontSize: "1.5em",
                fontWeight: "bold",
                marginTop: "1.5em",
              }}
            >
              HOW IT WORKS
            </Button>
          </Container>
        </Grid.Column>
        <Grid.Column width={7}>
          <Image className="posterboy" src="/static/ethereum.png" />
        </Grid.Column>
      </Grid.Row>
      <Divider />
      <Grid.Row>
        <Grid.Column width={10}>
          <Header
            as="h1"
            content="Invest Now"
            style={{
              fontSize: "3em",
              fontWeight: "bold",
              marginTop: "10px",
            }}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <div>
            <Button
              href="/explore"
              floated="right"
              content="SEE THEM"
              color="green"
              labelPosition="right"
              icon="right arrow"
              style={{
                marginTop: "20px",
              }}
            />
          </div>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <CompanyCards
            companySummaries={companySummaries}
            viewFinancing={true}
            max={3}
          />
          <br />
          <br />
        </Grid.Column>
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
        <Grid.Column width={6}></Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <CompanyCards
            companySummaries={companySummaries}
            viewFinancing={false}
            max={3}
          />
          <br />
          <br />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

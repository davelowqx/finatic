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
              content="Invest in businesses of the future"
              style={{
                fontSize: "4em",
                fontWeight: "normal",
                marginTop: "1.5em",
                marginBottom: "1em",
              }}
            />
            <Header
              as="h2"
              content="Invest as little as $100 in the startups you believe in."
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
              href="/explore"
              style={{
                fontSize: "1.5em",
                fontWeight: "bold",
                marginTop: "1.5em",
              }}
            >
              SEE THEM
              <Icon name="right arrow" />
            </Button>
          </Container>
        </Grid.Column>
        <Grid.Column width={7}>
          <Image className="posterboy" src="/static/posterboy.png" />
        </Grid.Column>
      </Grid.Row>
      <Divider />
      <Grid.Row>
        <Grid.Column>
          <Description />
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
        <br />
        <br />
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
            href="/explore"
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
            companySummaries={companySummaries}
            viewFinancing={true}
            max={3}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <br />
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
        <Grid.Column width={6}></Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column width={16}>
          <CompanyCards
            companySummaries={companySummaries}
            viewFinancing={false}
            max={3}
          />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <br />
        <br />
      </Grid.Row>
      <Grid.Row>
        <br />
        <br />
      </Grid.Row>
    </Grid>
  );
}

const Description = () => {
  const text = [
    {
      title: `It's much riskier`,
      desc: `Never invest more than you can afford to lose. 
      Startups are hard. Even the best founders fail.`,
    },
    {
      title: `Win big or lose all`,
      desc: `Startups win big or go bankrupt. Consider
            investing in them more like socially-good lottery tickets.`,
    },
    {
      title: `Hold for the long term`,
      desc: `When it works, it takes a long time to 
      earn a return. Expect to hold for years.`,
    },
    {
      title: `Build the future`,
      desc: `Your dollars go to the company to help create jobs,
        build products, and grow companies.`,
    },
    {
      title: `There are often perks `,
      desc: `Investors often get perks like VIP access to new products or discounts.
      You can help`,
    },
    {
      title: `You can offer more than money.`,
      desc: `The best angel investors help the companies they invest in succeed.`,
    },
  ];

  return (
    <Grid centered>
      <br />
      <Header as="h1" content="fundSME is a new kind of stock market" />
      <Header
        as="h3"
        content="Unlike the NASDAQ, we’re meant for startups and small businesses.
            What’s the difference? "
      />
      <Grid.Row>
        {text.slice(0, 3).map((obj) => (
          <Grid.Column width={5}>
            <Header textAlign="center" as="h4" content={obj.title} />
            <div>{obj.desc}</div>
          </Grid.Column>
        ))}
      </Grid.Row>
      <Grid.Row>
        {text.slice(3, 6).map((obj, i) => (
          <Grid.Column width={5} key={i}>
            <Header textAlign="center" as="h4" content={obj.title} />
            <div>{obj.desc}</div>
          </Grid.Column>
        ))}
      </Grid.Row>
      <Grid.Row>
        <br />
      </Grid.Row>
      <Button href="/about" content="HOW IT WORKS" />
      <Grid.Row>
        <br />
      </Grid.Row>
    </Grid>
  );
};

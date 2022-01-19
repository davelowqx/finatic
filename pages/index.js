import React from "react";
import { Image, Header, Button, Grid } from "semantic-ui-react";
import CampaignCards from "../components/CampaignCards";

export default function LandingPage() {
  const [campaignSummaries, setCampaignSummaries] = React.useState([]);
  React.useEffect(() => {
    fetch("/api/campaigns")
      .then((res) => res.json())
      .then(setCampaignSummaries);
  }, []);

  const [viewFinancing, setViewFinancing] = React.useState(true);
  const len = campaignSummaries.filter(
    ({ status }) => !!status === viewFinancing
  ).length;

  return (
    <>
      <Grid centered>
        <Grid.Row>
          <Grid.Column width={13}>
            <br />
            <Header as="h1" content="Back campaigns on the Ethereum Network" />
            <Header
              as="h3"
              content="Hold ERC-20 tokens of projects building the future."
            />
            <Button primary href="/about">
              HOW IT WORKS
            </Button>
            <br />
          </Grid.Column>
          <Grid.Column width={3}>
            <Image className="mainpage-image" src="/ethereum.png" />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Button.Group size="mini">
            <Button
              toggle
              content="Financing"
              active={viewFinancing}
              onClick={() => setViewFinancing(true)}
            ></Button>
            <Button
              toggle
              content="Funded"
              active={!viewFinancing}
              onClick={() => setViewFinancing(false)}
            ></Button>
          </Button.Group>
        </Grid.Row>

        <Grid.Row>
          <Header as="h5" color="grey" textAlign="center">
            {len} {len === 1 ? "Campaign" : "Campaigns"}{" "}
            {viewFinancing ? "Financing" : "Funded"}
          </Header>
        </Grid.Row>
        <Grid.Row>
          <CampaignCards
            campaignSummaries={campaignSummaries}
            viewFinancing={viewFinancing}
          />
        </Grid.Row>
      </Grid>
    </>
  );
}

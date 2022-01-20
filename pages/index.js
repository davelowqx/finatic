import React from "react";
import { Image, Icon, Header, Button, Grid, Divider } from "semantic-ui-react";
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
      <br />
      <br />
      <div className="flex">
        <div className="grow">
          <Header as="h1" content="Back campaigns on the Ethereum Network" />
          <br />
          <Header
            as="h3"
            content="Hold ERC-20 tokens of projects building the future."
          />
          <br />
          <Button primary href="/about">
            HOW IT WORKS
            <Icon name="arrow right" />
          </Button>
        </div>
        <Image src="/ethereum.png" style={{ width: "100px", margin: "2rem" }} />
      </div>

      <br />
      <Divider />
      <br />

      <CampaignCards
        campaignSummaries={campaignSummaries}
        viewFinancing={viewFinancing}
      />

      <br />
      <br />
    </>
  );
}

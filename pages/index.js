import React from "react";
import {
  Image,
  Icon,
  Header,
  Button,
  Loader,
  Divider,
  Segment,
} from "semantic-ui-react";
import CampaignCards from "../components/CampaignCards";

export default function LandingPage() {
  const [loading, setLoading] = React.useState(true);
  const [campaigns, setCampaigns] = React.useState([]);
  React.useEffect(async () => {
    setLoading(true);
    try {
      await fetch("/api/campaigns")
        .then((res) => res.json())
        .then(setCampaigns);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

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

      <div className="relative">
        {loading ? (
          <Loader active={loading} />
        ) : (
          <CampaignCards campaigns={campaigns} />
        )}
      </div>

      <br />
    </>
  );
}

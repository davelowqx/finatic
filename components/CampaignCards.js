import React from "react";
import { Image, Header, Button, Card, Icon } from "semantic-ui-react";
import { daysLeft } from "./utils";
import { fromWei } from "./utils";

export default function CampaignCards({ campaignSummaries, viewFinancing }) {
  return (
    <Card.Group itemsPerRow={3}>
      {campaignSummaries
        .filter(({ status }) => (viewFinancing ? !!status : !status))
        .reverse()
        .map(
          ({
            campaignAddress,
            name,
            description,
            imageUrl,
            listingTimestamp,
            targetAmount,
          }) => {
            const [error, setError] = React.useState(false);
            const [loading, setLoading] = React.useState(true);
            const [fields, setFields] = React.useState({
              status: 0,
              balance: 0,
            });
            React.useEffect(async () => {
              try {
                const { status, balance } = await fetch(
                  `/api/campaigns/${campaignAddress}`
                ).then((res) => res.json());
                setFields({ status, balance });
                setLoading(false);
              } catch (err) {
                setLoading(false);
                setError(true);
              }
            }, []);
            return (
              <Card
                className="cardborder"
                key={campaignAddress}
                href={`/${campaignAddress}`}
                fluid
                color={fields.status ? "green" : "red"}
              >
                <Image src={imageUrl} wrapped ui />
                {!fields.status && (
                  <div
                    style={{
                      position: "absolute",
                      right: "5%",
                      top: "5%",
                    }}
                  >
                    <Button size="mini" color="green">
                      {daysLeft(listingTimestamp)} Days Left
                    </Button>
                  </div>
                )}
                <Card.Content>
                  <Card.Header>{name}</Card.Header>
                  <Card.Description>
                    {`${
                      description.length > 120
                        ? description.substring(0, 120) + "..."
                        : description
                    }`}
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  {error && <div>Oops, something went wrong</div>}
                  {!error && loading && <div>loading</div>}
                  {!error && !loading && !fields.status && (
                    <>
                      <Icon name="target" />
                      <b>{`${fromWei(targetAmount)} ETH `}</b>
                      {`| ${parseInt(
                        (100 * parseInt(fields.balance)) /
                          parseInt(targetAmount)
                      )}% funded`}
                    </>
                  )}
                  {!error && !loading && !!fields.status && (
                    <Header>Funded</Header>
                  )}
                </Card.Content>
              </Card>
            );
          }
        )}
    </Card.Group>
  );
}

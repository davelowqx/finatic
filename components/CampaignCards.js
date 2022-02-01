import React from "react";
import { Image, Header, Button, Card, Icon } from "semantic-ui-react";
import { daysLeft } from "./utils";
import { fromWei } from "./utils";

export default function CampaignCards({ campaigns }) {
  return (
    <Card.Group itemsPerRow={3}>
      {campaigns
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
                console.log({ status, balance, targetAmount });
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
                <div className="square">
                  <img src={imageUrl} />
                </div>
                {!fields.status && (
                  <div
                    className="absolute"
                    style={{
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
                    <div style={{ height: "4.2855rem", overflow: "hidden" }}>
                      {description.substring(0, 120)}
                    </div>
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  {error && <div>Oops, something went wrong</div>}
                  {!error && loading && <div>loading</div>}
                  {!error && !loading && fields.status === 0 && (
                    <div>
                      <Icon name="target" />
                      <b>{`${fromWei(targetAmount)} ETH `}</b>
                      {`| ${parseInt(
                        (100 * parseInt(fields.balance)) /
                          parseInt(targetAmount)
                      )}% funded`}
                    </div>
                  )}
                  {!error && !loading && fields.status === 1 && (
                    <div>
                      <Icon name="check circle" />
                      <b>Funded</b>
                    </div>
                  )}
                  {!error && !loading && fields.status === 2 && (
                    <div>
                      <Icon name="close" />
                      <b>Expired</b>
                    </div>
                  )}
                </Card.Content>
              </Card>
            );
          }
        )}
    </Card.Group>
  );
}

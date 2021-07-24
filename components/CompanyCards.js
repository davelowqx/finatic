import React from "react";
import { Header, Button, Card, Item } from "semantic-ui-react";
import { createFundingRound } from "./Setters";

export default function CompanyCards({
  companySummaries = [],
  viewFinancing,
  sliceMin,
  sliceMax,
}) {
  return (
    <Card.Group itemsPerRow={3}>
      {companySummaries
        .slice()
        .reverse()
        .filter(({ isFinancing }) =>
          viewFinancing ? isFinancing : !isFinancing
        )
        .slice(sliceMin, sliceMax)
        .map(
          ({
            address,
            name,
            activeFundingRoundDetails,
            isFinancing,
            progress,
            description,
          }) => {
            const { creationTimestamp } = activeFundingRoundDetails;
            const daysLeft = parseInt(
              (creationTimestamp + 60 * 24 * 60 * 60 - Date.now() / 1000) /
                (24 * 60 * 60)
            );
            return (
              <Card
                className="company-card"
                key={address}
                href={`/companies/${address}`}
                fluid
                color={isFinancing ? "green" : "red"}
              >
                <Card.Content header={name} textAlign="center" />
                <Card.Content
                  style={{
                    height: "200px",
                    backgroundImage: `url(https://cdn.pixabay.com/photo/2017/05/13/15/18/dear-2309801_1280.jpg)`,
                    backgroundSize: "cover",
                  }}
                >
                  {isFinancing && (
                    <Button size="mini" color="green" floated="right">
                      {daysLeft} Days Left
                    </Button>
                  )}
                </Card.Content>
                <Card.Content>
                  <Card.Description style={{ color: "black" }}>
                    {`${description.substring(0, 120)}...`}
                  </Card.Description>
                </Card.Content>
                <Card.Content>
                  {isFinancing && (
                    <Card.Meta>
                      <Header>
                        {activeFundingRoundDetails.targetAmount} ETH
                      </Header>{" "}
                      {progress}% funded
                    </Card.Meta>
                  )}
                  {!isFinancing && (
                    <Card.Meta>
                      <Header>Funded</Header>
                    </Card.Meta>
                  )}
                </Card.Content>
              </Card>
            );
          }
        )}
    </Card.Group>
  );
}

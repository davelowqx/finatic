import React from "react";
import { Header, Button, Card, Item } from "semantic-ui-react";
import { createFundingRound } from "./Setters";
import { daysLeft } from "../components/utils";

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
            const days = daysLeft(activeFundingRoundDetails.creationTimestamp);
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
                      {days} Days Left
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
                        {activeFundingRoundDetails.currentAmount} {" of "}
                        {activeFundingRoundDetails.targetAmount} ETH raised
                      </Header>
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

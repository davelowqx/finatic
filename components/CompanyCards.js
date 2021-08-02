import React from "react";
import { Image, Header, Button, Card, Icon } from "semantic-ui-react";
import { createFundingRound } from "./Setters";
import { daysLeft } from "../components/utils";

export default function CompanyCards({
  companySummaries = [],
  viewFinancing,
  max,
}) {
  return (
    <Card.Group itemsPerRow={3}>
      {companySummaries
        .filter(({ isFinancing }) =>
          viewFinancing ? isFinancing : !isFinancing
        )
        .slice(0, max)
        .reverse()
        .map(
          ({
            companyAddress,
            name,
            symbol,
            description,
            imageUrl,
            isFinancing,
            activeFundingRoundDetails,
            progress,
          }) => {
            const days = daysLeft(activeFundingRoundDetails.creationTimestamp);
            return (
              <Card
                className="cardborder"
                key={companyAddress}
                href={`/companies/${companyAddress}`}
                fluid
                color={isFinancing ? "green" : "red"}
              >
                <Image src={imageUrl} wrapped ui />
                {isFinancing && (
                  <div>
                    <Button
                      size="mini"
                      color="green"
                      className="companycard-button"
                    >
                      {days} Days Left
                    </Button>
                  </div>
                )}
                <Card.Content>
                  <Card.Header>{name}</Card.Header>
                  <Card.Description style={{ color: "black" }}>
                    {`${description.substring(0, 120)}...`}
                  </Card.Description>
                  <Card.Meta></Card.Meta>
                </Card.Content>
                <Card.Content extra>
                  {isFinancing && (
                    <>
                      <Icon name="target"></Icon>
                      <b>
                        {activeFundingRoundDetails.targetAmount} ETH{" "}
                      </b> | {progress}% funded
                    </>
                  )}
                  {!isFinancing && <Header>Funded</Header>}
                </Card.Content>
              </Card>
            );
          }
        )}
    </Card.Group>
  );
}

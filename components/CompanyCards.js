import React from "react";
import { Header, Button, Card, Item } from "semantic-ui-react";

export default function CompanyCards({
  companySummaries = [],
  viewFinancing,
  max = 15,
}) {
  return (
    <Card.Group itemsPerRow={3}>
      {companySummaries
        .slice()
        .reverse()
        .filter(({ isFinancing }) =>
          viewFinancing ? isFinancing : !isFinancing
        )
        .slice(0, max)
        .map(
          ({
            address,
            name,
            valuation,
            isFinancing,
            currentAmount,
            targetAmount,
            progress,
            description,
          }) => (
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
                <Countdown isFinancing={isFinancing} daysLeft={0} />
              </Card.Content>
              <Card.Content>
                <Card.Description style={{ color: "black" }}>
                  {`${description.substring(0, 120)}...`}
                </Card.Description>
              </Card.Content>
              <Card.Content>
                <CardMeta
                  valuation={valuation}
                  progress={progress}
                  isFinancing={isFinancing}
                />
              </Card.Content>
            </Card>
          )
        )}
    </Card.Group>
  );
}

const CardMeta = ({ valuation, progress, isFinancing }) => {
  if (isFinancing) {
    return (
      <Card.Meta style={{ color: "black" }}>
        <Header>{valuation} ETH</Header>
        {progress}% funded
      </Card.Meta>
    );
  } else {
    return (
      <Card.Meta style={{ color: "black" }}>
        <Header>Funded</Header>
      </Card.Meta>
    );
  }
};

const Countdown = ({ isFinancing, daysLeft }) => {
  return (
    <>
      {isFinancing && (
        <Button size="mini" color="green" floated="right">
          {daysLeft} Days Left
        </Button>
      )}
    </>
  );
};

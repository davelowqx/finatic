import React, { useEffect } from "react";
import { Header, Button, Icon, Card, Item } from "semantic-ui-react";
import { getFundingRoundDetails } from "./Getters";

export default function CompanyCards({ companySummaries = [], gridView }) {
  if (gridView) {
    return (
      <Card.Group itemsPerRow={3}>
        {companySummaries
          .slice()
          .reverse()
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
                key={address}
                href={`/companies/${address}`}
                fluid
                color={isFinancing ? "green" : "red"}
              >
                <Card.Content
                  className="companycard"
                  header={name}
                  textAlign="center"
                />
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
                <Card.Content extra>
                  <Button color="red" floated="right">
                    VIEW
                  </Button>
                </Card.Content>
              </Card>
            )
          )}
      </Card.Group>
    );
  } else {
    return (
      <Item.Group divided link unstackable>
        {companySummaries
          .slice()
          .reverse()
          .map(({ address, name, valuation, description, isFinancing }) => (
            <Item
              key={address}
              href={`/companies/${address}`}
              image="https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
              header={name}
              meta={`${valuation}`}
              description={`${description.substring(0, 100)}...`}
              extra={isFinancing ? `${50}% COMPLETE` : "FUNDED"}
              fluid
            />
          ))}
      </Item.Group>
    );
  }
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
  if (isFinancing) {
    return (
      <Button size="mini" color="green" floated="right">
        {daysLeft} Days Left
      </Button>
    );
  } else {
    return <></>;
  }
};

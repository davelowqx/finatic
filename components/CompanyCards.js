import React from "react";
import { Card, Item } from "semantic-ui-react";

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
              sharesOutstanding,
              isFinancing,
              description,
            }) => (
              <Card
                key={address}
                href={`/companies/${address}`}
                image="https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
                header={name}
                meta={`${sharesOutstanding}`}
                description={`${description.substring(0, 100)}...`}
                extra={isFinancing ? `${50}% COMPLETE` : "FUNDED"}
                fluid
                color={isFinancing ? "green" : "red"}
              />
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
          .map(
            ({
              address,
              name,
              sharesOutstanding,
              description,
              isFinancing,
            }) => (
              <Item
                key={address}
                href={`/companies/${address}`}
                image="https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
                header={name}
                meta={`${sharesOutstanding}`}
                description={`${description.substring(0, 100)}...`}
                extra={isFinancing ? `${50}% COMPLETE` : "FUNDED"}
                fluid
              />
            )
          )}
      </Item.Group>
    );
  }
}

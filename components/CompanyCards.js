import React from "react";
import { Card, Item } from "semantic-ui-react";

export default function CompanyCards({ companySummaries, gridView }) {
  if (gridView) {
    return (
      <Card.Group itemsPerRow={3}>
        {companySummaries
          .slice()
          .reverse()
          .map(
            ({ address, name, sharesOutstanding, isFinancing, highlights }) => (
              <Card
                key={address}
                href={`/companies/${address}`}
                image="https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
                header={name}
                meta={`${sharesOutstanding}`}
                description={"- " + highlights}
                extra={
                  isFinancing
                    ? `RAISED ${100} FROM ${100} INVESTORS `
                    : "FUNDED"
                }
                fluid={true}
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
          .map(({ address, name, sharesOutstanding, highlights }) => (
            <Item
              key={address}
              href={`/companies/${address}`}
              image="https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
              header={name}
              meta={`${sharesOutstanding}`}
              description={highlights}
              fluid={true}
            />
          ))}
      </Item.Group>
    );
  }
}

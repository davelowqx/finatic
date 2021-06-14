import React from "react";
import { Card } from "semantic-ui-react";

export default function CompanyCards({ companySummaries }) {
  return (
    <Card.Group itemsPerRow={3}>
      {companySummaries
        .slice()
        .reverse()
        .map(({ address, name, sharesOutstanding, isFinancing }) => (
          <Card
            href={`/companies/${address}`}
            image="https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
            header={name}
            meta={`${sharesOutstanding}`}
            description="Add company description here"
            extra={isFinancing ? "OPEN" : "FUNDED"}
            fluid={true}
            color={isFinancing ? "green" : "red"}
          />
        ))}
    </Card.Group>
  );
}

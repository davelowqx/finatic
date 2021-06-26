import React, { useEffect } from "react";
import { Header, Button, Icon, Card, Item } from "semantic-ui-react";
import { getFundingRoundDetails } from "./Getters";

export default function CompanyCards({
  companySummaries = [],
  gridView,
  // getFundingRoundDetails,
}) {
  // const [fundingRoundDetails, setFundingRoundDetails] = React.useState({});

  // useEffect(async () => {
  //   setFundingRoundDetails(await getFundingRoundDetails({ address }));
  // }, []);

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
              progress,
              description,
            }) => (
              <Card
                key={address}
                href={`/companies/${address}`}
                fluid
                color={isFinancing ? "green" : "red"}
                // extra={
                //   isFinancing
                //     ? roundToTwo(`${progress}`) + "% FUNDED"
                //     : "FUNDED"
                // }
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
                  <Button size="mini" color="green" floated="right">
                    COUNTDOWN
                  </Button>
                </Card.Content>
                <Card.Content>
                  <Card.Description style={{ color: "black" }}>
                    {`${description.substring(0, 120)}...`}
                    {/* {`${valuation}`} */}
                  </Card.Description>
                </Card.Content>
                <Card.Content>
                  <Card.Meta style={{ color: "black" }}>
                    {/* {`${valuation}`} */}
                    <Header>[Amount Raised]</Header>
                    [Percentage] raised of [Goal]
                  </Card.Meta>
                </Card.Content>
                <Card.Content extra>
                  <Button color="red" floated="right">
                    VIEW
                  </Button>
                  Minimum Investment <br />
                  [input number here]
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

function roundToTwo(num) {
  return +(Math.round(num + "e+2") + "e-2");
}

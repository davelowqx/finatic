import React from "react";
import { Card } from "semantic-ui-react";

export default function ProfileTransactions({ profileAddress }) {
  const [investmentDetails, setinvestmentDetails] = React.useState([]);

  React.useEffect(() => {
    fetch(
      `${
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : "https://fundsme.vercel.app"
      }/api/profile/${profileAddress}`
    )
      .then((res) => res.json())
      .then((deets) => {
        console.log(deets);
        setinvestmentDetails(deets);
      });
  }, [profileAddress]);

  return (
    <Card.Group>
      {investmentDetails
        .filter(({ numberOfShares }) => numberOfShares > 0)
        .map(({ companyAddress, name, symbol, numberOfShares }) => {
          return (
            <Card
              className="portfolio-card"
              key={companyAddress}
              href={`/companies/${companyAddress}`}
            >
              <Card.Content textAlign={"center"}>
                <Card.Header>{name}</Card.Header>
                <div>{symbol}</div>
                <div>{numberOfShares}</div>
              </Card.Content>
            </Card>
          );
        })}
    </Card.Group>
  );
}

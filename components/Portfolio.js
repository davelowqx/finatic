import React from "react";
import { Card } from "semantic-ui-react";

export default function ProfileTransactions({ profileAddress }) {
  const [investmentDetails, setinvestmentDetails] = React.useState({
    companyAddress: "",
    name: "",
    symbol: "",
    numberOfShares: "",
  });

  React.useEffect(async () => {
    const investmentDetails = await fetch(
      `${
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : "https://fundsme.vercel.app"
      }/api/profile/${profileAddress}`
    )
      .then((res) => res.json())
      .then((deets) => setinvestmentDetails(deets.error ? [] : deets));

    // setinvestmentDetails({
    //   ...investmentDetails,
    //   companyAddress,
    //   name,
    //   symbol,
    //   numberOfShares,
    // });
  }, []);

  const { companyAddress, name, symbol, numberOfShares } = investmentDetails;

  // console.log(investmentDetails);

  return (
    <Card.Group>
      {investmentDetails
        // .filter(({ numberOfShares }) =>
        //   numberOfShares > 0 ? isFinancing : !isFinancing
        // )
        .map(({ companyAddress, name, symbol, numberOfShares }) => {
          return (
            <Card
              className="portfolio-card"
              key={companyAddress}
              href={`/companies/${companyAddress}`}
            >
              <Card.Content textAlign={"center"}>
                <Card.Header>{name}</Card.Header>
                <div className="portfolio-card-symbol">{symbol}</div>
                <div className="portfolio-card-shares">{numberOfShares}</div>
              </Card.Content>
            </Card>
          );
        })}
    </Card.Group>
  );
}

import React from "react";
import { Card } from "semantic-ui-react";
import { AccountContext } from "./context/AccountContext";

export default function ProfileTransactions({ profileAddress }) {
  // const [investmentDetails, setinvestmentDetails] = React.useState({
  //   address,
  //   name: "",
  //   symbol: "",
  //   companyValuation: "",
  // });

  // React.useEffect(async () => {
  //   const investmentDetails = await fetch(
  //     `${
  //       process.env.NODE_ENV === "development"
  //         ? "http://localhost:3000"
  //         : "https://fundsme.vercel.app"
  //     }/api/profile/${profileAddress}`
  //   ).then((res) => res.json());

  //   setinvestmentDetails({
  //     ...investmentDetails,
  //     companyAddress,
  //     companyName,
  //     companySymbol,
  //     companyValuation,
  //   });
  // }, []); // refresh data when investing/managing

  // console.log(investmentDetails);

  return (
    <Card.Group>
      {/* {checkInvestments(account).then(({ name, symbol, addr, balance }) => (
        <Card key={addr} fluid header={name} content={balance} meta={symbol} />
      ))} */}
    </Card.Group>
  );
}

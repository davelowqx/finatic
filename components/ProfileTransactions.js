import React from "react";
import { Feed } from "semantic-ui-react";

export default function ProfileTransactions({ account }) {
  return (
    <Card.Group>
      {/* {checkInvestments(account).then(({ name, symbol, addr, balance }) => (
        <Card key={addr} fluid header={name} content={balance} meta={symbol} />
      ))} */}
    </Card.Group>
  );
}

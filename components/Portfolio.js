import React from "react";
import { Table } from "semantic-ui-react";

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
        setinvestmentDetails(deets);
      });
  }, [profileAddress]);

  return (
    <Table celled selectable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Symbol</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Shares</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {investmentDetails
          .filter(({ numberOfShares }) => numberOfShares > 0)
          .map(({ companyAddress, name, symbol, numberOfShares }) => {
            return (
              <Table.Row key={companyAddress}>
                <Table.Cell>
                  <a href={`/companies/${companyAddress}`}>{name}</a>
                </Table.Cell>
                <Table.Cell>{symbol}</Table.Cell>
                <Table.Cell>{numberOfShares}</Table.Cell>
              </Table.Row>
            );
          })}
      </Table.Body>
    </Table>
  );
}

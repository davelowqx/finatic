import React from "react";
import Layout from "../../../components/Layout";
import { Button, Table } from "semantic-ui-react";
import { Link } from "../../../routes";
import Campaign from "../../../ethereum/campaigns";
import RequestRow from "../../../components/RequestRow";

export async function getServerSideProps(context) {
  const address = context.query.address;
  const campaign = Campaign(address);
  const requestsCount = await campaign.methods.requestsCount().call();
  const investorsCount = await campaign.methods.investorsCount().call();

  const requests = [];
  Promise.all(
    [...Array(requestsCount).keys()].map((i) => {
      campaign.methods
        .getRequest(i)
        .call()
        .then((r) => {
          requests[i] = {
            description: r[0],
            value: r[1],
            recipient: r[2],
            isComplete: r[3],
            approvalsCount: r[4],
          };
        });
    })
  );
  return { props: { address, requests, investorsCount } };
}

export default function RequestIndex({ address, requests, investorsCount }) {
  console.log(requests);
  const renderRows = () => {
    return requests.map((r, index) => {
      console.log(r);
      return (
        <RequestRow
          key={index}
          id={index + 1}
          request={r}
          address={address}
          investorsCount={investorsCount}
        />
      );
    });
  };

  const { Header, Row, HeaderCell, Body } = Table;

  return (
    <Layout>
      <h3>Requests</h3>
      <Link route={`/campaigns/${address}/requests/new`}>
        <a>
          <Button primary floated="right" style={{ marginBottom: 10 }}>
            Add Requests
          </Button>
        </a>
      </Link>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval Count</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>{renderRows()}</Body>
      </Table>
      <div>Found {requests.length} requests</div>
    </Layout>
  );
}

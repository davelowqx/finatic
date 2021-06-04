import React from "react";
import Layout from "../../../components/Layout";
import { Button, Table } from "semantic-ui-react";
import Link from "next/link";
import Campaign from "../../../ethereum/campaigns";
import RequestRow from "../../../components/RequestRow";

export async function getServerSideProps(context) {
  const address = context.query.address;
  const temp = JSON.parse(JSON.stringify(context.resolvedUrl));
  const campaign = Campaign(address);
  const investorsCount = await campaign.methods.investorsCount().call();
  const requestsCount = await campaign.methods.requestsCount().call();

  const requests = [];
  for (let i = 0; i < requestsCount; i++) {
    let r = await campaign.methods.getRequest(i).call();
    requests[i] = {
      description: r[0],
      value: r[1],
      recipient: r[2],
      isComplete: r[3],
      approvalsCount: r[4],
    };
  }

  return { props: { address, requests, investorsCount, temp } };
}

export default function RequestIndex({
  address,
  requests,
  investorsCount,
  temp,
}) {
  console.log(temp);
  const renderRows = () => {
    return requests.slice().map((r, index) => {
      // reverse this?
      console.log(r);
      return (
        <RequestRow
          key={index}
          id={index}
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
      <Link href={`/campaigns/${address}`}>
        <a>Back</a>
      </Link>
      <h3>Requests</h3>
      <Link href={`/campaigns/${address}/requests/new`}>
        <a>
          <Button primary floated="right" style={{ marginBottom: 10 }}>
            Add Requests
          </Button>
        </a>
      </Link>
      <Table>
        <Header>
          <Row>
            <HeaderCell>#</HeaderCell>
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

import React from "react";
import { Table, Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaigns";

export default function RequestRow(props) {
  const campaign = Campaign(props.address);

  const onApprove = async () => {
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.approveRequest(props.id).send({
      from: accounts[0],
    });
  };

  const onFinalize = async () => {
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.finalizeRequest(props.id).send({
      from: accounts[0],
    });
  };

  const { Row, Cell } = Table;
  const { id, request, investorsCount } = props;
  const readyToFinalize = request.approvalsCount > investorsCount / 2;

  return (
    <Row
      disabled={request.isComplete}
      positive={readyToFinalize && !request.isComplete}
    >
      <Cell>{id}</Cell>
      <Cell>{request.description}</Cell>
      <Cell>{web3.utils.fromWei(request.value.toString(), "ether")}</Cell>
      <Cell>{request.recipient}</Cell>
      <Cell>
        {request.approvalsCount}/{investorsCount}
      </Cell>
      <Cell>
        <Button
          color="green"
          basic
          onClick={onApprove}
          disabled={request.isComplete}
        >
          Approve
        </Button>
      </Cell>
      <Cell>
        <Button
          color="red"
          basic
          onClick={onFinalize}
          disabled={request.isComplete}
        >
          Finalize
        </Button>
      </Cell>
    </Row>
  );
}

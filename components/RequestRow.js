import React from "react";
import { Table, Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaigns";
import { useRouter } from "next/router";

export default function RequestRow({ id, request, address, investorsCount }) {
  const router = useRouter();
  const campaign = Campaign(address);
  let accounts = [];
  (async () => {
    accounts = await web3.eth.getAccounts();
  })();

  const onApprove = async () => {
    try {
      await campaign.methods.approveRequest(id).send({
        from: accounts[0],
      });
    } catch (err) {
      console.log(err);
    }
    router.reload();
  };

  const onFinalize = async () => {
    try {
      await campaign.methods.finalizeRequest(id).send({
        from: accounts[0],
      });
    } catch (err) {
      console.log(err);
    }
    router.reload();
  };

  const { Row, Cell } = Table;
  const readyToFinalize = request.approvalsCount > investorsCount / 2;

  return (
    <Row
      disabled={request.isComplete}
      positive={readyToFinalize && !request.isComplete}
    >
      <Cell>{id + 1}</Cell>
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

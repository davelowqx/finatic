import React from "react";
import { Header, Form, Input, Message, Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import { concludeFundingRound, createFundingRound } from "./Setters";

export default function ManagerForm({ address, isFinancing }) {
  const [fields, setFields] = React.useState({
    targetAmount: "",
    sharesOffered: "",
  });

  const [states, setStates] = React.useState({
    errorMessage: "",
    loading: false,
  });

  const router = useRouter();

  const handleCreate = async (event) => {
    event.preventDefault();
    setStates({ loading: true, errorMessage: "" });
    try {
      await createFundingRound({
        address,
        targetAmount: fields.targetAmount,
        sharesOffered: fields.sharesOffered,
      });
      //router.reload();
    } catch (err) {
      console.log(err);
      setStates({ loading: false, errorMessage: err.message });
      setFields({ targetAmount: "", sharesOffered: "" });
    }
  };

  const handleConclude = async (event) => {
    event.preventDefault();
    setStates({ loading: true, errorMessage: "" });
    try {
      await concludeFundingRound({ address });
      //router.reload();
    } catch (err) {
      console.log(err);
      setStates({ loading: false, errorMessage: err.message });
    }
  };

  return (
    <div className="companies-container cardborder">
      <Header as="h3">Raise Funds</Header>
      <Form size="big" onSubmit={handleCreate} error={!!fields.errorMessage}>
        <Form.Field>
          <label>Target Amount</label>
          <Input
            value={fields.targetAmount}
            onChange={(event) =>
              setFields({ ...fields, targetAmount: event.target.value })
            }
            label="ETH"
            labelPosition="right"
          />
        </Form.Field>
        <Form.Field>
          <label>Shares Offered</label>
          <Input
            value={fields.sharesOffered}
            onChange={(event) =>
              setFields({ ...fields, sharesOffered: event.target.value })
            }
          />
        </Form.Field>

        <Message error header="Oops!" content={fields.errorMessage} />
        <div className="companies-manager-button">
          <Button
            color="red"
            fluid
            disabled={isFinancing}
            loading={fields.loading}
            content="RAISE FUND"
          />
        </div>
        <div className="companies-manager-button">
          <Button
            fluid
            color="green"
            disabled={!isFinancing}
            loading={fields.loading}
            onClick={handleConclude}
            content="CLOSE ROUND"
          />
        </div>
      </Form>
    </div>
  );
}

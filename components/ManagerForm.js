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

  const handleClick = async (event) => {
    event.preventDefault();
    setStates({ loading: true, errorMessage: "" });
    if (isFinancing) {
      try {
        await concludeFundingRound({ address });
        router.reload();
      } catch (err) {
        console.log(err);
        setStates({ loading: false, errorMessage: err.message });
      }
    } else {
      try {
        await createFundingRound({
          address,
          targetAmount: fields.targetAmount,
          sharesOffered: fields.sharesOffered,
        });
        router.reload();
      } catch (err) {
        console.log(err);
        setStates({ loading: false, errorMessage: err.message });
        setFields({ targetAmount: "", sharesOffered: "" });
      }
    }
  };

  return (
    <div className="companies-container cardborder">
      {!isFinancing && (
        <Form error={!!fields.errorMessage}>
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
        </Form>
      )}
      <br />
      <Button
        fluid
        color={!isFinancing ? "green" : "red"}
        loading={states.loading}
        disabled={states.loading}
        onClick={handleClick}
        content={isFinancing ? "CLOSE ROUND" : "RAISE FUNDS"}
      />
    </div>
  );
}

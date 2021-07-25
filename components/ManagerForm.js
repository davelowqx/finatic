import React from "react";
import { Divider, Form, Input, Message, Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import {
  concludeFundingRound,
  createFundingRound,
  withdraw,
  payoutDividends,
} from "./Setters";

export default function ManagerForm({ address, isFinancing, manager }) {
  const [fields, setFields] = React.useState({
    targetAmount: "",
    sharesOffered: "",
    withdrawAmount: "",
    dividendAmount: "",
  });

  const [states, setStates] = React.useState({
    errorMessage: "",
    loading: false,
  });

  const router = useRouter();

  const handleConclude = async (event) => {
    event.preventDefault();
    setStates({ loading: true, errorMessage: "" });
    if (isFinancing) {
      try {
        await concludeFundingRound({ address });
        // router.reload();
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
        // router.reload();
      } catch (err) {
        console.log(err);
        setStates({ loading: false, errorMessage: err.message });
      } finally {
        setFields({ ...fields, targetAmount: "", sharesOffered: "" });
      }
    }
  };

  const handleWithdraw = async (event) => {
    const withdrawAmount = fields.withdrawAmount;

    event.preventDefault();
    setStates({ loading: true, errorMessage: "" });
    try {
      await withdraw({ withdrawAmount, address, manager });
      // router.reload();
    } catch (err) {
      console.log(err);
      setStates({ loading: false, errorMessage: err.message });
    } finally {
      setFields({ ...fields, withdrawAmount: "" });
    }
  };

  const handleDividends = async (event) => {
    const dividendAmount = fields.dividendAmount;

    event.preventDefault();
    setStates({ loading: true, errorMessage: "" });
    try {
      await payoutDividends({ dividendAmount, address });
      // router.reload();
    } catch (err) {
      console.log(err);
      setStates({ loading: false, errorMessage: err.message });
    } finally {
      setFields({ ...fields, dividendAmount: "" });
    }
  };

  return (
    <div className="companies-container cardborder">
      {!isFinancing && (
        <Form error={!!fields.errorMessage}>
          <Form.Field>
            <label>Target Amount</label>
            <Input
              type="number"
              min={0}
              step={1}
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
              type="number"
              step={1}
              min={0}
              value={fields.sharesOffered}
              onInput={(event) => {}}
              onChange={(event) =>
                setFields({
                  ...fields,
                  sharesOffered: event.target.value,
                })
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
        onClick={handleConclude}
        content={isFinancing ? "CLOSE ROUND" : "RAISE FUNDS"}
      />
      <br />
      {!isFinancing && (
        <>
          <Divider />
          <br />
          <Form error={!!fields.errorMessage}>
            <Form.Field>
              <label>Withdrawal Amount</label>
              <Input
                type="number"
                step={0.1}
                min={0}
                value={fields.withdrawAmount}
                onInput={(event) => {}}
                onChange={(event) =>
                  setFields({
                    ...fields,
                    withdrawAmount: event.target.value,
                  })
                }
                label="ETH"
                labelPosition="right"
              />
            </Form.Field>
            <Message error header="Oops!" content={fields.errorMessage} />
          </Form>
          <br />
          <Button
            fluid
            primary
            loading={states.loading}
            disabled={states.loading}
            onClick={handleWithdraw}
            content="WITHDRAW"
          />
          <br />
          <Divider />
          <br />
          <Form error={!!fields.errorMessage}>
            <Form.Field>
              <label>Payout Dividends (per shareholder)</label>
              <Input
                type="number"
                step={0.1}
                min={0}
                value={fields.dividendAmount}
                onInput={(event) => {}}
                onChange={(event) =>
                  setFields({
                    ...fields,
                    dividendAmount: event.target.value,
                  })
                }
                label="ETH"
                labelPosition="right"
              />
            </Form.Field>
            <Message error header="Oops!" content={fields.errorMessage} />
          </Form>
          <br />
          <Button
            fluid
            color="red"
            loading={states.loading}
            disabled={states.loading}
            onClick={handleDividends}
            content="PAYOUT DIVIDENDS"
          />
        </>
      )}
    </div>
  );
}

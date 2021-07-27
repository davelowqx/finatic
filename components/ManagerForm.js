import React from "react";
import { Divider, Form, Input, Message, Button } from "semantic-ui-react";
import {
  concludeFundingRound,
  createFundingRound,
  withdraw,
  payoutDividends,
} from "./Setters";

export default function ManagerForm({
  companyAddress,
  isFinancing,
  managerAddress,
  balance,
  toggleRefreshData,
}) {
  const [fields, setFields] = React.useState({
    targetAmount: "",
    sharesOffered: "",
    withdrawAmount: "",
    dividendAmount: "",
  });

  const [states, setStates] = React.useState({
    errorMessage: "",
    loadingManageFundingRound: false,
    loadingWithdraw: false,
    loadingPayoutDividends: false,
  });

  const handleManageFundingRound = async (event) => {
    event.preventDefault();
    setStates({ ...states, loadingManageFundingRound: true, errorMessage: "" });
    if (isFinancing) {
      try {
        await concludeFundingRound({ companyAddress });
      } catch (err) {
        console.log(err);
        setStates({ ...states, errorMessage: err.message });
      } finally {
        setStates({ ...states, loadingManageFundingRound: false });
        toggleRefreshData();
      }
    } else {
      try {
        await createFundingRound({
          companyAddress,
          targetAmount: fields.targetAmount,
          sharesOffered: fields.sharesOffered,
        });
      } catch (err) {
        console.log(err);
        setStates({ ...states, errorMessage: err.message });
      } finally {
        setStates({ ...states, loadingManageFundingRound: false });
        setFields({ ...fields, targetAmount: "", sharesOffered: "" });
        toggleRefreshData();
      }
    }
  };

  const handleWithdraw = async (event) => {
    const withdrawAmount = fields.withdrawAmount;

    event.preventDefault();
    setStates({ ...states, loadingWithdraw: true, errorMessage: "" });
    try {
      await withdraw({ withdrawAmount, companyAddress, managerAddress });
    } catch (err) {
      console.log(err);
      setStates({ ...states, errorMessage: err.message });
    } finally {
      setStates({ ...states, loadingWithdraw: false });
      setFields({ ...fields, withdrawAmount: "" });
      toggleRefreshData();
    }
  };

  const handlePayoutDividends = async (event) => {
    const dividendAmount = fields.dividendAmount;

    event.preventDefault();
    setStates({ ...states, loadingPayoutDividends: true, errorMessage: "" });
    try {
      await payoutDividends({ dividendAmount, companyAddress });
    } catch (err) {
      console.log(err);
      setStates({ ...states, errorMessage: err.message });
    } finally {
      setStates({ ...states, loadingPayoutDividends: false });
      setFields({ ...fields, dividendAmount: "" });
      toggleRefreshData();
    }
  };

  return (
    <div className="companies-container cardborder">
      <h2>Manager Actions</h2>
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
        loading={states.loadingManageFundingRound}
        disabled={
          states.loadingManageFundingRound ||
          states.loadingPayoutDividends ||
          states.loadingWithdraw
        }
        onClick={handleManageFundingRound}
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
                max={balance}
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
            loading={states.loadingWithdraw}
            disabled={
              states.loadingManageFundingRound ||
              states.loadingPayoutDividends ||
              states.loadingWithdraw
            }
            onClick={handleWithdraw}
            content="WITHDRAW"
          />
          <br />
          <Divider />
          <br />
          <Form error={!!fields.errorMessage}>
            <Form.Field>
              <label>Payout Dividends (Total)</label>
              <Input
                type="number"
                step={0.1}
                min={0}
                max={balance}
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
            loading={states.loadingPayoutDividends}
            disabled={
              states.loadingManageFundingRound ||
              states.loadingPayoutDividends ||
              states.loadingWithdraw
            }
            onClick={handlePayoutDividends}
            content="PAYOUT DIVIDENDS"
          />
        </>
      )}
    </div>
  );
}

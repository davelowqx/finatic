import React from "react";
import { Divider, Form, Input, Message, Button } from "semantic-ui-react";
import {
  concludeFundingRound,
  createFundingRound,
  withdraw,
  payoutDividends,
} from "./Setters";
import { ModalContext } from "./context/ModalContext";

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
    loadingManageFundingRound: false,
    loadingWithdraw: false,
    loadingPayoutDividends: false,
  });

  const popup = React.useContext(ModalContext);

  const handleManageFundingRound = async (event) => {
    event.preventDefault();
    setStates({ ...states, loadingManageFundingRound: true });
    if (isFinancing) {
      try {
        await concludeFundingRound({ companyAddress });
      } catch (err) {
        if (err.code === 32000 || err.code === 32603) {
          popup("Please reset your MetaMask account");
        } else {
          popup(err.message);
        }
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
        if (err.code === 32000 || err.code === 32603) {
          popup("Please reset your MetaMask account");
        } else {
          popup(err.message);
        }
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
    setStates({ ...states, loadingWithdraw: true });
    try {
      await withdraw({ withdrawAmount, companyAddress, managerAddress });
    } catch (err) {
      if (err.code === 32000 || err.code === 32603) {
        popup("Please reset your MetaMask account");
      } else {
        popup(err.message);
      }
    } finally {
      setStates({ ...states, loadingWithdraw: false });
      setFields({ ...fields, withdrawAmount: "" });
      toggleRefreshData();
    }
  };

  const handlePayoutDividends = async (event) => {
    const dividendAmount = fields.dividendAmount;

    event.preventDefault();
    setStates({ ...states, loadingPayoutDividends: true });
    try {
      await payoutDividends({ dividendAmount, companyAddress });
    } catch (err) {
      if (err.code === 32000 || err.code === 32603) {
        popup("Please reset your MetaMask account");
      } else {
        popup(err.message);
      }
    } finally {
      setStates({ ...states, loadingPayoutDividends: false });
      setFields({ ...fields, dividendAmount: "" });
      toggleRefreshData();
    }
  };

  return (
    <div className="companies-container cardborder">
      <h2>Manager Actions</h2>
      <Divider />
      {!isFinancing && (
        <Form>
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
          <Form>
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
          <Form>
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

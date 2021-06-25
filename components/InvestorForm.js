import React from "react";
import { Form, Input, Message, Button, Progress } from "semantic-ui-react";
import { useRouter } from "next/router";
import web3 from "../ethereum/web3";
import { Company } from "../ethereum/contracts";
import { db } from "../firebase";
import { invest } from "./Setters";

export default function InvestorForm({
  address,
  isFinancing,
  fundingRoundDetails,
}) {
  const [values, setValues] = React.useState({
    amount: "",
    errorMessage: "",
    loading: false,
  });

  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();
    setValues({ ...values, loading: true, errorMessage: "" });
    try {
      await invest({ address, amount: values.amount });
    } catch (err) {
      setValues({ ...values, errorMessage: err.message });
    }

    // reset state back to normal
    setValues({ ...values, loading: false, amount: "" });
    router.reload();
  };

  return (
    <>
      <Form onSubmit={onSubmit} error={!!values.errorMessage}>
        <Form.Field>
          <label>Amount to Invest</label>
          <Input
            value={values.amount}
            onChange={(event) =>
              setValues({ ...values, amount: event.target.value })
            }
            label="ETH"
            labelPosition="right"
          />
        </Form.Field>

        <Message error header="Oops!" content={values.errorMessage} />
        <Button primary disabled={!isFinancing} loading={values.loading}>
          Invest!
        </Button>
      </Form>
      <FundingRoundDetails
        isFinancing={isFinancing}
        fundingRoundDetails={fundingRoundDetails}
      />
    </>
  );
}

function FundingRoundDetails({ isFinancing, fundingRoundDetails }) {
  const {
    currentAmount,
    targetAmount,
    sharesOffered,
    sharePrice,
    daysLeft,
    investorsCount,
  } = fundingRoundDetails;
  if (isFinancing) {
    const percent = Math.round((100 * currentAmount) / targetAmount);
    return (
      <>
        <div>Minimum {sharePrice} ETH</div>
        <h3>
          {currentAmount} ETH of {targetAmount} ETH raised
        </h3>
        <div>{percent}%</div>
        <Progress percent={percent} indicating />
        <div>Shares Offered {sharesOffered}</div>
        <div>Days Left {daysLeft}</div>
        <div>{investorsCount} Investors</div>
      </>
    );
  } else {
    return <div></div>;
  }
}

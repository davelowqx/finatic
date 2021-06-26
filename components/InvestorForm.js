import React from "react";
import {
  Header,
  Form,
  Input,
  Message,
  Button,
  Progress,
  Grid,
  Divider,
} from "semantic-ui-react";
import { useRouter } from "next/router";
import web3 from "../ethereum/web3";
import { Company } from "../ethereum/contracts";
import { db } from "../firebase";
import { invest } from "./Setters";
import ConnectWallet from "./ConnectWallet";

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
    <div className="companies-container cardborder">
      <Grid>
        <Grid.Row>
          <Grid.Column width={9}>
            <Header as="h3">Latest Funding Details</Header>
            <br />
            <Form
              size="medium"
              onSubmit={onSubmit}
              error={!!values.errorMessage}
            >
              <FundingRoundDetailsCopy
                isFinancing={isFinancing}
                fundingRoundDetailsCopy={fundingRoundDetails}
              />
              <br />
              <Form.Field>
                <label style={{ fontSize: "1.28571429rem" }}>Invest</label>
                <Input
                  style={{ width: "70%" }}
                  value={values.amount}
                  onChange={(event) =>
                    setValues({ ...values, amount: event.target.value })
                  }
                  label="ETH"
                  labelPosition="right"
                />
                <FundingRoundDetailsCopyTwo
                  isFinancing={isFinancing}
                  FundingRoundDetailsCopyTwo={fundingRoundDetails}
                />
              </Form.Field>
              <br />
              <Message error header="Oops!" content={values.errorMessage} />
              <Button
                fluid
                size="medium"
                primary
                disabled={!isFinancing}
                loading={values.loading}
              >
                Invest!
              </Button>
              <br />
              <ConnectWallet />
            </Form>
          </Grid.Column>
          <Grid.Column width={7}>
            <FundingRoundDetails
              isFinancing={isFinancing}
              fundingRoundDetails={fundingRoundDetails}
            />
          </Grid.Column>
        </Grid.Row>
        {/* <Grid.Row>
          <Grid.Column width={16}></Grid.Column>
        </Grid.Row> */}
      </Grid>
    </div>
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
      <div style={{ textAlign: "center" }}>
        <div>
          <Header as="h3">Funding Status </Header>
          <div>Active </div>
        </div>
        <Divider clearing />
        <div>
          <Header as="h3">Funding Goal </Header>
          <div>
            <Progress percent={percent} progress indicating />
          </div>
        </div>
        <Divider clearing />
        <div>
          <Header as="h3">Shares Offered</Header>
          <div>{sharesOffered}</div>
        </div>
        <Divider clearing />
        <div>
          <Header as="h3">Days Left </Header>
          <div>{daysLeft}</div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

function FundingRoundDetailsCopy({ isFinancing, fundingRoundDetailsCopy }) {
  const {
    currentAmount,
    targetAmount,
    sharesOffered,
    sharePrice,
    daysLeft,
    investorsCount,
  } = fundingRoundDetailsCopy;
  if (isFinancing) {
    return (
      <div>
        <Header as="h3">{currentAmount} ETH</Header>
        raised from {investorsCount} Investors
      </div>
    );
  } else {
    return <div></div>;
  }
}

function FundingRoundDetailsCopyTwo({
  isFinancing,
  FundingRoundDetailsCopyTwo,
}) {
  const {
    currentAmount,
    targetAmount,
    sharesOffered,
    sharePrice,
    daysLeft,
    investorsCount,
  } = FundingRoundDetailsCopyTwo;
  if (isFinancing) {
    const percent = Math.round((100 * currentAmount) / targetAmount);
    return <div>Minimum {sharePrice} ETH</div>;
  } else {
    return <div></div>;
  }
}

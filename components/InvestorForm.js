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
  Popup,
} from "semantic-ui-react";
import { useRouter } from "next/router";
import { invest } from "./Setters";

export default function InvestorForm({ address, fundingRoundDetails }) {
  const [amount, setAmount] = React.useState(0);
  const [states, setStates] = React.useState({
    errorMessage: "",
    loading: false,
  });

  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();
    if (amount < sharePrice) {
      //show tooltip
    }
    setStates({ loading: true, errorMessage: "" });
    try {
      await invest({ address, amount });
    } catch (err) {
      setStates({ ...states, errorMessage: err.message });
    }

    setStates({ ...states, loading: false });
    setAmount(0);
    //router.reload();
  };

  const {
    currentAmount,
    targetAmount,
    sharesOffered,
    sharePrice,
    daysLeft,
    investorsCount,
  } = fundingRoundDetails;

  const percent = Math.round((100 * currentAmount) / targetAmount);

  return (
    <div className="companies-container cardborder">
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Progress percent={percent} progress indicating />
            <Header as="h3">INVESTMENT TERMS</Header>
            <div className="container100">
              <div className="container50-2">
                <h3>{currentAmount} ETH</h3> of {targetAmount} ETH goal
              </div>
              <div className="container50-2">
                <b>{sharesOffered}</b> Shares Offerred
                <br />
                <b>{investorsCount}</b> Investors
                <br />
                <b>{daysLeft}</b> Days Left
              </div>
            </div>
            <Divider clearing />
            <Form onSubmit={onSubmit} error={!!states.errorMessage}>
              <Form.Field>
                <label style={{ fontSize: "1.28571429rem" }}>Invest</label>
                <span>min {sharePrice} ETH</span>
                <Input
                  type="decimal"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  label="ETH"
                  labelPosition="right"
                />
              </Form.Field>
              <br />
              <Message error header="Oops!" content={states.errorMessage} />
              <Button
                fluid
                primary
                disabled={states.loading}
                loading={states.loading}
              >
                INVEST
              </Button>
              <br />
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

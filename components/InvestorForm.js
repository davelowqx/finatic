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
import { invest } from "./Setters";
import { daysLeft } from "../components/utils";

export default function InvestorForm({
  companyAddress,
  currentValuation,
  postMoneyValuation,
  activeFundingRoundDetails,
}) {
  const [amount, setAmount] = React.useState(0);
  const [states, setStates] = React.useState({
    errorMessage: "",
    loading: false,
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    if (amount < sharePrice) {
      //show tooltip
    }
    setStates({ loading: true, errorMessage: "" });
    try {
      await invest({ companyAddress, amount });
    } catch (err) {
      setStates({ ...states, errorMessage: err.message });
    }

    setStates({ ...states, loading: false });
    setAmount(0);
  };

  const {
    currentAmount,
    targetAmount,
    sharesOffered,
    sharePrice,
    creationTimestamp,
    investorsCount,
  } = activeFundingRoundDetails;

  const percent = Math.round((100 * currentAmount) / targetAmount);

  const days = daysLeft(creationTimestamp);

  return (
    <div className="companies-container cardborder">
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Progress percent={percent} progress indicating />
            <Header as="h3">Investment Details</Header>
            <br />
            <div className="container100">
              <div
                className="container-investorform-1"
                style={{ paddingTop: "11px", paddingBottom: "11px" }}
              >
                <h3>{currentAmount} ETH</h3> of {targetAmount} ETH goal
              </div>
              <div className="container-investorform-2">
                Current Valuation: <b>{currentValuation} ETH</b>
              </div>
              <div className="container-investorform-2">
                Post Valuation: <b>{postMoneyValuation} ETH</b>
              </div>
            </div>
            <div className="container100">
              <div className="container33">
                <b>{sharesOffered}</b> Shares
              </div>
              <div className="container33">
                {investorsCount === "1" && (
                  <div>
                    <b>{investorsCount}</b> Investor
                  </div>
                )}
                {investorsCount != "1" && (
                  <div>
                    <b>{investorsCount}</b> Investors
                  </div>
                )}
              </div>
              <div className="container33">
                <b>{days}</b> Days Left
              </div>
            </div>
            <br />
            <Divider clearing />
            <br />
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

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
  account,
  companyAddress,
  currentValuation,
  activeFundingRoundDetails,
  toggleRefreshData,
}) {
  const [amount, setAmount] = React.useState(0);
  const [states, setStates] = React.useState({
    errorMessage: "",
    loading: false,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (amount < sharePrice) {
      return;
    }
    console.log(`${account}`);
    setStates({ loading: true, errorMessage: "" });
    try {
      await invest({ companyAddress, amount });
    } catch (err) {
      setStates({ ...states, errorMessage: err.message });
    } finally {
      setStates({ ...states, loading: false });
      setAmount(0);
      toggleRefreshData();
    }
  };

  const {
    currentAmount,
    targetAmount,
    sharesOffered,
    sharesOutstanding,
    sharePrice,
    creationTimestamp,
    investorsCount,
  } = activeFundingRoundDetails;

  console.log(activeFundingRoundDetails);

  const percent = Math.round((100 * currentAmount) / targetAmount);

  const days = daysLeft(creationTimestamp);

  return (
    <div className="companies-container cardborder">
      <h2>Investor Actions</h2>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <br />
            <Progress percent={percent} progress indicating />
            <div className="container100">
              <div className="container-investorform-1">
                <h3>{currentAmount} ETH</h3> of {targetAmount} ETH goal
              </div>
              <div className="container-investorform-2">
                Current Valuation:
                <br />
                <b>
                  {currentValuation === "0"
                    ? "UNEVALUATED"
                    : `${currentValuation} ETH`}
                </b>
              </div>
              <div className="container-investorform-2">
                Post Money Valuation: <br />
                <b>{sharePrice * sharesOutstanding} ETH</b>
              </div>
            </div>
            <div className="container100">
              <div className="container33">
                <b>{sharesOffered}</b> Shares
              </div>
              <div className="container33">
                <div>
                  <b>{investorsCount}</b>{" "}
                  {"Investor" + (investorsCount === 1 ? "" : "s")}
                </div>
              </div>
              <div className="container33">
                <b>{days}</b> Days Left
              </div>
            </div>
            <br />
            <Divider clearing />
            <br />
            <Form onSubmit={handleSubmit} error={!!states.errorMessage}>
              <Form.Field>
                <label style={{ fontSize: "1.28571429rem" }}>Invest</label>
                <span>min {sharePrice} ETH</span>
                <Input
                  type="number"
                  step={sharePrice}
                  value={amount}
                  min={sharePrice}
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

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
import { ModalContext } from "./context/ModalContext";

export default function InvestorForm({
  account,
  companyAddress,
  currentValuation,
  activeFundingRoundDetails,
  toggleRefreshData,
}) {
  const popup = React.useContext(ModalContext);
  const [amount, setAmount] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (amount < sharePrice) {
        throw Error("That's too little...");
      }
      console.log(`${account}`);
      if (!account) {
        throw Error("Please connect your account");
      }
      setLoading(true);
      await invest({ companyAddress, amount });
    } catch (err) {
      if (err.code === 32000 || err.code === 32603) {
        popup("Please reset your MetaMask account");
      } else {
        popup(err.message);
      }
    } finally {
      setLoading(false);
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
      <Divider />
      <br />
      <Grid>
        <Grid.Row>
          <Grid.Column>
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
                <b>{sharesOffered}</b>{" "}
                {"Share" + (sharesOffered === 1 ? "" : "s")}
              </div>
              <div className="container33">
                <div>
                  <b>{investorsCount}</b>{" "}
                  {"Investor" + (investorsCount === 1 ? "" : "s")}
                </div>
              </div>
              <div className="container33">
                <b>{days}</b> {"Day" + (days === 1 ? "" : "s")} Left
              </div>
            </div>
            <br />
            <Divider clearing />
            <br />
            <Form onSubmit={handleSubmit}>
              <Form.Field>
                <label>
                  Invest{" "}
                  <span style={{ fontWeight: "normal" }}>
                    min {sharePrice} ETH
                  </span>
                </label>
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
            </Form>
            <br />
            <Button
              fluid
              primary
              disabled={loading}
              loading={loading}
              onClick={handleSubmit}
            >
              INVEST
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

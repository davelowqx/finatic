import React from "react";
import {
  Form,
  Input,
  Button,
  Progress,
  Grid,
  Divider,
} from "semantic-ui-react";
import { invest } from "./Setters";
import { fromWei, daysLeft } from "../components/utils";
import { ModalContext } from "./context/ModalContext";

export default function InvestorForm({
  account,
  campaignAddress,
  balance,
  targetAmount,
  listingTimestamp,
  investorsCount,
  toggleRefreshData,
}) {
  const popup = React.useContext(ModalContext);
  const [amount, setAmount] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!account) {
        throw Error("Please connect your account");
      }
      setLoading(true);
      await invest({ campaignAddress, amount });
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

  const percent = Math.round(
    (100 * parseInt(balance)) / parseInt(targetAmount)
  );

  const days = daysLeft(listingTimestamp);

  return (
    <div className="companies-container cardborder">
      <h3>Invest</h3>
      <br />
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Progress percent={percent} progress indicating />
            <div>
              <h3>{fromWei(balance)} ETH</h3> of {fromWei(targetAmount)} ETH
              goal
            </div>
            <div>
              <b>{investorsCount}</b>{" "}
              {"Investor" + (investorsCount === 1 ? "" : "s")}
            </div>
            <b>{days}</b> {"Day" + (days === 1 ? "" : "s")} Left
            <br />
            <Divider clearing />
            <br />
            <Form onSubmit={handleSubmit}>
              <Form.Field>
                <label>Invest</label>
                <Input
                  type="number"
                  step={1}
                  value={amount}
                  min={0}
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

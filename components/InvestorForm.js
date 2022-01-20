import React from "react";
import {
  Form,
  Input,
  Button,
  Progress,
  Grid,
  Divider,
} from "semantic-ui-react";
import { invest } from "../ethereum/functions";
import { fromWei, daysLeft } from "../components/utils";
import { ModalContext } from "./context/ModalContext";

export default function InvestorForm({
  account,
  campaignAddress,
  balance,
  targetAmount,
  listingTimestamp,
  status,
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
    <div className="container cardborder">
      <div className="flex">
        <h3 className="grow">Invest</h3>
        {!status && (
          <div className="text-grey">
            {days} {"Day" + (days === 1 ? "" : "s")} Left
          </div>
        )}
      </div>
      <Progress
        percent={percent}
        progress
        indicating
        style={{ margin: "1rem 0" }}
      />
      <div className="flex">
        <div>
          <b>{fromWei(balance)} ETH</b>
        </div>
        &nbsp;|&nbsp;
        <div className="text-grey">{fromWei(targetAmount)} ETH goal</div>
      </div>
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
        disabled={loading || status}
        loading={loading}
        onClick={handleSubmit}
      >
        {status === 0
          ? "INVEST"
          : status === 1
          ? "CAMPAIGN CONCLUDED"
          : "CAMPAIGN FAILED"}
      </Button>
    </div>
  );
}

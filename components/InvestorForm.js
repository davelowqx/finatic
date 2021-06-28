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

  const {
    currentAmount,
    targetAmount,
    sharesOffered,
    sharePrice,
    daysLeft,
    investorsCount,
  } = fundingRoundDetails;

  const percent = Math.round((100 * currentAmount) / targetAmount);

  if (isFinancing) {
    return (
      <div className="companies-container cardborder">
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Progress percent={percent} progress indicating />
              <div>
                <Header as="h3">{currentAmount} ETH</Header>
                of {targetAmount} ETH goal
              </div>
              <br />
              <div>{investorsCount} Investors</div>
              <Divider clearing />
              <div>
                <Header as="h3">INVESTMENT TERMS</Header>
                <div>
                  <b>{sharesOffered}</b> Shares Offerred
                </div>
                <div>
                  <b>{daysLeft}</b> Days Left
                </div>
              </div>
              <br />
              <Form onSubmit={onSubmit} error={!!values.errorMessage}>
                <br />
                <Form.Field>
                  <label style={{ fontSize: "1.28571429rem" }}>Invest</label>
                  <span>min {sharePrice} ETH</span>
                  <Input
                    value={values.amount}
                    onChange={(event) =>
                      setValues({ ...values, amount: event.target.value })
                    }
                    label="ETH"
                    labelPosition="right"
                  />
                </Form.Field>
                <br />
                <Message error header="Oops!" content={values.errorMessage} />
                <Button
                  fluid
                  primary
                  disabled={values.loading}
                  loading={values.loading}
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
  } else {
    return <></>;
  }
}

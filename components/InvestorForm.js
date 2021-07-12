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
import ConnectWalletModal from "../components/ConnectWalletModal";

export default function InvestorForm({
  address,
  isFinancing,
  fundingRoundDetails,
}) {
  const [amount, setAmount] = React.useState(0);
  const [popup, setPopup] = React.useState(false);
  const [states, setStates] = React.useState({
    errorMessage: "",
    loading: false,
  });

  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();
    setPopup(true);
    setStates({ loading: true, errorMessage: "" });
    try {
      await invest({ address, amount });
    } catch (err) {
      setStates({ ...states, errorMessage: err.message });
    }

    // reset state back to normal
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
    <>
      <ConnectWalletModal open={popup} setOpen={setPopup} />
      {isFinancing && (
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
                <Form onSubmit={onSubmit} error={!!states.errorMessage}>
                  <br />
                  <Form.Field>
                    <label style={{ fontSize: "1.28571429rem" }}>Invest</label>
                    <span>min {sharePrice} ETH</span>
                    <Input
                      value={states.amount}
                      onChange={(event) =>
                        setStates({ ...states, amount: event.target.value })
                      }
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
      )}
    </>
  );
}

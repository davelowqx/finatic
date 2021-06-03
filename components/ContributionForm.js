import React from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
// link render anchor tags around react components
import Campaign from "../ethereum/campaigns";
import web3 from "../ethereum/web3";
import { useRouter } from "next/router";

export default function ContributeForm(props) {
  const [values, setValues] = React.useState({
    amount: "",
    errorMessage: "",
    loading: false,
  });

  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();

    const campaign = Campaign(props.address);

    setValues({ ...values, loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.invest().send({
        from: accounts[0],
        // convert ether to wei
        value: web3.utils.toWei(values.amount, "ether"),
      });
    } catch (err) {
      setValues({ ...values, errorMessage: err.message });
    }

    // reset state back to normal
    setValues({ ...values, loading: false, amount: "" });
    router.reload();
  };

  return (
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
      <Button primary loading={values.loading}>
        Invest!
      </Button>
    </Form>
  );
}

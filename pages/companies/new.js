import React from "react";
import { Input, Form, Button, Checkbox, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import campaignFactory from "../../ethereum/campaignFactory";
import web3 from "../../ethereum/web3";
import { useRouter } from "next/router";

export default function CampaignNew() {
  const [values, setValues] = React.useState({
    targetAmount: 0,
    errorMessage: "",
    loading: false,
  });

  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();
    setValues({ ...values, errorMessage: "", loading: true });
    let address = "";
    try {
      const accounts = await web3.eth.getAccounts();
      await campaignFactory.methods.createCampaign(values.targetAmount).send({
        from: accounts[0],
      });
    } catch (err) {
      setValues({ ...values, errorMessage: err.message });
    }
    setValues({ ...values, loading: false });
    console.log(address);
    router.push(`/${address}`); //TODO: push to address of new campaign
  };

  return (
    <Layout>
      <h1>Create a Campaign!!</h1>
      <Form onSubmit={onSubmit} error={!!values.errorMessage}>
        <Form.Field>
          <label>Target Amount</label>
          <Input
            label="ETH"
            labelPosition="right"
            type="text"
            placeholder="Amount"
            value={values.targetAmount}
            onChange={(event) =>
              setValues({ ...values, targetAmount: event.target.value })
            }
          />
        </Form.Field>
        <Form.Field>
          <Checkbox label="I agree to the Terms and Conditions" />
        </Form.Field>
        <Message error header="Oops!" content={values.errorMessage} />
        <Button loading={values.loading} primary>
          Create
        </Button>
      </Form>
    </Layout>
  );
}

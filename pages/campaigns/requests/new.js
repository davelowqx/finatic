import React from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import Campaign from "../../../ethereum/campaigns";
import web3 from "../../../ethereum/web3";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout";

export async function getServerSideProps(context) {
  return { props: { address: context.query.address } };
}

export default function RequestNew({ address }) {
  const [values, setValues] = React.useState({
    amount: "",
    description: "",
    recipient: "",
    loading: false,
    errorMessage: "",
  });

  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();

    const campaign = Campaign(address);
    setValues({ ...values, loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(
          values.description,
          web3.utils.toWei(values.amount.toString(), "ether"),
          values.recipient
        )
        .send({ from: accounts[0] });
    } catch (err) {
      console.log(err);
      setValues({ ...values, errorMessage: err.message });
    }
    // reset state back to normal
    setValues({ ...values, loading: false });
    router.push(`/campaigns/${address}/requests`);
  };

  return (
    <Layout>
      <Link href={`/campaigns/${address}/requests`}>
        <a>Back</a>
      </Link>
      <h3>Create a Request</h3>
      <Form onSubmit={onSubmit} error={!!values.errorMessage}>
        <Form.Field>
          <label>Description</label>
          <Input
            value={values.description}
            onChange={(event) => setValues({ description: event.target.value })}
          />
        </Form.Field>
        <Form.Field>
          <label>Value in Ether</label>
          <Input
            value={values.amount}
            onChange={(event) =>
              setValues({ ...values, amount: event.target.value })
            }
          />
        </Form.Field>
        <Form.Field>
          <label>Recipient</label>
          <Input
            value={values.recipient}
            onChange={(event) =>
              setValues({ ...values, recipient: event.target.value })
            }
          />
        </Form.Field>

        <Message error header="Oops!" content={values.errorMessage} />
        <Button primary loading={values.loading}>
          Create!
        </Button>
      </Form>
    </Layout>
  );
}

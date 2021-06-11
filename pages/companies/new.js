import React from "react";
import { Input, Form, Button, Checkbox, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import web3 from "../../ethereum/web3";
import { useRouter } from "next/router";
import { companyProducer } from "../../ethereum/contracts";

export default function CompanyNew() {
  const [values, setValues] = React.useState({
    name: "",
    symbol: "",
    sharesOutstanding: "",
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
      await companyProducer.methods
        .createCompany(values.name, values.symbol, values.sharesOutstanding)
        .send({
          from: accounts[0],
        });
    } catch (err) {
      setValues({ ...values, errorMessage: err.message });
    }
    setValues({ ...values, loading: false });
    console.log(address);
    //router.push(`/${address}`); //TODO: push to address of new campaign
  };

  return (
    <Layout>
      <h1>List your Company!</h1>
      <Form onSubmit={onSubmit} error={!!values.errorMessage}>
        <Form.Field>
          <label>Name</label>
          <Input
            type="text"
            placeholder="Apple Inc"
            value={values.name}
            onChange={(event) =>
              setValues({ ...values, name: event.target.value })
            }
          />
        </Form.Field>
        <Form.Field>
          <label>Symbol</label>
          <Input
            type="text"
            placeholder="AAPL"
            value={values.symbol}
            onChange={(event) =>
              setValues({ ...values, symbol: event.target.value })
            }
          />
        </Form.Field>
        <Form.Field>
          <label>Shares Outstanding</label>
          <Input
            type="number"
            placeholder="1000000"
            value={values.sharesOutstanding}
            onChange={(event) =>
              setValues({ ...values, sharesOutstanding: event.target.value })
            }
          />
        </Form.Field>
        <Form.Field>
          <Checkbox label="I agree to the Terms and Conditions" />
        </Form.Field>
        <Message error header="Oops!" content={values.errorMessage} />
        <Button loading={values.loading} primary>
          List
        </Button>
      </Form>
    </Layout>
  );
}

import React from "react";
import { Input, Form, Button, Checkbox, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import web3 from "../../ethereum/web3";
import { useRouter } from "next/router";
import { CompanyProducer } from "../../ethereum/contracts";

export default function CompanyNew() {
  const [values, setValues] = React.useState({
    name: "",
    symbol: "",
    description: "",
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
      await CompanyProducer.methods
        .createCompany(values.name, values.symbol, values.sharesOutstanding)
        .send({
          from: accounts[0],
        });
      setValues({ ...values, loading: false });
      router.push(`/${address}`); //TODO: push to address of new campaign
    } catch (err) {
      setValues({ ...values, errorMessage: err.message });
    }
  };

  return (
    <Layout>
      <h1>List your Company!</h1>
      <Form onSubmit={onSubmit} error={!!values.errorMessage}>
        <Form.Input
          label="Name"
          placeholder="Apple Inc"
          value={values.name}
          onChange={(event) =>
            setValues({
              ...values,
              name: event.target.value.substring(0, 31),
            })
          }
          error={values.name.length > 30}
        />
        <Form.Input
          label="Symbol"
          placeholder="AAPL"
          value={values.symbol}
          onChange={(event) =>
            setValues({
              ...values,
              symbol: event.target.value.substring(0, 6).toUpperCase(),
            })
          }
          error={values.symbol.length > 5}
        />
        <Form.Input
          label="Desciption"
          placeholder="Describe Your Company!!"
          value={values.description}
          onChange={(event) =>
            setValues({
              ...values,
              name: event.target.description,
            })
          }
        />
        <Form.Input
          label="Shares Outstanding"
          placeholder="1000"
          value={values.sharesOutstanding}
          onChange={(event) => {
            let value = parseInt(event.target.value.substring(0, 13));
            setValues({
              ...values,
              sharesOutstanding: isNaN(value) || value <= 0 ? "" : value,
            });
          }}
          error={values.sharesOutstanding >= 1000000000000} //<1T
        />
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

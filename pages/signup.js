import React from "react";
import {
  Button,
  Grid,
  Checkbox,
  Divider,
  Message,
  Form,
  Header,
} from "semantic-ui-react";
import Layout from "../components/Layout";
import ConnectWallet from "../components/ConnectWallet";

export default function SignUp({ companySummaries }) {
  const [values, setValues] = React.useState({
    name: "",
    email: "",
    password: "",
    address: "",
    errorMessage: "",
    loading: false,
  });

  const onSubmit = () => {};
  return (
    <Layout>
      <Grid centered>
        <Grid.Column width={10}>
          <br />
          <Header as="h3" textAlign="center">
            Join us in democratizing finance
          </Header>
          <Header as="h6" textAlign="center">
            Already have an account? <a href="/login">Login</a>
          </Header>
          <Button fluid color="blue">
            Sign Up With Google
          </Button>
          <Divider horizontal>Or</Divider>
          <Form onSubmit={onSubmit} error={!!values.errorMessage}>
            <Form.Input
              label="Name"
              placeholder="Bob"
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
              label="Email"
              placeholder="bob@hotmail.com"
              value={values.email}
              onChange={(event) =>
                setValues({
                  ...values,
                  email: event.target.value.substring(0, 31),
                })
              }
            />
            <Form.Input
              label="Password"
              placeholder="shhhh..."
              value={values.password}
              onChange={(event) =>
                setValues({
                  ...values,
                  password: event.target.value,
                })
              }
              error={values.password.length < 8}
            />
            <Form.Input
              label="Ethereum Wallet Address"
              placeholder="0x..."
              value={values.address}
              action="Connect"
              onChange={(event) =>
                setValues({
                  ...values,
                  address: event.target.value,
                })
              }
            />
            <Form.Field>
              <Checkbox label="I agree to the Terms and Conditions" />
            </Form.Field>
            <Message error header="Oops!" content={values.errorMessage} />
            <Button fluid color="red">
              Sign Up
            </Button>
          </Form>
        </Grid.Column>
      </Grid>
    </Layout>
  );
}

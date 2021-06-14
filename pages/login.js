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

export default function SignUp({ companySummaries }) {
  const [values, setValues] = React.useState({
    email: "",
    password: "",
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
            Welcome Back!
          </Header>
          <Header as="h6" textAlign="center">
            New to fundSME? <a href="/signup">Signup</a>
          </Header>
          <Button fluid color="blue">
            Login With Google
          </Button>
          <Divider horizontal>Or</Divider>
          <Form onSubmit={onSubmit} error={!!values.errorMessage}>
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
            />
            <Message error header="Oops!" content={values.errorMessage} />
            <Button fluid color="red">
              Login
            </Button>
          </Form>
          <Header as="h6" textAlign="center">
            <a>Forgot Password</a>
          </Header>
        </Grid.Column>
      </Grid>
    </Layout>
  );
}

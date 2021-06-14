import React from "react";
import {
  Button,
  Grid,
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
      <br />
      <Grid centered columns={1}>
        <Grid.Row textAlign="center">
          <h3>Welcome Back!</h3>
        </Grid.Row>
        <Grid.Row textAlign="center">
          New to fundSME? <a href="/signup">Signup</a>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={10}>
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
        </Grid.Row>
      </Grid>
    </Layout>
  );
}

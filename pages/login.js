import React from "react";
import { Button, Grid, Divider, Message, Form } from "semantic-ui-react";
import { useRouter } from "next/router";
import Layout from "../components/layout/Layout";

export default function Login({ companySummaries }) {
  const [values, setValues] = React.useState({
    email: "",
    password: "",
    errorMessage: "",
    loading: false,
  });

  const router = useRouter();
  const handleSubmit = () => {
    //TODO: authentication logic
    router.push("/explore");
  };
  const handleGoogle = () => {
    //TODO: authentication logic
    router.push("/explore");
  };
  return (
    <Layout>
      <br />
      <Grid centered columns={1}>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <h3>Welcome Back!</h3>
            <div>
              New to fundSME? <a href="/signup">Signup</a>
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={10}>
            <Button fluid color="blue" onClick={handleGoogle}>
              LOGIN WITH GOOGLE
            </Button>
            <Divider horizontal>Or</Divider>
            <Form onSubmit={handleSubmit} error={!!values.errorMessage}>
              <Form.Input
                label="Email"
                placeholder="john@doe.com"
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
                LOGIN
              </Button>
            </Form>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <a href="/">Forgot Password</a>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
}

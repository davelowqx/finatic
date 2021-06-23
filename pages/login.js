import React from "react";
import { Button, Grid, Divider, Message, Form } from "semantic-ui-react";
import { useRouter } from "next/router";
import Layout from "../components/layout/Layout";
import Link from "next/link";

export default function Login() {
  const [vars, setVars] = React.useState({
    email: "",
    password: "",
    errorMessage: "",
    loading: false,
  });

  const router = useRouter();

  const handleSubmit = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(vars.email, vars.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        vars.errorMessage = error.message;
        console.log(error.code, error.message);
      });

    router.push("/explore");
  };

  const handleGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);

    firebase
      .auth()
      .getRedirectResult()
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = result.credential;
        const user = result.user;
        console.log(credential, user);
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
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
              New to fundSME? <Link href="/signup">Signup</Link>
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column computer={8} mobile={16}>
            <Button fluid color="blue" onClick={handleGoogle}>
              LOGIN WITH GOOGLE
            </Button>
            <Divider horizontal>Or</Divider>
            <Form onSubmit={handleSubmit} error={!!vars.errorMessage}>
              <Form.Input
                label="Email"
                placeholder="john@doe.com"
                value={vars.email}
                onChange={(event) =>
                  setVars({
                    ...vars,
                    email: event.target.value.substring(0, 31),
                  })
                }
              />
              <Form.Input
                label="Password"
                placeholder="shhhh..."
                value={vars.password}
                onChange={(event) =>
                  setVars({
                    ...vars,
                    password: event.target.value,
                  })
                }
              />
              <Message error header="Oops!" content={vars.errorMessage} />
              <Button fluid color="red">
                LOGIN
              </Button>
            </Form>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <Link href="/">Forgot Password</Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
}

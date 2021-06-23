import React from "react";
import {
  Button,
  Grid,
  Checkbox,
  Divider,
  Message,
  Form,
} from "semantic-ui-react";
import Link from "next/link";
import Layout from "../components/layout/Layout";
import { useRouter } from "next/router";
import ConnectWallet from "../components/ConnectWallet";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUp() {
  const [vars, setVars] = React.useState({
    name: "",
    email: "",
    password: "",
    address: "",
    errorMessage: "",
    loading: false,
  });

  const router = useRouter();

  const handleSubmit = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(vars.email, vars.password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });

    router.push("/explore");
  };

  const handleGoogle = () => {
    //TODO: authentication logic
    router.push("/explore");
  };

  return (
    <Layout>
      <br />
      <Grid centered>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <h3>Join us in democratizing financial markets</h3>
            <div>
              Already have an account? <Link href="/login">Login</Link>
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column computer={8} mobile={16}>
            <Button fluid color="blue" onClick={handleGoogle}>
              SIGN UP WITH GOOGLE
            </Button>
            <Divider horizontal>or</Divider>
            <Form onSubmit={handleSubmit} error={!!vars.errorMessage}>
              <Form.Input
                label="Name"
                placeholder="John Doe"
                value={vars.name}
                onChange={(event) =>
                  setVars({
                    ...vars,
                    name: event.target.value.substring(0, 31),
                  })
                }
                error={vars.name.length > 30}
              />
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
                error={vars.password.length < 8}
              />
              <Form.Input
                label="Ethereum Wallet Address"
                placeholder="0x..."
                value={vars.address}
                action="Connect"
                onChange={(event) =>
                  setVars({
                    ...vars,
                    address: event.target.value,
                  })
                }
              />
              <Form.Field>
                <Checkbox label="I agree to the Terms and Conditions" />
              </Form.Field>
              <Message error header="Oops!" content={vars.errorMessage} />
              <Button fluid color="red">
                SIGN UP
              </Button>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
}

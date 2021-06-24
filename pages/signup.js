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
import { useRouter } from "next/router";
import ConnectWallet from "../components/ConnectWallet";
import GoogleAuth from "../firebase/GoogleAuth";
import { auth } from "../firebase";

export default function SignUp() {
  const [fields, setFields] = React.useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  const [states, setStates] = React.useState({
    errorMessage: "",
    loading: false,
  });

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStates({ ...states, loading: true });
    try {
      const userCredential = await SignUp(fields.email, fields.password);
      const email = userCredential.user.email;
      const refreshToken = userCredential.user.refreshToken;
      const uid = userCredential.user.uid;
      console.log(email);
      console.log(refreshToken);
      console.log(uid);
      console.log(userCredential);
      //router.push("/explore");
      setStates({ loading: false, ...states });
    } catch (error) {
      setStates({ loading: false, errorMessage: error.message });
    }
  };

  return (
    <>
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
            <Button fluid color="blue" onClick={GoogleAuth}>
              SIGN UP WITH GOOGLE
            </Button>
            <Divider horizontal>or</Divider>
            <Form error={!!fields.errorMessage}>
              <Form.Input
                label="Name"
                placeholder="John Doe"
                value={fields.name}
                onChange={(event) =>
                  setFields({
                    ...fields,
                    name: event.target.value.substring(0, 31),
                  })
                }
                error={fields.name.length > 30}
              />
              <Form.Input
                label="Email"
                placeholder="john@doe.com"
                value={fields.email}
                onChange={(event) =>
                  setFields({
                    ...fields,
                    email: event.target.value.substring(0, 31),
                  })
                }
              />
              <Form.Input
                label="Password"
                placeholder="shhhh..."
                value={fields.password}
                onChange={(event) =>
                  setFields({
                    ...fields,
                    password: event.target.value,
                  })
                }
                error={fields.password.length < 8}
              />
              <Form.Input
                label="Ethereum Wallet Address"
                placeholder="0x..."
                value={fields.address}
                action="Connect"
                onChange={(event) =>
                  setFields({
                    ...fields,
                    address: event.target.value,
                  })
                }
              />
              <Form.Field>
                <Checkbox label="I agree to the Terms and Conditions" />
              </Form.Field>
              <Message error header="Oops!" content={fields.errorMessage} />
              <Button
                fluid
                color="red"
                onClick={handleSubmit}
                disabled={states.loading}
              >
                SIGN UP
              </Button>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}

import React from "react";
import {
  Image,
  Header,
  Button,
  Grid,
  Divider,
  Message,
  Form,
} from "semantic-ui-react";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import Link from "next/link";
import GoogleAuth from "../firebase/GoogleAuth";
import { auth } from "../firebase";

export default function Login() {
  const [vars, setVars] = React.useState({
    email: "",
    password: "",
    errorMessage: "",
    loading: false,
  });

  const router = useRouter();

  const handleSubmit = () => {
    auth
      .signInWithEmailAndPassword(vars.email, vars.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        //router.push("/explore");
      })
      .catch((error) => {
        setVars({ ...vars, errorMessage: error.message });
        console.log(error);
      });
  };

  return (
    <div>
      <br />
      <div className="login-container cardborder">
        <Grid centered columns={1}>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <Image src="/static/logo.svg" size="mini" centered />
              <Header as="h3">
                Welcome to fundSME!
                <br />
                <br />
                Login below or create an account to continue.
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column computer={12} mobile={16}>
              <Form size="big" error={!!vars.errorMessage}>
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
                <br /> <br />
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
                <div style={{ marginTop: "-10px" }}>
                  <Link href="/">Forgot Password?</Link>
                </div>
                <Message error content={vars.errorMessage} />
                <br />
                <br />
                <div className="login-button-container">
                  <div className="login-buttons">
                    <Button size="big" fluid color="red" onClick={handleSubmit}>
                      LOGIN
                    </Button>
                  </div>
                  <div className="login-buttons">
                    <Button size="big" fluid color="blue" href="/signup">
                      SIGN UP
                    </Button>
                  </div>
                </div>
                <br />
                <Divider horizontal>Or</Divider>
                <br />
                <Button fluid size="big" color="green" onClick={GoogleAuth}>
                  LOGIN WITH GOOGLE
                </Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
  );
}

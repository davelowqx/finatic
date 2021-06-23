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
<<<<<<< HEAD
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
=======
      <div className="login-container cardborder">
        <Grid centered columns={1}>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <Image
                src="https://previews.dropbox.com/p/orig/ABOFglUnB0co3MIZAsQjxdb-UXaxiGNCkfbnYiLHsfTO5tFnl9z79ILZQgLc7gnIAqenGQhMJs0AeqQTJvFNcmAQByHbp_3msax_QA1V16x0kqYQTfdMIucEivw43tZDAQOmeCfmoBzhkvMWf6tOpDQbLYSMDcv2DuAn2Rlfw3zFkrmLjjZo9ISTCfRCFRXu8xaURtqGeC_R5s0XQOxo38OxpeE_6B863zyryZtuoKj0E2XuGvbp0pl_vVTaRHx7c4-pg7ZDTGp2KuA1GDezIU2vxXrSv0m-P0sCCflMUX8hWbLL6VuIARInYr3tJmZBmYiYhMmNdPheG-ydVpHbKkJx/p.svg"
                size="mini"
                centered
              />
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
              <Form
                size="big"
                onSubmit={handleSubmit}
                error={!!values.errorMessage}
              >
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
                <br /> <br />
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
                <div style={{ marginTop: "-10px" }}>
                  <Link href="/">Forgot Password?</Link>
                </div>
                <Message error header="Oops!" content={values.errorMessage} />
                <br />
                <br />
                <div className="login-button-container">
                  <div className="login-buttons">
                    <Button size="big" fluid color="red">
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
                <Button fluid size="big" color="green" onClick={handleGoogle}>
                  LOGIN WITH GOOGLE
                </Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
>>>>>>> 47c79548982e5d92955a445a4da2c6050f526f7b
    </Layout>
  );
}

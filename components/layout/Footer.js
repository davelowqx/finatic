import React from "react";
import { Grid, Divider } from "semantic-ui-react";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Layout(props) {
  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column width={16}>
          <Divider></Divider>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={8}>
          <h3>fundSME</h3>
          <div>We're here to fix capitalism.</div>
        </Grid.Column>
        <Grid.Column width={8}>
          <b>Links</b>
          <div>
            <a href="/explore">Explore</a>
          </div>
          <div>
            <a href="/terms">Terms</a>
          </div>
          <div>
            <a href="/login">Login</a>
          </div>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <Divider></Divider>
          <div>fundSME is not regulated by any governmental body.</div>
          <div>
            Investing on fundSME is risky. Don’t invest more than you can afford
            to lose.
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

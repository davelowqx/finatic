import React from "react";
import { Grid, Divider } from "semantic-ui-react";
import Link from "next/link";

export default function Layout(props) {
  return (
    <footer>
      <Grid centered>
        <Grid.Row></Grid.Row>
        <Grid.Row divided columns={2}>
          <Grid.Column>
            <h3>fundSME</h3>
            <div>We're here to fix capitalism.</div>
          </Grid.Column>
          <Grid.Column>
            <div>
              <Link href="/explore">Explore</Link>
            </div>
            <div>
              <Link href="/terms">Terms</Link>
            </div>
            <div>
              <Link href="/login">Login</Link>
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Divider section />
            <div>fundSME is not regulated by any governmental body.</div>
            <div>
              Investing on fundSME is risky. Don’t invest more than you can
              afford to lose.
            </div>
            <br />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </footer>
  );
}

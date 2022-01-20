import React from "react";
import { Icon, Grid, Divider } from "semantic-ui-react";

export default function Layout(props) {
  return (
    <>
      <Divider section />
      <footer>
        <Grid centered>
          <Grid.Row>
            <Grid.Column width={13}>
              <div style={{ color: "gray" }}>
                finatic is not a regulated entity.
              </div>
              <br />
            </Grid.Column>
            <Grid.Column width={3} textAlign="right">
              <a href="https:github.com/davelowqx/finatic">
                <Icon name="github" size="large" />
              </a>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </footer>
    </>
  );
}

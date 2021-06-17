import React from "react";
import { Menu, Grid } from "semantic-ui-react";
import Searchbar from "./Searchbar";

export default function Header({ width }) {
  return (
    <Grid>
      <Grid.Row>
        <Menu fluid secondary>
          <Menu.Item href="/">fundSME</Menu.Item>
          <Menu.Item href="/explore">Explore</Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              <Searchbar />
            </Menu.Item>
            <Menu.Item href="/companies/new">List Your Company</Menu.Item>
            <Menu.Item href="/login">Login</Menu.Item>
            <Menu.Item href="/signup">Signup</Menu.Item>
          </Menu.Menu>
        </Menu>
      </Grid.Row>
    </Grid>
  );
}

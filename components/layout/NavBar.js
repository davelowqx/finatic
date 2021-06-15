import { loadGetInitialProps } from "next/dist/next-server/lib/utils";
import Link from "next/link";
import React from "react";
import { Menu, Dropdown, Grid } from "semantic-ui-react";
import Searchbar from "./Searchbar";

export default function Header({ width }) {
  console.log(`width = ${width}`);
  if (width < 768) {
    return (
      <Grid>
        <Grid.Row>
          <Menu fluid secondary>
            <Menu.Item href="/" position="left">
              fundSME
            </Menu.Item>
            <Menu.Item>
              <Searchbar />
            </Menu.Item>
            <Menu.Menu position="right">
              <Dropdown
                item
                simple
                direction="right"
                icon="list ul"
                options={[
                  { key: 1, text: "List Your Company" },
                  { key: 2, text: "Login" },
                  { key: 3, text: "Signup" },
                ]}
              ></Dropdown>
            </Menu.Menu>
          </Menu>
        </Grid.Row>
      </Grid>
    );
  } else {
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
}

import React from "react";
import { Image, Container, Button, Menu, Grid } from "semantic-ui-react";
import Searchbar from "./Searchbar";

export default function Header({ width }) {
  const [loggedIn, setGridView] = React.useState(true);
  return (
    <Menu fluid>
      <Menu.Item className="header container12" href="/">
        <Image src="/static/logo.svg" avatar />
        <div className="logo">fundSME</div>
      </Menu.Item>
      <Menu.Item className="container68">
        <Menu.Item href="/explore?isFinancing=true">Explore</Menu.Item>
        <Searchbar />
        <Menu.Item href="/companies/new">List Your Company</Menu.Item>
      </Menu.Item>
      <Menu.Item className="container20">
        <div className="centercontainer">
          <Button as="a" inverted secondary href="/login">
            Log In
          </Button>
          <Button
            as="a"
            inverted
            secondary
            href="/signup"
            style={{ marginLeft: "0.5em" }}
          >
            Sign Up
          </Button>
        </div>
      </Menu.Item>
    </Menu>
  );
}

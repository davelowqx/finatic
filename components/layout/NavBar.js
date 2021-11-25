import React from "react";
import { Image, Container, Button, Menu, Grid } from "semantic-ui-react";
import Searchbar from "./Searchbar";
import ConnectWallet from "./ConnectWallet";

export default function Header() {
  return (
    <Menu fluid borderless className="cardborder">
      <Menu.Item className="header container12" href="/">
        <Image src="/static/logo.svg" avatar />
        <div className="logo">finatic</div>
      </Menu.Item>
      <Menu.Item href="/explore">Explore</Menu.Item>
      <Menu.Item className="container13" style={{ flex: "1" }}>
        <Searchbar />
      </Menu.Item>
      <Menu.Item href="/companies/new">List Your Company</Menu.Item>
      <ConnectWallet />
    </Menu>
  );
}

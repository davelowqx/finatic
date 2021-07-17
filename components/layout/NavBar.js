import React from "react";
import { Image, Container, Button, Menu, Grid } from "semantic-ui-react";
import Searchbar from "./Searchbar";
import ConnectWallet from "../ConnectWallet";

export default function Header() {
  return (
    <Menu fluid borderless>
      <Menu.Item className="header container12" href="/">
        <Image src="/static/logo.svg" avatar />
        <div className="logo">fundSME</div>
      </Menu.Item>
      <Menu.Item href="/explore">Explore</Menu.Item>
      <Menu.Item>
        <Searchbar />
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item href="/companies/new">List Your Company</Menu.Item>
        <Menu.Item>
          <div className="centercontainer">
            <ConnectWallet />
          </div>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}

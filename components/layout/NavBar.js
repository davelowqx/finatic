import React from "react";
import { Image, Menu } from "semantic-ui-react";
import Searchbar from "./Searchbar";
import ConnectWallet from "./ConnectWallet";

export default function Header() {
  return (
    <Menu fluid borderless className="cardborder">
      <Menu.Item className="header container12" href="/">
        <Image src="/logo.svg" avatar />
        <div className="logo">finatic</div>
      </Menu.Item>
      <Menu.Item style={{ flex: "1" }}>
        <Searchbar />
      </Menu.Item>
      <Menu.Item href="/new">
        <b>Create A Campaign</b>
      </Menu.Item>
      <ConnectWallet />
    </Menu>
  );
}

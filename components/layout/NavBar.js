import React from "react";
import { Icon, Image, Menu } from "semantic-ui-react";
import Searchbar from "./Searchbar";
import ConnectWallet from "./ConnectWallet";

export default function Header() {
  return (
    <Menu fluid borderless className="cardborder">
      <Menu.Item className="header" href="/">
        <Image src="/logo.svg" avatar />
        <div>finatic</div>
      </Menu.Item>
      <Menu.Item style={{ flex: "1" }}>
        <Searchbar />
      </Menu.Item>
      <Menu.Item href="/new">
        <Icon name="plus" size="small" />
        &nbsp;
        <b>Create</b>
      </Menu.Item>
      <ConnectWallet />
    </Menu>
  );
}

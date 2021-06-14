import React from "react";
import { Menu, Input, Icon } from "semantic-ui-react";
import Link from "next/link";
import ConnectWallet from "./ConnectWallet";

export default function Header() {
  const [search, setSearch] = React.useState("");
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  return (
    <Menu fluid secondary style={{ marginTop: "20px" }}>
      <Link href="/">
        <a className="item">fundSME</a>
      </Link>
      <Link href="/explore">
        <a className="item">Explore</a>
      </Link>
      <Menu.Menu position="right">
        <Menu.Item>
          <Input
            input={search}
            placeholder="Search..."
            icon="search"
            onChange={handleSearch}
            loading={!!search}
          />
        </Menu.Item>
        <Link href="/companies/new">
          <a className="item">List Your Company</a>
        </Link>
        <Link href="/login">
          <a className="item">Login</a>
        </Link>
        <Link href="/signup">
          <a className="item">Sign Up</a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
}

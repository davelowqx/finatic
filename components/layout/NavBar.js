import React from "react";
import { Image, Container, Button, Menu, Grid } from "semantic-ui-react";
import Searchbar from "./Searchbar";

export default function Header({ width }) {
  return (
    <Menu fluid>
      <Menu.Item className="header container12" href="/">
        <Image
          src="https://previews.dropbox.com/p/orig/ABOFglUnB0co3MIZAsQjxdb-UXaxiGNCkfbnYiLHsfTO5tFnl9z79ILZQgLc7gnIAqenGQhMJs0AeqQTJvFNcmAQByHbp_3msax_QA1V16x0kqYQTfdMIucEivw43tZDAQOmeCfmoBzhkvMWf6tOpDQbLYSMDcv2DuAn2Rlfw3zFkrmLjjZo9ISTCfRCFRXu8xaURtqGeC_R5s0XQOxo38OxpeE_6B863zyryZtuoKj0E2XuGvbp0pl_vVTaRHx7c4-pg7ZDTGp2KuA1GDezIU2vxXrSv0m-P0sCCflMUX8hWbLL6VuIARInYr3tJmZBmYiYhMmNdPheG-ydVpHbKkJx/p.svg"
          avatar
        />
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
            Log in
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

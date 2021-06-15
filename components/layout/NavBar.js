import React from "react";
import { Menu, Grid, Search } from "semantic-ui-react";
import db from "../../firebase/db";

export default function Header() {
  const [state, setState] = React.useState({
    loading: false,
    value: "",
    results: [],
  });
  const handleSearchChange = async (event) => {
    if (event.target.value) {
      setState({ ...state, loading: true, value: event.target.value });
      console.log(state);
      let i = 0;
      await db
        .collection("companies")
        //.where("name" === state.value)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            state.results[i++] = {
              title: doc.data().name,
              description: doc.data().symbol,
            };
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setState({ ...state, loading: false });
  };

  const handleResultSelect = (event) => {
    setState({
      ...state,
      loading: true,
      value: event.target.selection,
    });
    console.log(state);
  };

  return (
    <Grid>
      <Grid.Row>
        <Menu fluid secondary>
          <Menu.Item href="/">fundSME</Menu.Item>
          <Menu.Item href="/explore">Explore</Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              <Search
                loading={state.loading}
                onResultSelect={handleResultSelect}
                onSearchChange={handleSearchChange}
                results={state.results}
                value={state.value}
              ></Search>
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

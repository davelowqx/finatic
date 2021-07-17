import React from "react";
import { Search } from "semantic-ui-react";
import { db } from "../../firebase";

export default function Searchbar() {
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
    <Search
      className="search-bar"
      loading={state.loading}
      onResultSelect={handleResultSelect}
      onSearchChange={handleSearchChange}
      results={state.results}
      value={state.value}
      fluid
      style={{ marginLeft: "1em", marginRight: "1em" }}
    ></Search>
  );
}

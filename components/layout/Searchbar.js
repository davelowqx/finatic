import React from "react";
import { Search } from "semantic-ui-react";
import { db } from "../../firebase";
import _ from "lodash";

export default function Searchbar() {
  db.collection("companies")
    // .where("name", "==", state.value)
    .get()
    .then((querySnapshot) => {
      let i = 0;
      // console.log(querySnapshot.docs);
      querySnapshot.forEach((doc) => {
        // console.log(doc.data().name);
        state.results[i++] = {
          title: doc.data().name,
          description: doc.data().symbol,
        };
      });
    })
    .catch((err) => {
      console.log(err);
    });

  const initialState = {
    loading: false,
    results: [],
    value: "",
  };

  function SearchReducer(state, action) {
    switch (action.type) {
      case "CLEAN_QUERY":
        return initialState;
      case "START_SEARCH":
        return { ...state, loading: true, value: action.query };
      case "FINISH_SEARCH":
        return { ...state, loading: false, results: action.results };
      case "UPDATE_SELECTION":
        return { ...state, value: action.selection };

      default:
        throw new Error();
    }
  }

  const [state, dispatch] = React.useReducer(SearchReducer, initialState);
  const { loading, results, value } = state;
  const timeoutRef = React.useRef();

  const handleSearchChange = React.useCallback((event) => {
    clearTimeout(timeoutRef.current);

    dispatch({ type: "START_SEARCH", query: event.target.selection });

    timeoutRef.current = setTimeout(() => {
      if (event.target.value.length === 0) {
        dispatch({ type: "CLEAN_QUERY" });
        return;
      }

      const re = new RegExp(_.escapeRegExp(event.target.selection), "i");
      const isMatch = (result) => re.test(result.title);

      dispatch({
        type: "FINISH_SEARCH",
        results: _.filter(state.results, isMatch),
      });
    }, 300);
  }, []);

  React.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  // const handleSearchChange = async (event) => {
  //   if (event.target.value) {
  //     setState({ ...state, loading: true, value: event.target.value });
  //     console.log(state);
  //     let i = 0;
  //     await db
  //       .collection("companies")
  //       //.where("name" === state.value)
  //       .get()
  //       .then((querySnapshot) => {
  //         querySnapshot.forEach((doc) => {
  //           state.results[i++] = {
  //             title: doc.data().name,
  //             description: doc.data().symbol,
  //           };
  //         });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  //   setState({ ...state, loading: false });
  // };

  const handleResultSelect = (event) => {
    setState({
      ...state,
      loading: true,
      value: event.target.selection,
    });
    // console.log(state);
  };

  return (
    <Search
      className="search-bar"
      loading={state.loading}
      onResultSelect={(event) =>
        dispatch({
          type: "UPDATE_SELECTION",
          selection: event.target.selection,
        })
      }
      onSearchChange={handleSearchChange}
      results={state.results}
      value={state.value}
      fluid
      placeholder="Search"
      style={{ marginLeft: "1em", marginRight: "1em" }}
    ></Search>
  );
}

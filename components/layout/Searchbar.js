import React from "react";
import { Search } from "semantic-ui-react";
import { db } from "../../firebase";
import _ from "lodash";
import { useRouter } from "next/router";

export default function Searchbar() {
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

      default:
        throw new Error();
    }
  }

  const [state, dispatch] = React.useReducer(SearchReducer, initialState);
  const { loading, results, value } = state;
  const timeoutRef = React.useRef();

  const handleSearchChange = React.useCallback((event, data) => {
    clearTimeout(timeoutRef.current);
    dispatch({ type: "START_SEARCH", query: data.value });

    timeoutRef.current = setTimeout(async () => {
      if (data.value.length === 0) {
        dispatch({ type: "CLEAN_QUERY" });
        return;
      }

      state.results = [];
      await db
        .collection("campaigns")
        .where("name", "==", data.value)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc.data());
            const { name, CampaignAddress } = doc.data();
            state.results.push({
              key: CampaignAddress,
              title: name,
              description: CampaignAddress,
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });

      const re = new RegExp(_.escapeRegExp(data.value), "i");
      const isMatch = (result) => re.test(result.title);

      dispatch({
        type: "FINISH_SEARCH",
        results: _.filter(state.results, isMatch), // fetch db source
      });
    }, 300);
  }, []);

  React.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);
  const router = useRouter();

  return (
    <Search
      loading={state.loading}
      onResultSelect={(event, data) => {
        state.value = "";
        router.push(`/${data.result.key}`);
      }}
      onSearchChange={handleSearchChange}
      results={state.results}
      value={state.value}
      fluid
      placeholder="Search"
      style={{ margin: "0 1em" }}
    ></Search>
  );
}

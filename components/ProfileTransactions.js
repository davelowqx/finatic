import React from "react";
import { Feed } from "semantic-ui-react";

export default function ProfileTransactions({ address }) {
  return (
    <Feed.Event
      icon="pencil"
      date="Today"
      summary="You posted on your friend Stevie Feliciano's wall."
    ></Feed.Event>
  );
}

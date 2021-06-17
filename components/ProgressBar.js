import React from "react";
import { Progress } from "semantic-ui-react";

export default function ProgressBar({ show, percent }) {
  if (show) {
    return <Progress percent={percent} indicating />;
  } else {
    return <div></div>;
  }
}

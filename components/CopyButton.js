import React from "react";
import { Button } from "semantic-ui-react";

const CopyButton = ({ text, floated }) => {
  const handleClick = () => {
    navigator.clipboard.writeText(text);
  };
  return (
    <Button
      icon="copy"
      size="mini"
      floated={floated}
      onClick={handleClick}
    ></Button>
  );
};

export default CopyButton;

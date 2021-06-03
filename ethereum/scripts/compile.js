const solc = require("solc");
const fs = require("fs");
const path = require("path");

//read contract.json
const src = fs.readFileSync(
  path.resolve(__dirname, "../contracts/contract.sol"),
  "utf-8"
);

//formatting json object for input to compiler
//https://docs.soliditylang.org/en/v0.8.4/using-the-compiler.html
//#compiler-input-and-output-json-description
const input = {
  language: "Solidity",
  sources: {
    "contract.sol": {
      content: src,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["abi", "evm.bytecode.object"],
      },
    },
  },
};

//compiling and parsing json output from compiler
const output = JSON.parse(solc.compile(JSON.stringify(input)));

//writing each contract to separate json files
for (let c in output.contracts["contract.sol"]) {
  json = output.contracts["contract.sol"][c];
  console.log(json);
  fs.writeFileSync(
    path.resolve(__dirname, `../build/${c}.json`),
    JSON.stringify(json)
  );
}

const solc = require("solc");
const fs = require("fs");
const path = require("path");

//formatting json object for input to compiler
//https://docs.soliditylang.org/en/v0.8.4/using-the-compiler.html
//#compiler-input-and-output-json-description
const input = {
  language: "Solidity",
  sources: {},
  settings: {
    outputSelection: {
      "*": {
        "*": ["abi", "evm.bytecode.object"],
      },
    },
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
};

const files = fs.readdirSync(path.resolve(__dirname, "../contracts"));
for (const file of files) {
  const src = fs.readFileSync(
    path.resolve(__dirname, `../contracts/${file}`),
    "utf-8"
  );
  input.sources[file] = { content: src };
}

//compiling and parsing json output from compiler
const output = JSON.parse(solc.compile(JSON.stringify(input)));

//writing each contract to separate json files
for (const file of files) {
  json = output.contracts[file][file.slice(0, -4)];
  console.log(json);
  fs.writeFileSync(
    path.resolve(__dirname, `../build/${file.slice(0, -4)}.json`),
    JSON.stringify(json)
  );
}

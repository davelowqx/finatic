// imports
const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

// Delete the old smart contracts
const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

// Read and compile the latest campaign contract
const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const source = fs.readFileSync(campaignPath, "utf8");
const output = solc.compile(source, 1).contracts;

// Create 'build' folder
fs.ensureDirSync(buildPath);

console.log(output);

// loop through the output and create contract
for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract + ".json"),
    output[contract]
  );
}

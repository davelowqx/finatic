# Finatic

A web application to form decentralised autonomous organisations with reputation-based hierachical structure

# Installation

1. download branch "dave" from github repo
2. make sure you have node.js installed
3. install the necessary dependencies using "npm install"
4. install ganache-cli globally with "npm install -g ganache-cli"
5. in terminal, run the local ethereum testnet ganache with "ganache-cli"
6. copy the mnemomic and replace the current mnemonic in finatic/ethereum/scripts/deploy.js
7. run "node deploy.js" to deploy the smart contract on ganache
8. enter command "npm run dev" to run server and go to http://localhost:3000 once up and running

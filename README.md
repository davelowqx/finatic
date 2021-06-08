# Finatic

A web application for startup fundraising, guaranteed trustlessly by the ethereum network.

# Installation

1. make sure you have `node.js` and `metamask` installed
2. download branch `new` from github repo
3. install the dependencies using `npm install`
4. install ganache-cli globally with `npm install -g ganache-cli`

# Execution

5. in terminal, run the local ethereum testnet with `ganache-cli -m "oyster exercise random pledge thrive food mail hover knee cry sure eternal"`
6. run `node deploy.js` to deploy the smart contract on ganache
7. enter command `npm run dev` to run server and go to `http://localhost:3000` once up and running
8. make sure metamask is connected to `localhost:8545` and import 2 accounts with the private key provided by ganache-cli

# Finatic

A web application for startups to raise funds, guaranteed trustlessly by the ethereum network.

# Installation

1. make sure you have `node.js` and `metamask` installed
2. download branch `master` from github repo
3. install the dependencies using `npm install`
4. install ganache-cli globally with `npm install -g ganache-cli`

# Execution

5. in terminal, run the local ethereum testnet with `ganache-cli`
6. copy the mnemomic (10 word phrase) and replace the current mnemonic in `finatic/ethereum/scripts/deploy.js`
7. run `node deploy.js` to deploy the smart contract on ganache
8. enter command `npm run dev` to run server and go to `http://localhost:3000` once up and running
9. make sure metamask is connected to `localhost:8545` and import 2 accounts with the private key provided by ganache-cli
10. you will finally be able to use the platform

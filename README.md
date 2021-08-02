# FundSME

A web application for equity financing, guaranteed by smart contracts on the ethereum network.

# Production

1. go to `fundsme.vercel.app`
2. ensure `metamask` is installed.
3. initialise `metmask` with secret recovery phrase `oyster exercise random pledge thrive food mail hover knee cry sure eternal`
4. use the first 5 accounts created

# Development

1. ensure `node.js` and `metamask` is installed
2. download branch `master`
3. install the dependencies using `npm install`
4. install ganache-cli globally with `npm install -g ganache-cli`
5. in terminal, run the local ethereum testnet with `ganache-cli -m "oyster exercise random pledge thrive food mail hover knee cry sure eternal"`
6. enter command `npm run dev` to run server and go to `http://localhost:3000` once up and running
7. make sure `metamask` is connected to `localhost:8545` and import 2 accounts with the private key provided by ganache-cli

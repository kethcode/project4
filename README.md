# bank

we are going to be using ethers.js to send and receive Ether from a smart contact.

## getting started

pull down the repo and then run `npm i`.

## configure .env

we're going to use process.env to access private variables

Copy .env.example to .env

Configure all 3 keys for Optimism Goerli; we may need them all.

```
ALCHEMY_OP_GOERLI_KEY_HTTP 
ALCHEMY_OP_GOERLI_KEY_WSS 
ALCHEMY_OP_GOERLI_PRIVATE_KEY
```

## unlock the deployed smart contract

make sure your metamask is set to **Optimism Goerli**, since that is where the contract is deployed.

If your wallet does not have that configured yet, you can add it to your metamask from here: https://chainlist.org/chain/420

you will be working on the file scripts\homework.js

to execute it, run `node scripts\homework.js` from the terminal

if you get stuck, you can look at the solution in solution\solution.js
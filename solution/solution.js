require("dotenv").config();

const fs = require("fs");
const console = require("console");
const ethers = require("ethers");

const bankContractAddress = "0xF0E9d09257324eFB5c68eF2ee1D7c6d855538ad2";

const abiFilePath = "artifacts/contracts/bank.sol/bank.json";
const abiFileParsed = JSON.parse(fs.readFileSync(abiFilePath));
const bankContractAbi = abiFileParsed.abi;

// TODO: set up the WSS provider (note that we use HTTP for deployment)
// https://docs.ethers.org/v5/api/providers/other/#WebSocketProvider
const provider = new ethers.providers.WebSocketProvider(
  process.env.ALCHEMY_OP_GOERLI_KEY_WSS
);

// TODO: set up the signer
// https://docs.ethers.org/v5/api/signer/#Wallet-constructor
const signer = new ethers.Wallet(
  process.env.ALCHEMY_OP_GOERLI_PRIVATE_KEY,
  provider
);

// TODO: set up the contract with a signer since we will be writing to the contract
// https://docs.ethers.org/v5/api/contract/contract/#Contract--creating
const bankContract = new ethers.Contract(
  bankContractAddress,
  bankContractAbi,
  signer
);

async function main() {
  // Sending arguments to a contract function call is done as you would expect
  // note, this is different than checking the balance of the signer.address on the blockchain
  // which is done by calling the signer.getBalance();
  // https://docs.ethers.org/v5/api/signer/#Signer--properties

  // remember that public variables on contracts autoamtically generate a getter function
  // that you can call to retrieve their values

  // TODO: check the current balance of the signer.address stored on the bank contract
  let signerBalance = await bankContract.balance(signer.address);
  console.log("signerBalance: ", signerBalance);

  // Sending ETH is a little different.  Each transaction has some hidden parameters
  // that default to typical reasonable values.  You can customize them.
  // The most used overrides are gasLimit and value.
  // https://docs.ethers.org/v5/api/contract/contract/#contract-functionsSend

  // an example call might be something like contract.function (arg1, arg2, {value: 100})
  // also note that the value is in wei, and eth is 10^18 wei
  // most of the time, we use e.g. ethers.utils.parseEther("1.0") to convert from eth to wei

  // TODO: deposit 0.01 Goerli ETH into the bank contract at signer.address
  let depositTx = await bankContract.deposit(signer.address, {
    value: ethers.utils.parseEther("0.01"),
  });

  // when modifying the network state, you have to await the transaction to be mined
  await depositTx.wait();

  // TODO: check the current balance of the signer.address again
  signerBalance = await bankContract.balance(signer.address);
  console.log("signerBalance: ", signerBalance);

  // TODO: withdraw 0.01 Goerli ETH from the bank contract at signer.address to the signer.address

  // you can either use the value stored in signerBalance, or hardcode it using ethers.utils.parseEther
  let withdrawTx = await bankContract.withdraw(
    signer.address,
    signer.address,
    signerBalance
  );
  await withdrawTx.wait();

  // TODO: check the current balance of the signer.address again
  signerBalance = await bankContract.balance(signer.address);
  console.log("signerBalance: ", signerBalance);

  // TOD0: examine the contradt on etherscan to review and confirm the transactions
  // You can also review the Contract tab and check balances of known addresses
  // https://goerli-optimism.etherscan.io/address/0xF0E9d09257324eFB5c68eF2ee1D7c6d855538ad2
}

// This is boilerplate that you can copy paste most of the time.
// Well, most of the time you wont need this at all, since you will
// be calling it from within a function in the front end.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

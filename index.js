const { Alchemy, Network, Wallet, Utils } = require("alchemy-sdk");
require("dotenv").config();

const { GOERLI_RPC_URL, PRIVATE_KEY } = process.env;

const settings = {
  apiKey: GOERLI_RPC_URL,
  network: Network.ETH_GOERLI,
};
const alchemy = new Alchemy(settings);

let wallet = new Wallet(PRIVATE_KEY);

async function main() {
  const nonce = await alchemy.core.getTransactionCount(
    wallet.address,
    "latest"
  );

  let transaction = {
    to: "0xe9C757DF8c8100C11bCBd3066981aBF69F605d63", //choose any address!,
    value: Utils.parseEther("0.001"), // 0.001 worth of ETH being sent
    gasLimit: "21000",
    maxPriorityFeePerGas: Utils.parseUnits("5", "gwei"),
    maxFeePerGas: Utils.parseUnits("20", "gwei"),
    nonce: nonce,
    type: 2,
    chainId: 5, // göerli transaction
  };

  let rawTransaction = await wallet.signTransaction(transaction);
  console.log("Raw tx: ", rawTransaction);
  let tx = await alchemy.core.sendTransaction(rawTransaction);
  console.log(`https://goerli.etherscan.io/tx/${tx.hash}`);
}

main();

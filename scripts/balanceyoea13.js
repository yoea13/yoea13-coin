const balanceyoea13addr = "0x052258F87f85CC550DcAba8fb0dB65b03f84e3f5";
// const contractName = "Yoea13";
const { ethers } = require("hardhat");
require("dotenv").config();

// const abi = require("../abi.json");
const abi = [
  "function name() public view returns (string)",
  "function symbol() public view returns (string)",
  "function decimals() public view returns (uint8)",
  "function totalSupply() public view returns (uint256)",
  "function balanceOf(address) public view returns (uint256)",
  "function approve(address _spender, uint256 _value) public returns (bool success)",
];

async function main() {
  // Second parameter is chainId, 1 for Ethereum mainnet
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.GOERLI_RPC_URL,
    5
  );
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const YOEA13Contract = new ethers.Contract(balanceyoea13addr, abi, signer);

  const name = await YOEA13Contract.name();
  const symbol = await YOEA13Contract.symbol();
  const decimals = await YOEA13Contract.decimals();
  const totalSupply = await YOEA13Contract.totalSupply();
  const balance = await YOEA13Contract.balanceOf(
    "0x0E7C484D958f951b0709adf02a6eab19De107C05"
  );

  console.log(
    `${symbol} (${name}) total supply is ${ethers.utils.formatUnits(
      totalSupply,
      decimals
    )}`
  );
  console.log(`Mi wallet has ${ethers.utils.formatUnits(balance, decimals)}`);

  // const estimatedGasLimit = await USDTContract.estimateGas.approve("SOME_ADDRESS", "1000000"); // approves 1 USDT
  // const approveTxUnsigned = await USDTContract.populateTransaction.approve("SOME_ADDRESS", "1000000");
  // approveTxUnsigned.chainId = 1; // chainId 1 for Ethereum mainnet
  // approveTxUnsigned.gasLimit = estimatedGasLimit;
  // approveTxUnsigned.gasPrice = await provider.getGasPrice();
  // approveTxUnsigned.nonce = await provider.getTransactionCount(walletAddress);

  // const approveTxSigned = await signer.signTransaction(approveTxUnsigned);
  // const submittedTx = await provider.sendTransaction(approveTxSigned);
  // const approveReceipt = await submittedTx.wait();
  // if (approveReceipt.status === 0)
  //     throw new Error("Approve transaction failed");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

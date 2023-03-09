const bucketaddr = "0x873289a1aD6Cf024B927bd13bd183B264d274c68";
const yoea13addr = "0x052258F87f85CC550DcAba8fb0dB65b03f84e3f5";
const developer1 = "0x0E7C484D958f951b0709adf02a6eab19De107C05";
const { ethers } = require("hardhat");
require("dotenv").config();

const abibucket = [
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "address", name: "", type: "address" },
    ],
    name: "Winner",
    type: "event",
  },
  {
    inputs: [
      { internalType: "address", name: "erc20", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "drop",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const abiyoea13 = [
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
  const buckerContract = new ethers.Contract(bucketaddr, abibucket, signer);
  const Yoea13Contract = new ethers.Contract(yoea13addr, abiyoea13, signer);
  const balanceantes = await Yoea13Contract.balanceOf(
    "0x0E7C484D958f951b0709adf02a6eab19De107C05"
  );
  const tx1 = await Yoea13Contract.approve(bucketaddr, "1000000000000000000");
  await tx1.wait();
  const tx2 = await buckerContract.drop(yoea13addr, "1000000000000000000");
  await tx2.wait();
  // console.log(tx2);
  const name = await Yoea13Contract.name();
  const symbol = await Yoea13Contract.symbol();
  const decimals = await Yoea13Contract.decimals();
  const totalSupply = await Yoea13Contract.totalSupply();
  const balance = await Yoea13Contract.balanceOf(
    "0x0E7C484D958f951b0709adf02a6eab19De107C05"
  );

  console.log(
    `${symbol} (${name}) total supply is ${ethers.utils.formatUnits(
      totalSupply,
      decimals
    )}`
  );
  console.log(
    `Mi wallet had ${ethers.utils.formatUnits(
      balanceantes,
      decimals
    )} and now has ${ethers.utils.formatUnits(balance, decimals)}`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

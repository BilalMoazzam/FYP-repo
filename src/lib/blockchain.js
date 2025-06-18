import { BrowserProvider, Contract } from "ethers";
import abi from "../abi/SupplyChainTransactions.json";
const CONTRACT_ADDRESS = "0xc64951694d0b5ebfcf612dae4221e0af35d4cd44";

export async function recordTransaction({
  txId,
  fromEntity,
  toEntity,
  txType,
  description,
  quantity,
  status,
}) {
  const contract = await getContract();
  const tx = await contract.recordTransaction(
    txId,
    fromEntity,
    toEntity,
    txType,
    description,
    quantity,
    status
  );
  await tx.wait(); // Wait for the transaction to be mined
  return tx.hash;
}


export async function getContract() {
  if (typeof window.ethereum === "undefined") {
    throw new Error("No Ethereum provider found");
  }

  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new Contract(CONTRACT_ADDRESS, abi, signer);
}

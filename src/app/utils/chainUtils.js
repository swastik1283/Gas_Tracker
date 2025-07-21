import { WebSocketProvider } from "ethers";
import CHAIN from "./chainconfig.js";
import useGasStore from "../store/useGasStore.js";

// Initialize providers for all chains
const providers = {};
const intervals = [];

Object.keys(CHAIN).forEach((chain) => {
  providers[chain] = new WebSocketProvider(CHAIN[chain].wsUrl);
});

// Shared fetch function
const fetchAndUpdateGas = async (chain) => {
  try {
    // Fetch fee data and latest block in parallel
    const [feeData, latestBlock] = await Promise.all([
      providers[chain].getFeeData(),
      providers[chain].getBlock("latest"),
    ]);

    const gasdata = {
      gasPrice: feeData.gasPrice?.toString(),
      maxFeePerGas: feeData.maxFeePerGas?.toString(),
      maxPriorityFeePerGas: feeData.maxPriorityFeePerGas?.toString(),
      baseFee: latestBlock.baseFeePerGas
        ? parseFloat(latestBlock.baseFeePerGas.toString()) / 1e9
        : null, // in Gwei
      priorityFee: feeData.maxPriorityFeePerGas
        ? parseFloat(feeData.maxPriorityFeePerGas.toString()) / 1e9
        : null,
      timestamp: Date.now(),
    };

    useGasStore.getState().updateGas(chain, gasdata);
  } catch (err) {
    console.error(`Failed to fetch gas data for ${chain}`, err);
  }
};

// Subscribe to block events + fallback 6s polling
const subscribetoGas = () => {
  Object.keys(providers).forEach((chain) => {
    // Real-time updates on new blocks
    providers[chain].on("block", () => fetchAndUpdateGas(chain));

    // Fallback interval every 6 seconds
    const interval = setInterval(() => {
      fetchAndUpdateGas(chain);
    }, 6000);
    intervals.push(interval);
  });
};

// Clean up all listeners and intervals
const unsubscribeAll = () => {
  Object.keys(providers).forEach((chain) => {
    providers[chain].removeAllListeners("block");
  });

  intervals.forEach(clearInterval);
};

export { subscribetoGas, unsubscribeAll };

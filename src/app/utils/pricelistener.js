import { WebSocketProvider, Contract,formatUnits } from "ethers";
import IUniswapV3PoolABI from "./abis/IUniswapV3Pool.json";
import useGasStore from "../store/useGasStore";

const USDC_ETH_POOL = "0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640"; // Mainnet ETH/USDC pool

const provider = new WebSocketProvider("wss://eth-mainnet.g.alchemy.com/v2/qIm2v2VNvZ9RVNIIujBALURIF_ZZ0jtJ"); // Replace with your key

export const startUniswapPriceListener = async () => {
  const poolContract = new Contract(USDC_ETH_POOL, IUniswapV3PoolABI, provider);
  const setethUsdPrice = useGasStore.getState().setethUsdPrice;

  const updatePrice = async () => {
    try {
        const slot0 = await poolContract.slot0();
    const sqrtPriceX96 = BigInt(slot0.sqrtPriceX96);
    const priceX96Squared = sqrtPriceX96 * sqrtPriceX96;
    const Q192 = BigInt(2) ** BigInt(192);

    // Uniswap returns token1/token0 → USDC/ETH
    // Since we're interested in ETH/USD → take inverse
    const price = Number(priceX96Squared) / Number(Q192);
    const ethUsdPrice = 1 / price;

    // Adjust for token decimals: ETH 18, USDC 6 → difference of 12
    const adjustedEthUsd = ethUsdPrice * 10 ** 12;

    console.log("ETH/USD:", adjustedEthUsd);
    setethUsdPrice(adjustedEthUsd.toFixed(2));
    } catch (err) {
      console.error("Error fetching slot0:", err);
    }
  };

  // Fetch once initially
  updatePrice();

  // Subscribe to Swap event for live updates
  poolContract.on("Swap", async () => {
    console.log("Swap event received – updating ETH/USD");
    updatePrice();
  });
};

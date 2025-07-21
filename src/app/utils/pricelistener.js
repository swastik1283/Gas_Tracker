import { WebSocketProvider, Contract, formatEther, formatUnits } from "ethers";
import IUniswapV3PoolABI from "./abis/IUniswapV3Pool.json";
import useGasStore from "../store/useGasStore";

const USDC_ETH_POOL = "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8";

export const startUniswapPriceListener = () => {
  const provider = new WebSocketProvider(
    "wss://eth-mainnet.g.alchemy.com/v2/qIm2v2VNvZ9RVNIIujBALURIF_ZZ0jtJ"
  );

  const poolContract = new Contract(USDC_ETH_POOL, IUniswapV3PoolABI, provider);

  poolContract.on("Swap", (sender, recipient, amount0, amount1) => {
    const ethAmount = formatEther(amount1);
    const usdcAmount = formatUnits(amount0, 6);

    if (Number(ethAmount) !== 0 && Number(usdcAmount) !== 0) {
      const price = Math.abs(usdcAmount / ethAmount);
      useGasStore.getState().setEthUsdPrice(price);
    }
  });
};

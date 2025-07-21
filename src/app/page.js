'use client';

import React, { useEffect, useState } from "react";
import { subscribetoGas, unsubscribeAll } from "./utils/chainUtils";
import ChainStatus from "./components/ChainStatus";
import GasChart from "./components/Gaschart";
import Walletsimulator from "./components/walletsimulator";
import useGasStore from "./store/useGasStore";
import GasFetcher from "./components/Gasfetcher";
import { startUniswapPriceListener } from "./utils/pricelistener";

export default function HomePage() {
  const gasdata = useGasStore((state) => state.gasdata);
  const setselectedchain = useGasStore((state) => state.setselectedchain);
  const ethUsdPrice = useGasStore((state) => state.ethUsdPrice);

  const [showWallet, setShowWallet] = useState(false); // toggle state

  useEffect(() => {
    subscribetoGas();
    startUniswapPriceListener();

    return () => {
      unsubscribeAll();
    };
  }, []);

  return (
    <main className="min-h-screen p-4 bg-gray-900 text-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">🚀 Cross-Chain Gas Tracker</h1>

        <button
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white"
          onClick={() => setShowWallet((prev) => !prev)}
        >
          {showWallet ? "Close Wallet" : "Wallet Simulator"}
        </button>
      </div>

  <p className="text-lg font-semibold">
  ETH/USD Price: $
  {ethUsdPrice
    ? Number(ethUsdPrice).toFixed(2)
    : "Loading..."}
</p>

      <div className="mt-8">
        <GasFetcher />
      </div>

      {showWallet && (
        <div className="mt-8">
          <Walletsimulator />
        </div>
      )}
    </main>
  );
}

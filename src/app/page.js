'use client';

import React, { useEffect } from "react";
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
  useEffect(() => {
    subscribetoGas();
  startUniswapPriceListener();
    return () => {
      unsubscribeAll();
    };
  }, []);

  return (
    <main className="min-h-screen p-4 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">🚀 Cross-Chain Gas Tracker</h1>

      
      
      <div className="mt-8">
        <GasFetcher />
      </div>

      {/* <div className="mt-8">
        <GasChart />
      </div> */}

      <div className="mt-8">
        <Walletsimulator />
      </div>
    </main>
  );
}

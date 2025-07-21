"use client";

import React, { useState } from "react";
import useGasStore from "../store/useGasStore.js";

const Walletsimulator = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectedChain, setSelectedChain] = useState("");
  const [calculatedCost, setCalculatedCost] = useState(null);

  const gasData = useGasStore((state) => state.gasdata);
  const ethUsdPrice = useGasStore((state) => state.ethUsdPrice); // ETH to USD

  const calculateCost = () => {
    if (!selectedChain || !inputValue || !gasData[selectedChain]) {
      setCalculatedCost(null);
      return;
    }

    const gasPriceWei = gasData[selectedChain].gasPrice;
    const gasUsed = Number(inputValue);
    const price = Number(gasPriceWei);

    if (!price || !gasUsed) {
      setCalculatedCost(null);
      return;
    }

    const costEth = (gasUsed * price) / 1e18;
    const costUsd = ethUsdPrice * costEth;

    setCalculatedCost(
      `Estimated: ${costEth.toFixed(6)} ETH (~$${costUsd.toFixed(2)} USD)`
    );
  };

  return (
    <div className="p-4 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">⛽ Wallet Gas Simulator</h2>

      {calculatedCost && (
        <div className="text-lg font-semibold text-center text-green-500 mb-4">
          {calculatedCost}
        </div>
      )}

      <label className="block mb-2 text-gray-700">Select Chain</label>
      <select
        value={selectedChain}
        onChange={(e) => setSelectedChain(e.target.value)}
        className="mb-4 p-2 border rounded w-full text-black"
      >
        <option value="" disabled>Select a chain</option>
        <option value="ethereum">Ethereum</option>
        <option value="polygon">Polygon</option>
        <option value="arbitrum">Arbitrum</option>
      </select>

      <label className="block mb-2 text-gray-700">Gas Used</label>
      <input
        type="number"
        className="border p-2 w-full rounded mb-4"
        placeholder="e.g. 21000"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <button
        onClick={calculateCost}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Calculate Gas Cost
      </button>
    </div>
  );
};

export default Walletsimulator;

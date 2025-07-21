'use client';

import React, { useState } from 'react';
import useGasStore from '../store/useGasStore.js';

const Walletsimulator = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedChain, setSelectedChain] = useState('');
  const [calculatedCost, setCalculatedCost] = useState(null);

  const gasData = useGasStore((state) => state.gasdata);
  const ethUsdPriceRaw = useGasStore((state) => state.ethUsdPrice);

  const ethUsd = (() => {
    if (!ethUsdPriceRaw) return 0;
    if (typeof ethUsdPriceRaw === 'bigint') return Number(ethUsdPriceRaw) / 1e18;
    if (typeof ethUsdPriceRaw === 'string') return parseFloat(ethUsdPriceRaw);
    return Number(ethUsdPriceRaw);
  })();

const calculateCost = () => {
  if (!selectedChain || !inputValue || !gasData[selectedChain]) {
    setCalculatedCost(null);
    return;
  }

  const gasUsed = BigInt(inputValue);
  const gasPriceWei = BigInt(gasData[selectedChain].gasPrice);

  const costWei = gasUsed * gasPriceWei;
  const costEth = Number(costWei) / 1e18;
  const costUsd = costEth * ethUsd;

  setCalculatedCost({
    eth: costEth.toFixed(6),
    usd: costUsd.toFixed(2),
  });
};



  return (
    <div className="p-4 w-full max-w-md mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">⛽ Wallet Gas Simulator</h2>

      {calculatedCost && (
        <div className="text-lg font-semibold text-center text-green-600 mb-4">
          Estimated: {calculatedCost.eth} ETH (~${calculatedCost.usd} USD)
        </div>
      )}

      <label className="block mb-2 font-medium text-gray-700">Select Chain</label>
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

      <label className="block mb-2 font-medium text-gray-700">Gas Used</label>
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

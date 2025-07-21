"use client";

import React, { useState } from "react";
import useGasStore from "../store/useGasStore";
import CHAIN from "../utils/chainconfig";
import Gaschart from "./Gaschart"; // assuming chart component
import dynamic from "next/dynamic";

// Dynamically import chart to avoid hydration issues
const DynamicGasChart = dynamic(() => import('./Gaschart'), { ssr: false });

const GasFetcher = () => {
  const gasData = useGasStore((state) => state.gasdata);
  const [selectedChain, setSelectedChain] = useState(null);

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">🚀 Real-Time Gas Tracker</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(gasData).map(([key, data]) => (
          data && (
            <div key={key} className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-md">
              <h3 className="text-xl font-bold mb-2 text-blue-400">
                {CHAIN[key]?.name || key.toUpperCase()}
              </h3>
              <div className="text-sm text-gray-300 space-y-1">
                <p><span className="text-gray-400">Gas Price:</span> <span className="font-mono">{data.gasPrice || 'N/A'} wei</span></p>
                <p><span className="text-gray-400">Max Priority:</span> <span className="font-mono">{data.maxPriorityFeePerGas || 'N/A'} wei</span></p>
                <p><span className="text-gray-400">Max Fee:</span> <span className="font-mono">{data.maxFeePerGas || 'N/A'} wei</span></p>
                <p><span className="text-gray-400">Base Fee:</span> <span className="font-mono text-green-400">{data.baseFee?.toFixed(2) || 'N/A'} Gwei</span></p>
                <p><span className="text-gray-400">Priority Fee:</span> <span className="font-mono text-orange-400">{data.priorityFee?.toFixed(2) || 'N/A'} Gwei</span></p>
                <p className="text-xs text-gray-500 pt-2">Last Updated: {data?.timestamp ? new Date(data.timestamp).toLocaleTimeString() : '-'}</p>
              </div>
              <button
                className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm"
                onClick={() => setSelectedChain(key)}
              >
                View Chart
              </button>
            </div>
          )
        ))}
      </div>

      {/* Chart Rendering Section */}
      {selectedChain && (
        <div className="mt-10">
          <h3 className="text-xl font-semibold text-center text-yellow-300 mb-2">
            Candlestick Chart - {CHAIN[selectedChain]?.name || selectedChain.toUpperCase()}
          </h3>
          <DynamicGasChart selectedChain={selectedChain} />
        </div>
      )}
    </div>
  );
};

export default GasFetcher;

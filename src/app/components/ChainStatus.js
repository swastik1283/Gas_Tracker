"use client";

import React from "react";
import useGasStore from "../store/useGasStore.js";
import CHAIN from "../utils/chainconfig.js";

const ChainStatus=()=>{
    const gasdata=useGasStore((state)=>state.gasdata);
    const updateGas=useGasStore((state)=>state.updateGas);
    return(
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            {Object.entries(gasdata).map(([chain,data])=>(
               <div
  key={chain}
  className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 flex flex-col gap-2 transition hover:scale-[1.02] duration-200"
>
  <h2 className="text-2xl font-bold text-blue-800">{CHAIN[chain]?.name || chain}</h2>

  <div className="text-gray-700 mt-2">
    <p>
      <span className="font-medium text-gray-500">Base Fee: </span>
      <span className="text-green-600 font-semibold">
        {data?.baseFee ? `${data.baseFee.toFixed(2)} Gwei` : "Loading..."}
      </span>
    </p>
    <p>
      <span className="font-medium text-gray-500">Priority Fee: </span>
      <span className="text-orange-600 font-semibold">
        {data?.priorityFee ? `${data.priorityFee.toFixed(2)} Gwei` : "Loading..."}
      </span>
    </p>
    <p className="text-sm text-gray-500 pt-2">
      Last Updated:{" "}
      <span className="font-mono">
        {data?.timestamp
          ? new Date(data.timestamp).toLocaleTimeString()
          : "-"}
      </span>
    </p>
  </div>
</div>


            ))}
        </div>
    );
};

export default ChainStatus;
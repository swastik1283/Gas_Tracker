'use client';
import React, { useEffect } from 'react';
import { startUniswapPriceListener } from '../utils/uniswapPriceListener';
import useGasStore from '../store/useGasStore';

const LiveEthUsdPrice = () => {
  const price = useGasStore((state) => state.ethUsdPrice);

  useEffect(() => {
    startUniswapPriceListener(); // ✅ No arguments needed
  }, []);

  return (
    <div className="text-white text-xl font-bold">
      {price ? `ETH/USD: $${price.toFixed(2)}` : 'Loading price...'}
    </div>
  );
};

export default LiveEthUsdPrice;

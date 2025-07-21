'use client';
import React, { useEffect } from 'react';
import { startUniswapPriceListener } from '../utils/pricelistener.js';
import useGasStore from '../store/useGasStore';

const LiveEthUsdPrice = () => {
  const price = useGasStore((state) => state.ethUsdPrice);

  useEffect(() => {
    startUniswapPriceListener();
  }, []);

  // 👇 Log price when it updates
  useEffect(() => {
    if (price) {
      console.log('ETH/USD updated:', price);
    }
  }, [price]);

  return (
    <div className="text-white text-xl font-bold">
      {price ? `ETH/USD: $${price}` : 'Loading price...'}
    </div>
  );
};

export default LiveEthUsdPrice;

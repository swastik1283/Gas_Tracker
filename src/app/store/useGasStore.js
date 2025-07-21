import { create } from 'zustand';

const useGasStore = create((set) => ({
  mode: 'live', // 'live' | 'simulation'
  selectedchain: 'ethereum',
  ethUsdPrice: null,

  setEthUsdPrice: (price) =>
    set(() => ({
      ethUsdPrice: price,
    })),

  setselectedchain: (chain) =>
    set(() => ({
      selectedchain: ['ethereum', 'polygon', 'arbitrum'].includes(chain)
        ? chain
        : 'ethereum',
    })),

  gasdata: {
    ethereum: null,
    polygon: null,
    arbitrum: null,
  },

  candles: {
    ethereum: [],
    polygon: [],
    arbitrum: [],
  },

  priceBuffer: {
    ethereum: [],
    polygon: [],
    arbitrum: [],
  },

  updateGas: (chain, data) =>
    set((state) => ({
      gasdata: {
        ...state.gasdata,
        [chain]: data,
      },
    })),

  addCandle: (chain, candle) =>
    set((state) => ({
      candles: {
        ...state.candles,
        [chain]: [...(state.candles[chain] || []), candle],
      },
    })),

  addPriceToBuffer: (chain, price) =>
    set((state) => ({
      priceBuffer: {
        ...state.priceBuffer,
        [chain]: [...(state.priceBuffer[chain] || []), price],
      },
    })),

  resetPriceBuffer: (chain) =>
    set((state) => ({
      priceBuffer: {
        ...state.priceBuffer,
        [chain]: [],
      },
    })),

  setMode: (mode) => set(() => ({ mode })),
}));

export default useGasStore;

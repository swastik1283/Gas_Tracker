import { create } from 'zustand';

const supportedChains = ['ethereum', 'polygon', 'arbitrum'];

const useGasStore = create((set, get) => ({
  // Core state
  mode: 'live',
  selectedchain: 'ethereum',
  ethUsdPrice: null,

  // Chain-specific state
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

  // Wallet simulation
  wallet: {
    balanceEth: 1.0,
    balanceUsd: null,
    gasUsed: null,
  },

  // ========= Setters & Updaters =========

  setethUsdPrice: (price) => set({ ethUsdPrice: price }),

  setselectedchain: (chain) =>
    set({
      selectedchain: supportedChains.includes(chain) ? chain : 'ethereum',
    }),

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
        [chain]: [...state.candles[chain], candle],
      },
    })),

  addPriceToBuffer: (chain, price) =>
    set((state) => ({
      priceBuffer: {
        ...state.priceBuffer,
        [chain]: [...state.priceBuffer[chain], price],
      },
    })),

  resetPriceBuffer: (chain) =>
    set((state) => ({
      priceBuffer: {
        ...state.priceBuffer,
        [chain]: [],
      },
    })),

  updateWalletBalance: (ethAmount) =>
    set((state) => {
      const newBalance = state.wallet.balanceEth - ethAmount;
      return {
        wallet: {
          ...state.wallet,
          balanceEth: newBalance < 0 ? 0 : newBalance,
        },
      };
    }),

  setGasUsed: (gasUsed) =>
    set((state) => ({
      wallet: {
        ...state.wallet,
        gasUsed,
      },
    })),

  setMode: (mode) => set({ mode }),

  // ========= Utility =========

  clearAllState: () =>
    set({
      mode: 'live',
      selectedchain: 'ethereum',
      ethUsdPrice: null,
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
      wallet: {
        balanceEth: 1.0,
        balanceUsd: null,
        gasUsed: null,
      },
    }),

  getUsdBalance: () => {
    const price = get().ethUsdPrice || 0;
    const balance = get().wallet.balanceEth;
    return balance * price;
  },
}));

export default useGasStore;

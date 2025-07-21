const CHAIN = {
  ethereum: {
    name: "Ethereum",
    rpc: "https://eth-mainnet.g.alchemy.com/v2/qIm2v2VNvZ9RVNIIujBALURIF_ZZ0jtJ",
    wsUrl: "wss://eth-mainnet.g.alchemy.com/v2/qIm2v2VNvZ9RVNIIujBALURIF_ZZ0jtJ",
    chainId: 1,
  },
  polygon: {
    name: "Polygon",
    rpc: "https://polygon-mainnet.g.alchemy.com/v2/Ke5HfRMowr06T9PTupOC6",
    wsUrl: "wss://polygon-mainnet.g.alchemy.com/v2/Ke5HfRMowr06T9PTupOC6",
    chainId: 137,
  },
  arbitrum: {
    name: "Arbitrum",
    rpc: "https://arb-mainnet.g.alchemy.com/v2/mAZ6X3GfOMc_mWaWrmBHT",
    wsUrl: "wss://arb-mainnet.g.alchemy.com/v2/mAZ6X3GfOMc_mWaWrmBHT",
    chainId: 42161,
  },
};

export default CHAIN;

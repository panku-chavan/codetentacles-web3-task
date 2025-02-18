import "./App.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import ConnectToWallet from "./components/ConnectToWallet";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const projectId = "YOUR_PROJECT_ID";

const wyzthTestnet = {
  id: 309,
  name: "Wyzth Testnet",
  network: "wyzth-testnet",
  nativeCurrency: {
    name: "Wyzth",
    symbol: "WYZ",
    decimals: 18,
  },
  rpcUrls: {
    default: "https://rpc-testnet3.wyzthchain.org",
  },
};

const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: projectId,
  chains: [mainnet, polygon, optimism, arbitrum, base, wyzthTestnet],
  ssr: true,
});

const queryClient = new QueryClient();

const App = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()}>
          <h2>Web3 Integration with RainbowKit</h2>
          <div className="container">
          <ConnectToWallet />

          </div>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;

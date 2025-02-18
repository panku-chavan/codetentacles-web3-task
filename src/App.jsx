import "./App.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import ConnectToWallet from "./components/ConnectToWallet";


const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "94556f45ecceb6a915fcf1cbf322415b",
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

function App() {
  return <>
  <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <ConnectToWallet/>          
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </>;
}

export default App;

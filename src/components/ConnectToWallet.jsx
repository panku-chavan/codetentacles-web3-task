import { ConnectButton } from '@rainbow-me/rainbowkit';
import React, { useEffect, useState } from 'react';
import { useAccount, useSwitchChain, useChainId } from 'wagmi';
import { toast } from 'react-toastify';

const ConnectToWallet = () => {
  const { address, isConnected } = useAccount();
  const { switchChain } = useSwitchChain();
  const chainId = useChainId();
  const [previousIsConnected, setPreviousIsConnected] = useState(null);

  const addCustomNetwork = async () => {
    const chainIdHex = '0x135'; // Ensure this matches TARGET_CHAIN_ID
    const networkData = {
      chainId: chainIdHex,
      chainName: 'Wyzth Testnet',
      nativeCurrency: {
        name: 'Wyzth',
        symbol: 'WYZ',
        decimals: 18,
      },
      rpcUrls: ['https://rpc-testnet3.wyzthchain.org'],
      blockExplorerUrls: ['https://explorer.wyzthchain.org'],
    };

    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [networkData],
      });
      console.log('Wyzth Testnet added successfully');
      toast.success('Wyzth Testnet added successfully!');
      return true; // Network added successfully
    } catch (error) {
      if (error.code === -32000) {
        console.error('Invalid input. The network might already be added with the same chain ID.', error);
        toast.info('The network is already added. Switching to it.');
        return true; // Assume the network is already added
      } else {
        console.error('Failed to add Wyzth Testnet:', error);
        toast.error(error.message);
        return false; // Indicate failure
      }
    }
  };

  useEffect(() => {
    if (previousIsConnected !== null && previousIsConnected !== isConnected) {
      if (isConnected) {
        console.log('Wallet connected with address:', address);
        console.log('Current chain ID:', chainId);
        console.log('Timestamp:', new Date().toISOString());
        toast.success(`Connected with chain ID: ${chainId}`);

        // Add custom network programmatically if not already added
        if (chainId !== 309) {
          addCustomNetwork().then((isAdded) => {
            // After adding the custom network, switch to it
            if (isAdded) {
              switchChain(309);
            }
          });
        }
      } else {
        console.log('Wallet disconnected');
        console.log('Timestamp:', new Date().toISOString());
        toast.error('Wallet disconnected');
      }
    }

    setPreviousIsConnected(isConnected);
  }, [isConnected, address, chainId, previousIsConnected]);

  return (
    <>
      <ConnectButton />
    </>
  );
};

export default ConnectToWallet;

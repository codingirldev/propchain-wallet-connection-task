import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Extend Window interface to include ethereum
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (...args: any[]) => void) => void;
      removeListener: (event: string, callback: (...args: any[]) => void) => void;
      selectedAddress?: string;
      chainId?: string;
    };
  }
}

interface WalletContextType {
  isConnected: boolean;
  account: string | null;
  chainId: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isLoading: boolean;
  error: string | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    return typeof window !== 'undefined' && window.ethereum && window.ethereum.isMetaMask;
  };

  // Get current account and chain ID
  const getAccountAndChainId = async () => {
    if (!isMetaMaskInstalled()) return;

    try {
      const accounts = await window.ethereum!.request({ method: 'eth_accounts' });
      const chainId = await window.ethereum!.request({ method: 'eth_chainId' });
      
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setChainId(chainId);
        setIsConnected(true);
      } else {
        setAccount(null);
        setChainId(null);
        setIsConnected(false);
      }
    } catch (err) {
      console.error('Error getting account:', err);
      setError('Failed to get account information');
    }
  };

  // Connect wallet
  const connectWallet = async () => {
    if (!isMetaMaskInstalled()) {
      setError('MetaMask is not installed. Please install MetaMask to continue.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const accounts = await window.ethereum!.request({ 
        method: 'eth_requestAccounts' 
      });
      
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setIsConnected(true);
        
        // Get chain ID
        const chainId = await window.ethereum!.request({ method: 'eth_chainId' });
        setChainId(chainId);
      }
    } catch (err: any) {
      console.error('Error connecting wallet:', err);
      if (err.code === 4001) {
        setError('User rejected the connection request');
      } else {
        setError('Failed to connect wallet. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setAccount(null);
    setChainId(null);
    setIsConnected(false);
    setError(null);
  };

  // Handle account changes
  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      disconnectWallet();
    } else {
      setAccount(accounts[0]);
      setIsConnected(true);
    }
  };

  // Handle chain changes
  const handleChainChanged = (newChainId: string) => {
    setChainId(newChainId);
    // Optionally reload the page or show a message about chain change
    window.location.reload();
  };

  // Set up event listeners
  useEffect(() => {
    if (!isMetaMaskInstalled()) return;

    // Get initial state
    getAccountAndChainId();

    // Set up event listeners
    window.ethereum!.on('accountsChanged', handleAccountsChanged);
    window.ethereum!.on('chainChanged', handleChainChanged);

    // Cleanup
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);

  const value: WalletContextType = {
    isConnected,
    account,
    chainId,
    connectWallet,
    disconnectWallet,
    isLoading,
    error,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

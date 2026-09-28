import { createContext, useContext, useState, useEffect } from 'react';
import { StellarWalletsKit } from '@creit.tech/stellar-wallets-kit/sdk';
import { defaultModules } from '@creit.tech/stellar-wallets-kit/modules/utils';

const WalletContext = createContext();

let isKitInitialized = false;
let modalContainer = null;

export function WalletProvider({ children }) {
  const [publicKey, setPublicKey] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize the kit once on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && !isKitInitialized) {
      try {
        StellarWalletsKit.init({
          modules: defaultModules(),
        });
        isKitInitialized = true;
        setIsInitialized(true);
        console.log('[WalletContext] Stellar Wallets Kit initialized');
      } catch (error) {
        console.error('[WalletContext] Failed to initialize kit:', error);
      }
    }
  }, []);

  const connectWallet = async () => {
    if (!isKitInitialized) {
      throw new Error('Wallet Kit not initialized');
    }

    try {
      console.log('[WalletContext] Opening wallet modal...');

      // Check if already connected (from previous session)
      try {
        const { address } = await StellarWalletsKit.getAddress();
        if (address) {
          console.log('[WalletContext] Already connected to:', address);
          setPublicKey(address);
          setIsConnected(true);
          return; // Already connected, no need to show modal
        }
      } catch (err) {
        // Not connected, proceed with modal
        console.log('[WalletContext] No previous connection, showing modal');
      }

      // Create a hidden container for the button (we'll trigger it programmatically)
      if (!modalContainer) {
        modalContainer = document.createElement('div');
        modalContainer.style.position = 'fixed';
        modalContainer.style.top = '-9999px';
        modalContainer.style.left = '-9999px';
        modalContainer.style.visibility = 'hidden';
        document.body.appendChild(modalContainer);

        // Create the button but keep it hidden
        StellarWalletsKit.createButton(modalContainer);
      }

      // Find and click the button programmatically to open the modal
      const button = modalContainer.querySelector('button');
      if (button) {
        button.click();
      }

      // Wait for user to select a wallet and connect
      const checkConnection = setInterval(async () => {
        try {
          const { address } = await StellarWalletsKit.getAddress();
          if (address) {
            console.log('[WalletContext] Connected address:', address);
            setPublicKey(address);
            setIsConnected(true);
            clearInterval(checkConnection);
          }
        } catch (err) {
          // Not connected yet, keep checking
        }
      }, 500);

      // Timeout after 60 seconds
      setTimeout(() => {
        clearInterval(checkConnection);
      }, 60000);
    } catch (error) {
      console.error('[WalletContext] Failed to connect wallet:', error);
      throw error;
    }
  };

  const signTransaction = async (xdr) => {
    if (!isKitInitialized || !publicKey) {
      throw new Error('Wallet not connected');
    }

    try {
      console.log('[WalletContext] Signing transaction...');
      const { signedTxXdr } = await StellarWalletsKit.signTransaction(xdr, {
        networkPassphrase: 'Test SDF Network ; September 2015',
        address: publicKey,
      });
      console.log('[WalletContext] Transaction signed');
      return signedTxXdr;
    } catch (error) {
      console.error('[WalletContext] Failed to sign transaction:', error);
      throw error;
    }
  };

  const disconnect = () => {
    setPublicKey(null);
    setIsConnected(false);
    console.log('[WalletContext] Disconnected');
  };

  return (
    <WalletContext.Provider
      value={{
        publicKey,
        isConnected,
        isInitialized,
        connectWallet,
        signTransaction,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

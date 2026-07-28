import React, { useState, useEffect } from 'react';
import { Wallet, ExternalLink, Copy, CheckCircle, AlertCircle } from 'lucide-react';
import blockchainService, { BLOCKCHAIN_CONFIG } from '../services/blockchain';
import FlowerLoader from './FlowerLoader';

const WalletConnect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [balance, setBalance] = useState('0');
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Check if already connected on component mount
    checkConnection();

    // Set up event listeners
    blockchainService.setupEventListeners(handleBlockchainEvent);
  }, []);

  const checkConnection = async () => {
    try {
      const connected = await blockchainService.initialize();
      if (connected) {
        const address = await blockchainService.getWalletAddress();
        const walletBalance = await blockchainService.getBalance();

        setIsConnected(true);
        setWalletAddress(address);
        setBalance(walletBalance);
      }
    } catch (error) {
      console.error('Connection check failed:', error);
    }
  };

  const handleBlockchainEvent = (eventType, data) => {
    console.log('Blockchain event:', eventType, data);

    // Update balance when tokens are awarded
    if (eventType === 'tokens_awarded' && data.to.toLowerCase() === walletAddress.toLowerCase()) {
      updateBalance();
    }
  };

  const updateBalance = async () => {
    if (walletAddress) {
      const newBalance = await blockchainService.getBalance();
      setBalance(newBalance);
    }
  };

  const connectWallet = async () => {
    setIsConnecting(true);
    setError('');

    try {
      const connected = await blockchainService.connectWallet();
      if (connected) {
        const address = await blockchainService.getWalletAddress();
        const walletBalance = await blockchainService.getBalance();

        setIsConnected(true);
        setWalletAddress(address);
        setBalance(walletBalance);
      } else {
        setError('Failed to connect wallet. Please make sure MetaMask is installed.');
      }
    } catch (error) {
      setError('Failed to connect wallet: ' + error.message);
    } finally {
      setIsConnecting(false);
    }
  };

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy address:', error);
    }
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const openBlockExplorer = () => {
    if (walletAddress) {
      window.open(`${BLOCKCHAIN_CONFIG.BLOCK_EXPLORER}address/${walletAddress}`, '_blank');
    }
  };

  if (isConnected) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <span className="font-medium text-gray-900 dark:text-slate-100">Wallet Connected</span>
          </div>
        </div>

        <div className="space-y-3">
          {/* Wallet Address */}
          <div>
            <label className="block text-sm text-gray-600 dark:text-slate-400 mb-1">Wallet Address</label>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-gray-50 dark:bg-slate-900 rounded-lg px-3 py-2 text-sm font-mono text-gray-800 dark:text-slate-200">
                {formatAddress(walletAddress)}
              </div>
              <button
                onClick={copyAddress}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
                title="Copy address"
              >
                {copied ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </button>
              <button
                onClick={openBlockExplorer}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
                title="View on block explorer"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Balance */}
          <div>
            <label className="block text-sm text-gray-600 dark:text-slate-400 mb-1">Balance</label>
            <div className="bg-gray-50 dark:bg-slate-900 rounded-lg px-3 py-2">
              <span className="text-lg font-semibold text-gray-900 dark:text-slate-100">
                {parseFloat(balance).toFixed(4)} {BLOCKCHAIN_CONFIG.CURRENCY_SYMBOL}
              </span>
            </div>
          </div>

          {/* Network Info */}
          <div className="pt-2 border-t border-gray-200 dark:border-slate-700">
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-slate-400">
              <span>Network:</span>
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Polygon Mumbai</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <Wallet className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-2">
          Connect Your Wallet
        </h3>

        <p className="text-gray-600 dark:text-slate-400 text-sm mb-6">
          Connect your Web3 wallet to access blockchain features like skill certification and token rewards.
        </p>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0" />
              <p className="text-red-800 dark:text-red-300 text-sm">{error}</p>
            </div>
          </div>
        )}

        <button
          onClick={connectWallet}
          disabled={isConnecting}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isConnecting ? (
            <>
              <FlowerLoader size="small" color="#ffffff" />
              <span>Connecting...</span>
            </>
          ) : (
            <>
              <Wallet className="w-4 h-4" />
              <span>Connect Wallet</span>
            </>
          )}
        </button>

        <div className="mt-4 text-xs text-gray-500 dark:text-slate-400">
          <p>Supported wallets: MetaMask, WalletConnect, Coinbase Wallet</p>
        </div>
      </div>
    </div>
  );
};

export default WalletConnect;

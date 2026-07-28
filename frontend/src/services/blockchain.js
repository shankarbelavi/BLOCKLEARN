import { ethers } from 'ethers';

// Blockchain configuration
const BLOCKCHAIN_CONFIG = {
  // For development, we'll use a local testnet or Polygon Mumbai testnet
  CHAIN_ID: 80001, // Polygon Mumbai Testnet
  RPC_URL: 'https://rpc-mumbai.maticvigil.com/',
  CURRENCY_SYMBOL: 'MATIC',
  BLOCK_EXPLORER: 'https://mumbai.polygonscan.com/',

  // Smart contract addresses (to be deployed)
  SKILL_SWAP_CONTRACT: '0x0000000000000000000000000000000000000000', // TODO: Deploy contract
  TOKEN_CONTRACT: '0x0000000000000000000000000000000000000000', // TODO: Deploy token contract

  // Contract ABIs (will be added after contract deployment)
  SKILL_SWAP_ABI: [], // TODO: Add ABI after deployment
  TOKEN_ABI: [], // TODO: Add ABI after deployment
};

class BlockchainService {
  constructor() {
    this.provider = null;
    this.signer = null;
    this.skillSwapContract = null;
    this.tokenContract = null;
    this.connected = false;
  }

  // Initialize Web3 provider
  async initialize() {
    try {
      // Check if MetaMask or other Web3 wallet is available
      if (window.ethereum) {
        this.provider = new ethers.providers.Web3Provider(window.ethereum);

        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        this.signer = this.provider.getSigner();
        this.connected = true;

        // Initialize contracts
        await this.initializeContracts();

        return true;
      } else {
        console.warn('No Web3 wallet detected. Please install MetaMask.');
        return false;
      }
    } catch (error) {
      console.error('Failed to initialize blockchain service:', error);
      return false;
    }
  }

  // Initialize smart contracts
  async initializeContracts() {
    try {
      if (BLOCKCHAIN_CONFIG.SKILL_SWAP_ABI.length > 0) {
        this.skillSwapContract = new ethers.Contract(
          BLOCKCHAIN_CONFIG.SKILL_SWAP_CONTRACT,
          BLOCKCHAIN_CONFIG.SKILL_SWAP_ABI,
          this.signer
        );
      }

      if (BLOCKCHAIN_CONFIG.TOKEN_ABI.length > 0) {
        this.tokenContract = new ethers.Contract(
          BLOCKCHAIN_CONFIG.TOKEN_CONTRACT,
          BLOCKCHAIN_CONFIG.TOKEN_ABI,
          this.signer
        );
      }
    } catch (error) {
      console.error('Failed to initialize contracts:', error);
    }
  }

  // Get user's wallet address
  async getWalletAddress() {
    if (!this.connected) return null;

    try {
      const address = await this.signer.getAddress();
      return address;
    } catch (error) {
      console.error('Failed to get wallet address:', error);
      return null;
    }
  }

  // Get wallet balance
  async getBalance() {
    if (!this.connected) return null;

    try {
      const address = await this.getWalletAddress();
      const balance = await this.provider.getBalance(address);
      return ethers.utils.formatEther(balance);
    } catch (error) {
      console.error('Failed to get balance:', error);
      return null;
    }
  }

  // Connect wallet
  async connectWallet() {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        await this.initialize();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      return false;
    }
  }

  // Issue skill certificate
  async issueSkillCertificate(studentAddress, skillName, issuerName, metadata = '') {
    if (!this.connected || !this.skillSwapContract) {
      throw new Error('Blockchain not connected or contract not initialized');
    }

    try {
      const tx = await this.skillSwapContract.issueCertificate(
        studentAddress,
        skillName,
        issuerName,
        metadata
      );

      await tx.wait();
      return tx.hash;
    } catch (error) {
      console.error('Failed to issue skill certificate:', error);
      throw error;
    }
  }

  // Verify skill certificate
  async verifySkillCertificate(studentAddress, skillName) {
    if (!this.connected || !this.skillSwapContract) {
      throw new Error('Blockchain not connected or contract not initialized');
    }

    try {
      const isValid = await this.skillSwapContract.verifyCertificate(studentAddress, skillName);
      return isValid;
    } catch (error) {
      console.error('Failed to verify skill certificate:', error);
      return false;
    }
  }

  // Award tokens for skill completion
  async awardTokens(recipientAddress, amount, reason) {
    if (!this.connected || !this.tokenContract) {
      throw new Error('Token contract not initialized');
    }

    try {
      const tx = await this.tokenContract.transfer(recipientAddress, amount);
      await tx.wait();

      // Record the token award in skill swap contract
      if (this.skillSwapContract) {
        await this.skillSwapContract.recordTokenAward(recipientAddress, amount, reason);
      }

      return tx.hash;
    } catch (error) {
      console.error('Failed to award tokens:', error);
      throw error;
    }
  }

  // Get skill certificates for a user
  async getUserCertificates(userAddress) {
    if (!this.connected || !this.skillSwapContract) {
      return [];
    }

    try {
      const certificates = await this.skillSwapContract.getUserCertificates(userAddress);
      return certificates.map(cert => ({
        skillName: cert.skillName,
        issuerName: cert.issuerName,
        issuedAt: new Date(cert.issuedAt * 1000).toISOString(),
        metadata: cert.metadata,
        isValid: cert.isValid
      }));
    } catch (error) {
      console.error('Failed to get user certificates:', error);
      return [];
    }
  }

  // Get token balance
  async getTokenBalance(userAddress) {
    if (!this.connected || !this.tokenContract) {
      return '0';
    }

    try {
      const balance = await this.tokenContract.balanceOf(userAddress);
      return ethers.utils.formatEther(balance);
    } catch (error) {
      console.error('Failed to get token balance:', error);
      return '0';
    }
  }

  // Listen for blockchain events
  setupEventListeners(callback) {
    if (!this.skillSwapContract) return;

    // Listen for skill certificate issued events
    this.skillSwapContract.on('SkillCertificateIssued', (student, skill, issuer, event) => {
      callback('certificate_issued', { student, skill, issuer, transactionHash: event.transactionHash });
    });

    // Listen for token awards
    if (this.tokenContract) {
      this.tokenContract.on('Transfer', (from, to, amount, event) => {
        callback('tokens_awarded', { from, to, amount: ethers.utils.formatEther(amount), transactionHash: event.transactionHash });
      });
    }
  }
}

// Create singleton instance
const blockchainService = new BlockchainService();

// Export for use in components
export default blockchainService;
export { BLOCKCHAIN_CONFIG };

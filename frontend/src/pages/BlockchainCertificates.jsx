import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Award, Calendar, ExternalLink, Copy, CheckCircle, Clock, Star, TrendingUp } from 'lucide-react';
import blockchainService from '../services/blockchain';
import FlowerLoader from '../components/FlowerLoader';

const BlockchainCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [tokenBalance, setTokenBalance] = useState('0');
  const [reputation, setReputation] = useState(0);
  const [loading, setLoading] = useState(true);
  const [walletConnected, setWalletConnected] = useState(false);

  useEffect(() => {
    loadBlockchainData();
  }, []);

  const loadBlockchainData = async () => {
    setLoading(true);
    try {
      // Check if wallet is connected
      const connected = await blockchainService.initialize();
      setWalletConnected(connected);

      if (connected) {
        const walletAddress = await blockchainService.getWalletAddress();

        // Load certificates
        const userCerts = await blockchainService.getUserCertificates(walletAddress);
        setCertificates(userCerts);

        // Load token balance
        const balance = await blockchainService.getTokenBalance(walletAddress);
        setTokenBalance(balance);

        // Load reputation (this would come from the smart contract)
        const rep = await blockchainService.skillSwapContract?.getUserReputation(walletAddress) || 0;
        setReputation(rep.toString());
      }
    } catch (error) {
      console.error('Failed to load blockchain data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCertificateIcon = (skillName) => {
    const skillIcons = {
      'programming': '💻',
      'design': '🎨',
      'language': '🌐',
      'music': '🎵',
      'math': '📐',
      'science': '🔬'
    };

    const skillKey = skillName.toLowerCase();
    for (const [key, icon] of Object.entries(skillIcons)) {
      if (skillKey.includes(key)) return icon;
    }
    return '🏆';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <FlowerLoader size="large" color="#5c3d99" showText={true} text="Loading blockchain data..." />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-100">
                ← Dashboard
              </Link>
              <div className="text-gray-300 dark:text-slate-600">|</div>
              <span className="text-gray-900 dark:text-slate-100 font-medium">Blockchain Certificates</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-slate-100 mb-4">
            🏆 Blockchain Certificates
          </h1>
          <p className="text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
            View your blockchain-verified skill certificates and achievements
          </p>
        </div>

        {!walletConnected ? (
          /* Wallet Not Connected */
          <div className="max-w-2xl mx-auto">
            <div className="card text-center">
              <div className="text-6xl mb-6">🔗</div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-slate-100 mb-4">
                Connect Your Wallet
              </h2>
              <p className="text-gray-600 dark:text-slate-400 mb-8">
                Connect your Web3 wallet to view your blockchain certificates and start earning rewards for skill completion.
              </p>
              <button className="btn-primary px-8 py-3">
                Connect Wallet to Continue
              </button>
            </div>
          </div>
        ) : (
          /* Blockchain Dashboard */
          <div className="space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Token Balance */}
              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-slate-400">Token Balance</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                      {parseFloat(tokenBalance).toFixed(2)} BLT
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </div>

              {/* Certificates Earned */}
              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-slate-400">Certificates</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                      {certificates.length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </div>

              {/* Reputation Score */}
              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-slate-400">Reputation</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                      {reputation}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Certificates List */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-100 mb-6">
                Your Skill Certificates
              </h2>

              {certificates.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">📜</div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-2">
                    No Certificates Yet
                  </h3>
                  <p className="text-gray-600 dark:text-slate-400 mb-6">
                    Complete skill-swapping sessions to earn blockchain certificates!
                  </p>
                  <Link to="/skills" className="btn-primary">
                    Start Learning Skills
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {certificates.map((cert, index) => (
                    <div key={index} className="border border-gray-200 dark:border-slate-700 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-lg font-bold">
                            {getCertificateIcon(cert.skillName)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100">
                                {cert.skillName}
                              </h3>
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                cert.isValid
                                  ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                                  : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                              }`}>
                                {cert.isValid ? 'Verified' : 'Revoked'}
                              </span>
                            </div>
                            <p className="text-gray-600 dark:text-slate-400 text-sm mb-2">
                              Issued by: <span className="font-medium">{cert.issuerName}</span>
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-slate-400">
                              <span className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {formatDate(cert.issuedAt)}
                              </span>
                              <span className="flex items-center">
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Blockchain Verified
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">
                            <ExternalLink className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Token Rewards Section */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-100 mb-6">
                💰 Token Rewards
              </h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="text-3xl mb-2">🎓</div>
                  <h3 className="font-semibold text-green-800 dark:text-green-300 mb-1">Skill Completion</h3>
                  <p className="text-sm text-green-600 dark:text-green-400">10 BLT tokens</p>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="text-3xl mb-2">👨‍🏫</div>
                  <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">Teaching Session</h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400">5 BLT tokens</p>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                  <div className="text-3xl mb-2">🏆</div>
                  <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-1">Milestone Bonus</h3>
                  <p className="text-sm text-purple-600 dark:text-purple-400">50 BLT tokens</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-slate-100 mb-2">How to Earn Tokens</h4>
                <ul className="text-sm text-gray-600 dark:text-slate-400 space-y-1">
                  <li>• Complete skill-swapping sessions to earn 10 BLT</li>
                  <li>• Teach others your skills to earn 5 BLT</li>
                  <li>• Reach milestones for bonus rewards up to 50 BLT</li>
                  <li>• Build your reputation through consistent participation</li>
                </ul>
              </div>
            </div>

            {/* Call to Action */}
            <div className="card text-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-100 mb-4">
                Ready to Earn More Certificates?
              </h2>
              <p className="text-gray-600 dark:text-slate-400 mb-6">
                Start skill-swapping sessions to earn blockchain certificates and build your verified skill portfolio.
              </p>
              <div className="flex justify-center space-x-4">
                <Link to="/skills" className="btn-primary">
                  Browse Skills
                </Link>
                <Link to="/match" className="btn-outline">
                  Find Learning Partners
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default BlockchainCertificates;

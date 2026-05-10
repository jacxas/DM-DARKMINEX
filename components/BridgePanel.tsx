'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightLeft, Globe, ChevronDown } from 'lucide-react';
import TransactionModal, { TransactionStatus } from './TransactionModal';

const CHAINS = [
  { id: 'eth', name: 'Ethereum', icon: '💎', color: '#627EEA' },
  { id: 'bsc', name: 'Binance Smart Chain', icon: '🟡', color: '#F3BA2F' },
  { id: 'poly', name: 'Polygon', icon: '🟣', color: '#8247E5' },
  { id: 'avax', name: 'Avalanche', icon: '🔺', color: '#E84142' },
  { id: 'arb', name: 'Arbitrum', icon: '🔵', color: '#28A0F0' },
];

export default function BridgePanel() {
  const [sourceChain, setSourceChain] = useState(CHAINS[0]);
  const [destChain, setDestChain] = useState(CHAINS[2]);
  const [amount, setAmount] = useState('');

  // Fee calculation logic
  const getBaseFee = (chainId: string) => {
    const fees: Record<string, number> = {
      eth: 25.45,
      bsc: 2.10,
      poly: 0.55,
      avax: 4.20,
      arb: 1.85,
    };
    return fees[chainId] || 1.0;
  };

  const estimatedFee = amount ? (getBaseFee(sourceChain.id) + (parseFloat(amount) * 0.001)) : 0;
  const receiveAmount = amount ? Math.max(0, parseFloat(amount) - estimatedFee) : 0;

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState<TransactionStatus>('idle');
  const [modalError, setModalError] = useState("");
  const [txHash, setTxHash] = useState("");

  const swapChains = () => {
    setSourceChain(destChain);
    setDestChain(sourceChain);
  };

  const handleBridge = () => {
    if (!amount || parseFloat(amount) <= 0) return;
    setModalStatus('confirming');
    setIsModalOpen(true);
  };

  const confirmBridge = async () => {
    setModalStatus('processing');
    
    // Simulate complex cross-chain bridging delay
    setTimeout(() => {
      // 85% success rate for bridging simulations
      if (Math.random() > 0.15) {
        setTxHash("0x" + Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join(""));
        setModalStatus('success');
        setAmount("");
      } else {
        setModalError("Bridge relay timeout. The assets were not deducted. Please try again or select a different relay.");
        setModalStatus('error');
      }
    }, 3000);
  };

  return (
    <div className="bg-zinc-200 dark:bg-zinc-950 p-1 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl max-w-xl mx-auto overflow-hidden transition-colors">
      <div className="bg-white dark:bg-gradient-to-br dark:from-zinc-900 dark:to-black p-8 rounded-[22px] border border-zinc-100 dark:border-white/5">
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-cyan-600 dark:text-cyan-500 font-mono text-[10px] uppercase tracking-[0.2em] mb-1">Cross-Chain Protocol</p>
            <h2 className="text-4xl text-zinc-900 dark:text-white font-black tracking-tighter">
              BRIDGE <span className="text-cyan-600 dark:text-cyan-400">DM</span>
            </h2>
          </div>
          <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center border border-cyan-500/20">
            <Globe className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
          </div>
        </div>

        <div className="space-y-6">
          {/* Source Selection */}
          <div className="relative">
            <label className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2 block px-2">From Network</label>
            <div className="bg-zinc-50 dark:bg-black/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 flex items-center justify-between hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 flex items-center justify-center text-xl border border-zinc-200 dark:border-zinc-800 shadow-inner">
                  {sourceChain.icon}
                </div>
                <div>
                  <p className="text-zinc-900 dark:text-white font-bold leading-none mb-1">{sourceChain.name}</p>
                  <p className="text-zinc-500 dark:text-zinc-600 font-mono text-[10px]">CONNECTED</p>
                </div>
              </div>
              <select 
                value={sourceChain.id}
                onChange={(e) => setSourceChain(CHAINS.find(c => c.id === e.target.value) || CHAINS[0])}
                className="absolute inset-0 opacity-0 cursor-pointer w-full"
              >
                {CHAINS.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <ChevronDown className="w-5 h-5 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center -my-3 relative z-10">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={swapChains}
              className="w-10 h-10 bg-cyan-600 dark:bg-cyan-400 text-white dark:text-black rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.3)] border-4 border-white dark:border-black group cursor-pointer"
            >
              <ArrowRightLeft className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Destination Selection */}
          <div className="relative">
            <label className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2 block px-2">To Network</label>
            <div className="bg-zinc-50 dark:bg-black/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 flex items-center justify-between hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 flex items-center justify-center text-xl border border-zinc-200 dark:border-zinc-800 shadow-inner">
                  {destChain.icon}
                </div>
                <div>
                  <p className="text-zinc-900 dark:text-white font-bold leading-none mb-1">{destChain.name}</p>
                  <p className="text-zinc-500 dark:text-zinc-600 font-mono text-[10px]">VERIFIED GATEWAY</p>
                </div>
              </div>
              <select 
                value={destChain.id}
                onChange={(e) => setDestChain(CHAINS.find(c => c.id === e.target.value) || CHAINS[2])}
                className="absolute inset-0 opacity-0 cursor-pointer w-full"
              >
                {CHAINS.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <ChevronDown className="w-5 h-5 text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors" />
            </div>
          </div>

          {/* Amount Input */}
          <div className="space-y-4">
            <div className="bg-zinc-100 dark:bg-black/80 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <label className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">Amount to Transfer</label>
                <span 
                  onClick={() => setAmount("45230.00")}
                  className="text-[10px] font-mono text-cyan-600 dark:text-cyan-500 cursor-pointer hover:text-cyan-700 dark:hover:text-cyan-400 tracking-widest"
                >
                  MAX: 45,230.00
                </span>
              </div>
              <div className="flex items-end gap-4">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="bg-transparent text-4xl w-full font-bold outline-none text-zinc-900 dark:text-white placeholder-zinc-300 dark:placeholder-zinc-800"
                />
                <span className="text-xl font-black text-cyan-600 dark:text-cyan-400 mb-2">DM</span>
              </div>
            </div>

            {/* Fee Breakdown */}
            <div className="px-4 space-y-2">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">Estimated Gas Fee</span>
                <span className="text-zinc-600 dark:text-zinc-400">{estimatedFee.toFixed(2)} DM</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">Bridge Protocol Fee (0.1%)</span>
                <span className="text-zinc-600 dark:text-zinc-400">{(parseFloat(amount || "0") * 0.001).toFixed(2)} DM</span>
              </div>
              <div className="pt-2 border-t border-zinc-100 dark:border-zinc-900 flex justify-between items-center">
                <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-tighter">You will receive</span>
                <span className="text-lg font-black text-zinc-900 dark:text-white">{receiveAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} DM</span>
              </div>
            </div>
          </div>

          {/* Bridge Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleBridge}
            disabled={!amount || parseFloat(amount) <= estimatedFee}
            className="w-full bg-cyan-400 text-black py-5 rounded-2xl font-black text-lg uppercase tracking-tighter shadow-[0_0_30px_rgba(34,211,238,0.2)] hover:shadow-[0_0_40px_rgba(34,211,238,0.4)] transition-all flex items-center justify-center gap-3 overflow-hidden group relative disabled:opacity-50 disabled:cursor-not-allowed"
          >
            INITIATE SECURE BRIDGE
          </motion.button>
          
          <TransactionModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            status={modalStatus}
            title="Confirm Bridge Transfer"
            description="You are moving assets across the decentralized bridge infrastructure."
            details={[
              { label: "Asset", value: "DM Token" },
              { label: "Source", value: sourceChain.name },
              { label: "Destination", value: destChain.name },
              { label: "Fee", value: `${estimatedFee.toFixed(2)} DM` },
              { label: "Recipient Will Get", value: `${receiveAmount.toFixed(2)} DM` },
            ]}
            onConfirm={confirmBridge}
            error={modalError}
            txHash={txHash}
          />
          
          <p className="text-[10px] font-mono text-zinc-600 text-center uppercase tracking-widest mt-4">
            Estimated Arrival: ~5-10 Minutes • Gas Fee: Connected Wallet
          </p>
        </div>
      </div>
    </div>
  );
}


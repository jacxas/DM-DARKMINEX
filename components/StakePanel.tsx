'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, Landmark, TrendingUp, ShieldCheck, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { ethers } from 'ethers';
import TransactionModal, { TransactionStatus } from './TransactionModal';

export default function StakePanel() {
  const [activeTab, setActiveTab] = useState<'stake' | 'unstake'>('stake');
  const [wallet, setWallet] = useState("");
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState("45,230.00");
  const [stakedBalance, setStakedBalance] = useState("12,000.00");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState<TransactionStatus>('idle');
  const [modalError, setModalError] = useState("");
  const [txHash, setTxHash] = useState("");

  const handleAction = () => {
    if (!amount || parseFloat(amount) <= 0) return;
    setModalStatus('confirming');
    setIsModalOpen(true);
  };

  const confirmAction = async () => {
    setModalStatus('processing');
    
    // Simulate transaction delay
    setTimeout(() => {
      // 90% success rate simulation
      if (Math.random() > 0.1) {
        setTxHash("0x" + Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join(""));
        setModalStatus('success');
        
        // Update balances locally for demo feel
        if (activeTab === 'stake') {
          const numAmount = parseFloat(amount);
          setBalance((parseFloat(balance.replace(/,/g, '')) - numAmount).toLocaleString());
          setStakedBalance((parseFloat(stakedBalance.replace(/,/g, '')) + numAmount).toLocaleString());
        } else {
          const numAmount = parseFloat(amount);
          setStakedBalance((parseFloat(stakedBalance.replace(/,/g, '')) - numAmount).toLocaleString());
          setBalance((parseFloat(balance.replace(/,/g, '')) + numAmount).toLocaleString());
        }
        setAmount("");
      } else {
        setModalError("User denied transaction signature or network timeout.");
        setModalStatus('error');
      }
    }, 2000);
  };

  async function connectWallet() {
    if (typeof window === 'undefined' || !(window as any).ethereum) {
      console.warn("Please install MetaMask");
      return;
    }
    try {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      setWallet(await signer.getAddress());
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    // Check if already connected
    const checkConnection = async () => {
      if (typeof window !== 'undefined' && (window as any).ethereum) {
        const provider = new ethers.BrowserProvider((window as any).ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          setWallet(await accounts[0].getAddress());
        }
      }
    };
    checkConnection();
  }, []);

  return (
    <div className="bg-zinc-200 dark:bg-zinc-950 p-1 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden transition-colors">
      <div className="bg-white dark:bg-gradient-to-br dark:from-zinc-900 dark:to-black p-8 rounded-[22px] border border-zinc-100 dark:border-white/5">
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-green-600 dark:text-green-500 font-mono text-[10px] uppercase tracking-[0.2em] mb-1">Liquidity Protocol</p>
            <h2 className="text-4xl text-zinc-900 dark:text-white font-black tracking-tighter">
              STAKING <span className="text-green-600 dark:text-green-400">VAULT</span>
            </h2>
          </div>
          <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center border border-green-500/20">
            <Landmark className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-4 bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Current APR</p>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-zinc-900 dark:text-white">18.5%</span>
              <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="p-4 bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Pool Security</p>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-zinc-600 dark:text-zinc-300 uppercase">Verified</span>
              <ShieldCheck className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            </div>
          </div>
        </div>

        {!wallet ? (
          <div className="text-center py-10 px-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 border-dashed">
            <Wallet className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-4" />
            <h3 className="text-zinc-900 dark:text-white font-bold mb-2">Connect Your Wallet</h3>
            <p className="text-zinc-500 text-sm mb-6">Access the staking dashboard and manage your yield assets.</p>
            <button
              onClick={connectWallet}
              className="bg-green-600 dark:bg-green-400 text-white dark:text-black px-8 py-3 rounded-xl font-black uppercase tracking-tighter hover:opacity-90 transition-all active:scale-95"
            >
              Connect to Vault
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Tabs */}
            <div className="flex p-1 bg-zinc-100 dark:bg-black rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <button
                onClick={() => setActiveTab('stake')}
                className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
                  activeTab === 'stake' ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                }`}
              >
                STAKE
              </button>
              <button
                onClick={() => setActiveTab('unstake')}
                className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
                  activeTab === 'unstake' ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                }`}
              >
                UNSTAKE
              </button>
            </div>

            {/* Input Section */}
            <div className="bg-zinc-50 dark:bg-black/80 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                  {activeTab === 'stake' ? 'Available to Stake' : 'Currently Staked'}
                </label>
                <span 
                  onClick={() => setAmount(activeTab === 'stake' ? balance.replace(/,/g, '') : stakedBalance.replace(/,/g, ''))}
                  className="text-[10px] font-mono text-green-600 dark:text-green-400 cursor-pointer hover:underline tracking-widest"
                >
                  MAX: {activeTab === 'stake' ? balance : stakedBalance} DM
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
                <span className="text-xl font-black text-green-600 dark:text-green-400 mb-2">DM</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="px-4 py-2 bg-zinc-100 dark:bg-zinc-900/30 rounded-lg">
                <p className="text-[10px] font-mono text-zinc-500 dark:text-zinc-600 uppercase mb-1">Lock Duration</p>
                <p className="text-xs text-zinc-700 dark:text-zinc-400 font-bold">No lock period</p>
              </div>
              <div className="px-4 py-2 bg-zinc-100 dark:bg-zinc-900/30 rounded-lg">
                <p className="text-[10px] font-mono text-zinc-500 dark:text-zinc-600 uppercase mb-1">Est. Daily Reward</p>
                <p className="text-xs text-green-600 dark:text-green-500 font-bold">
                  {(parseFloat(amount) * 0.185 / 365).toFixed(4) || "0.0000"} DM
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleAction}
              disabled={!amount || parseFloat(amount) <= 0}
              className={`w-full py-5 rounded-2xl font-black text-lg uppercase tracking-tighter shadow-xl transition-all flex items-center justify-center gap-3 overflow-hidden group relative disabled:opacity-50 disabled:cursor-not-allowed ${
                activeTab === 'stake' 
                ? 'bg-green-600 dark:bg-green-400 text-white dark:text-black dark:shadow-[0_0_30px_rgba(74,222,128,0.2)]' 
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700'
              }`}
            >
              {activeTab === 'stake' ? (
                <>
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  INITIATE STAKING
                </>
              ) : (
                <>
                  <ArrowDownLeft className="w-5 h-5 group-hover:-translate-x-1 group-hover:translate-y-1 transition-transform" />
                  UNSTAKE ASSETS
                </>
              )}
            </button>

            <TransactionModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              status={modalStatus}
              title={activeTab === 'stake' ? "Confirm Staking" : "Confirm Unstaking"}
              description={activeTab === 'stake' 
                ? "You are about to deposit your DM tokens into the secure yield vault." 
                : "You are about to withdraw your DM tokens from the yield vault."}
              details={[
                { label: "Asset", value: "DM Token" },
                { label: "Amount", value: `${amount} DM` },
                { label: "Method", value: activeTab === 'stake' ? "Direct Stake" : "Direct Unstake" },
              ]}
              onConfirm={confirmAction}
              error={modalError}
              txHash={txHash}
            />

            <p className="text-[10px] font-mono text-zinc-600 text-center uppercase tracking-widest">
              Rewards auto-compound every 24 hours
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

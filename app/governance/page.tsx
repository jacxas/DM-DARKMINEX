'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Vote, Clock, CheckCircle2 } from 'lucide-react';
import ProposalCard from "@/components/ProposalCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TransactionModal, { TransactionStatus } from '@/components/TransactionModal';

export default function Governance() {
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState<TransactionStatus>('idle');
  const [modalError, setModalError] = useState("");
  const [txHash, setTxHash] = useState("");
  const [voteChoice, setVoteChoice] = useState<'For' | 'Against'>('For');

  const handleVote = (choice: 'For' | 'Against') => {
    setVoteChoice(choice);
    setModalStatus('confirming');
    setIsModalOpen(true);
  };

  const confirmVote = async () => {
    setModalStatus('processing');
    
    setTimeout(() => {
      // 95% success rate for voting
      if (Math.random() > 0.05) {
        setTxHash("0x" + Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join(""));
        setModalStatus('success');
      } else {
        setModalError("Governance contract reverted: Voting weight too low or already voted.");
        setModalStatus('error');
      }
    }, 2500);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white p-6 md:p-10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <div>
              <p className="text-green-600 dark:text-green-500 font-mono text-xs uppercase tracking-[0.3em] mb-1">Decentralized Power</p>
              <h1 className="text-5xl font-black tracking-tighter">
                GOVERNANCE
              </h1>
            </div>
            <button className="bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 px-6 py-3 rounded-2xl font-bold hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all active:scale-95 flex items-center gap-2">
              Create Proposal
            </button>
          </div>

          {/* Featured Active Proposal #142 */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 via-cyan-500/20 to-purple-500/20 rounded-[2rem] blur-xl group-hover:blur-2xl transition-all duration-500" />
            <div className="relative bg-zinc-950 border border-white/10 rounded-[2rem] overflow-hidden">
              <div className="grid lg:grid-cols-2">
                <div className="p-8 md:p-12 space-y-8">
                  <div className="flex items-center gap-4">
                    <span className="bg-green-500 text-black px-4 py-1 rounded-full text-xs font-black tracking-widest uppercase">
                      Featured
                    </span>
                    <span className="text-zinc-500 font-mono text-sm uppercase">Proposal #142</span>
                  </div>

                  <div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none mb-4">
                      EXPAND <span className="text-green-400">MINING</span> OPERATIONS
                    </h2>
                    <p className="text-zinc-400 text-lg leading-relaxed max-w-xl">
                      Deploying next-gen liquid cooling infrastructure to existing mining rigs, increasing hash rate efficiency by 42% while reducing energy overhead.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800/50">
                      <div className="flex items-center gap-3 text-green-400 mb-2">
                        <Target className="w-5 h-5" />
                        <span className="font-mono text-xs uppercase tracking-widest font-bold">Objective</span>
                      </div>
                      <p className="text-sm text-zinc-300">Phase 2 hardware acquisition and green-energy grid integration.</p>
                    </div>
                    <div className="p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800/50">
                      <div className="flex items-center gap-3 text-cyan-400 mb-2">
                        <TrendingUp className="w-5 h-5" />
                        <span className="font-mono text-xs uppercase tracking-widest font-bold">Est. ROI</span>
                      </div>
                      <p className="text-sm text-zinc-300">+22.4% Annual Yield optimization for DM stakers.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-900/40 p-8 md:p-12 border-l border-white/5 space-y-8 flex flex-col justify-center">
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">Voting Progress</span>
                      <span className="text-2xl font-black">74.2%</span>
                    </div>
                    <div className="h-3 w-full bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '74.2%' }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-green-500 to-cyan-400"
                      />
                    </div>
                    <div className="flex justify-between text-[10px] font-mono text-zinc-500 uppercase font-bold tracking-widest">
                      <span>FOR: 2.1M DM</span>
                      <span>AGAINST: 124K DM</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => handleVote('For')}
                      className="flex items-center justify-center gap-2 bg-white text-black py-4 rounded-2xl font-black text-sm uppercase hover:bg-zinc-200 transition-colors"
                    >
                      <Vote className="w-4 h-4" /> Vote For
                    </button>
                    <button 
                      onClick={() => handleVote('Against')}
                      className="flex items-center justify-center gap-2 bg-zinc-800 text-white py-4 rounded-2xl font-black text-sm uppercase hover:bg-zinc-700 transition-colors"
                    >
                      Against
                    </button>
                  </div>

                  <TransactionModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    status={modalStatus}
                    title="Confirm Governance Vote"
                    description="Your voting power will be permanently recorded for this proposal stage."
                    details={[
                      { label: "Proposal", value: "#142 Expand Mining" },
                      { label: "Vote Choice", value: voteChoice },
                      { label: "Voting Power", value: "24.5k DM" },
                    ]}
                    onConfirm={confirmVote}
                    error={modalError}
                    txHash={txHash}
                  />

                  <div className="flex items-center justify-between font-mono text-[10px] text-zinc-500 uppercase tracking-widest px-2">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      <span>Closes in 4d 12h</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3 h-3 text-green-400" />
                      <span>Quorum Met</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-[0.4em] mb-6">Recent Proposals</h3>
          <div className="grid gap-6">
            <ProposalCard 
              id="142"
              title="Expand Mining Operations"
              votes="2.4M DM"
            />
            <ProposalCard 
              id="141"
              title="Adjust Staking APR"
              votes="1.8M DM"
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

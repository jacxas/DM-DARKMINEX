import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightLeft, Globe, ChevronDown } from 'lucide-react';

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

  const swapChains = () => {
    setSourceChain(destChain);
    setDestChain(sourceChain);
  };

  return (
    <div className="bg-zinc-950 p-1 rounded-3xl border border-zinc-800 shadow-2xl max-w-xl mx-auto overflow-hidden">
      <div className="bg-gradient-to-br from-zinc-900 to-black p-8 rounded-[22px] border border-white/5">
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-cyan-500 font-mono text-[10px] uppercase tracking-[0.2em] mb-1">Cross-Chain Protocol</p>
            <h2 className="text-4xl text-white font-black tracking-tighter">
              BRIDGE <span className="text-cyan-400">DM</span>
            </h2>
          </div>
          <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center border border-cyan-500/20">
            <Globe className="w-6 h-6 text-cyan-400" />
          </div>
        </div>

        <div className="space-y-6">
          {/* Source Selection */}
          <div className="relative">
            <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2 block px-2">From Network</label>
            <div className="bg-black/50 border border-zinc-800 rounded-2xl p-4 flex items-center justify-between hover:border-zinc-700 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-xl border border-zinc-800 shadow-inner">
                  {sourceChain.icon}
                </div>
                <div>
                  <p className="text-white font-bold leading-none mb-1">{sourceChain.name}</p>
                  <p className="text-zinc-600 font-mono text-[10px]">CONNECTED</p>
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
              className="w-10 h-10 bg-cyan-400 text-black rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.3)] border-4 border-black group cursor-pointer"
            >
              <ArrowRightLeft className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Destination Selection */}
          <div className="relative">
            <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2 block px-2">To Network</label>
            <div className="bg-black/50 border border-zinc-800 rounded-2xl p-4 flex items-center justify-between hover:border-zinc-700 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-xl border border-zinc-800 shadow-inner">
                  {destChain.icon}
                </div>
                <div>
                  <p className="text-white font-bold leading-none mb-1">{destChain.name}</p>
                  <p className="text-zinc-600 font-mono text-[10px]">VERIFIED GATEWAY</p>
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
              <ChevronDown className="w-5 h-5 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
            </div>
          </div>

          {/* Amount Input */}
          <div className="bg-black/80 border border-zinc-800 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Amount to Transfer</label>
              <span className="text-[10px] font-mono text-cyan-500 cursor-pointer hover:text-cyan-400 tracking-widest">MAX: 45,230.00</span>
            </div>
            <div className="flex items-end gap-4">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="bg-transparent text-4xl w-full font-bold outline-none text-white placeholder-zinc-800"
              />
              <span className="text-xl font-black text-cyan-400 mb-2">DM</span>
            </div>
          </div>

          {/* Bridge Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-cyan-400 text-black py-5 rounded-2xl font-black text-lg uppercase tracking-tighter shadow-[0_0_30px_rgba(34,211,238,0.2)] hover:shadow-[0_0_40px_rgba(34,211,238,0.4)] transition-all flex items-center justify-center gap-3 overflow-hidden group relative"
          >
            INITIATE SECURE BRIDGE
          </motion.button>
          
          <p className="text-[10px] font-mono text-zinc-600 text-center uppercase tracking-widest mt-4">
            Estimated Arrival: ~5-10 Minutes • Gas Fee: Connected Wallet
          </p>
        </div>
      </div>
    </div>
  );
}


'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Loader2, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export type TransactionStatus = 'idle' | 'confirming' | 'processing' | 'success' | 'error';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  status: TransactionStatus;
  title: string;
  description: string;
  details: { label: string; value: string }[];
  onConfirm: () => void;
  error?: string;
  txHash?: string;
}

export default function TransactionModal({
  isOpen,
  onClose,
  status,
  title,
  description,
  details,
  onConfirm,
  error,
  txHash
}: TransactionModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={status === 'processing' ? undefined : onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="p-6 border-b border-zinc-900 flex justify-between items-center bg-zinc-900/20">
            <h3 className="text-xl font-black tracking-tighter uppercase text-white">
              {status === 'success' ? 'Transaction Complete' : 
               status === 'error' ? 'Transaction Failed' : 
               'Confirm Transaction'}
            </h3>
            {status !== 'processing' && (
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-zinc-500 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="p-8">
            {status === 'confirming' || status === 'idle' ? (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h4 className="text-2xl font-bold text-white">{title}</h4>
                  <p className="text-zinc-500 text-sm">{description}</p>
                </div>

                <div className="bg-black/50 rounded-2xl border border-zinc-900 p-4 space-y-3">
                  {details.map((detail, i) => (
                    <div key={i} className="flex justify-between items-center text-xs font-mono">
                      <span className="text-zinc-500 uppercase tracking-widest">{detail.label}</span>
                      <span className="text-white font-bold">{detail.value}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={onConfirm}
                  className="w-full bg-green-400 text-black py-4 rounded-xl font-black uppercase tracking-tighter hover:bg-green-300 transition-all flex items-center justify-center gap-2 group"
                >
                  Sign and Send
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ) : status === 'processing' ? (
              <div className="py-10 text-center space-y-6">
                <div className="relative inline-block">
                  <Loader2 className="w-16 h-16 text-cyan-400 animate-spin" />
                  <div className="absolute inset-0 blur-xl bg-cyan-400/20 animate-pulse" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-bold text-white">Processing Transaction</h4>
                  <p className="text-zinc-500 text-sm">Please wait while your request is verified on-chain.</p>
                </div>
              </div>
            ) : status === 'success' ? (
              <div className="py-6 text-center space-y-6">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto border border-green-500/20">
                  <CheckCircle2 className="w-10 h-10 text-green-400" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-2xl font-bold text-white">Success!</h4>
                  <p className="text-zinc-500 text-sm">Your transaction was confirmed successfully.</p>
                </div>
                {txHash && (
                  <a 
                    href={`https://etherscan.io/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-widest"
                  >
                    View on Explorer <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                <button
                  onClick={onClose}
                  className="w-full bg-white text-black py-4 rounded-xl font-black uppercase tracking-tighter hover:bg-zinc-200 transition-all"
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="py-6 text-center space-y-6">
                <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto border border-red-500/20">
                  <XCircle className="w-10 h-10 text-red-500" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-2xl font-bold text-white">Transaction Failed</h4>
                  <p className="text-red-400/80 text-sm font-mono">{error || 'An unexpected error occurred during the transaction.'}</p>
                </div>
                <div className="p-4 bg-red-500/5 rounded-xl border border-red-500/10 flex items-start gap-3 text-left">
                  <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest leading-relaxed">
                    If this persists, please ensure you have enough network gas tokens and your wallet connection is stable.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-full bg-zinc-800 text-white py-4 rounded-xl font-black uppercase tracking-tighter hover:bg-zinc-700 transition-all"
                >
                  Dismiss
                </button>
              </div>
            )}
          </div>

          <div className="p-4 bg-zinc-900/40 border-t border-zinc-900 text-center">
            <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
              DM SECURE GATEWAY • v1.0.4
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

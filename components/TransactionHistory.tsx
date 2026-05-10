'use client';

import { ExternalLink, CheckCircle2, Clock, XCircle } from 'lucide-react';

const mockTransactions = [
  {
    id: 1,
    hash: '0x742d...44e',
    type: 'Bridge',
    amount: '1,200 DM',
    date: '2024-05-10 14:22',
    status: 'Completed',
  },
  {
    id: 2,
    hash: '0x12a3...b9c',
    type: 'Stake',
    amount: '500 DM',
    date: '2024-05-09 18:45',
    status: 'Completed',
  },
  {
    id: 3,
    hash: '0xf5e1...22a',
    type: 'Buy',
    amount: '3,000 DM',
    date: '2024-05-09 10:12',
    status: 'Pending',
  },
  {
    id: 4,
    hash: '0x99b1...8d3',
    type: 'Vote',
    amount: 'Prop #142',
    date: '2024-05-08 22:30',
    status: 'Failed',
  },
];

export default function TransactionHistory() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl backdrop-blur-sm overflow-hidden">
      <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white font-mono tracking-tighter uppercase">
          Recent Transactions
        </h3>
        <button className="text-[10px] font-mono text-zinc-500 hover:text-green-600 dark:hover:text-green-400 uppercase tracking-widest transition-colors">
          View All Explorer
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-zinc-100 dark:bg-black/20 text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em]">
              <th className="px-6 py-4 font-medium">Type</th>
              <th className="px-6 py-4 font-medium">Hash</th>
              <th className="px-6 py-4 font-medium">Amount</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/50">
            {mockTransactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4">
                  <span className="text-sm font-bold text-zinc-900 dark:text-white">{tx.type}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 group/hash cursor-pointer">
                    <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 group-hover/hash:text-cyan-600 dark:group-hover/hash:text-cyan-400 transition-colors">
                      {tx.hash}
                    </span>
                    <ExternalLink className="w-3 h-3 text-zinc-300 dark:text-zinc-600 group-hover/hash:text-cyan-600 dark:group-hover/hash:text-cyan-400" />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-mono text-zinc-900 dark:text-white">{tx.amount}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">{tx.date}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {tx.status === 'Completed' && (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-[10px] font-mono text-green-500 uppercase tracking-widest">
                          {tx.status}
                        </span>
                      </>
                    )}
                    {tx.status === 'Pending' && (
                      <>
                        <Clock className="w-4 h-4 text-amber-500 animate-pulse" />
                        <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest">
                          {tx.status}
                        </span>
                      </>
                    )}
                    {tx.status === 'Failed' && (
                      <>
                        <XCircle className="w-4 h-4 text-red-500" />
                        <span className="text-[10px] font-mono text-red-500 uppercase tracking-widest">
                          {tx.status}
                        </span>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

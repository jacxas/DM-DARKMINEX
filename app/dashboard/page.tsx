'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import WalletInfo from "@/components/WalletInfo";
import TokenPrice from "@/components/TokenPrice";
import BuyPanel from "@/components/BuyPanel";
import AIChat from "@/components/AIChat";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TransactionHistory from "@/components/TransactionHistory";

const tokenomicsData = [
  { name: 'Core Team', value: 15, color: '#4ade80' },
  { name: 'Staking Rewards', value: 40, color: '#60a5fa' },
  { name: 'DAO Treasury', value: 25, color: '#fbbf24' },
  { name: 'Public Sale', value: 20, color: '#94a3b8' },
];

function TokenomicsChart() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const gridColor = theme === 'dark' ? '#27272a' : '#e4e4e7';
  const tooltipBg = theme === 'dark' ? '#09090b' : '#ffffff';
  const tooltipBorder = theme === 'dark' ? '#27272a' : '#e4e4e7';
  const tooltipText = theme === 'dark' ? '#fff' : '#000';

  return (
    <div className="p-6 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl backdrop-blur-sm">
      <h3 className="text-xl font-bold mb-6 text-green-600 dark:text-green-400 font-mono tracking-tighter uppercase">
        Token Distribution
      </h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={tokenomicsData} layout="vertical" margin={{ left: 20, right: 30, top: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={mounted ? gridColor : '#27272a'} horizontal={true} vertical={false} />
            <XAxis type="number" hide />
            <YAxis 
              dataKey="name" 
              type="category" 
              tick={{ fill: theme === 'dark' ? '#94a3b8' : '#71717a', fontSize: 12, fontFamily: 'monospace' }}
              width={100}
            />
            <Tooltip
              cursor={{ fill: 'transparent' }}
              contentStyle={{ 
                backgroundColor: mounted ? tooltipBg : '#09090b', 
                border: `1px solid ${mounted ? tooltipBorder : '#27272a'}`,
                borderRadius: '8px',
                fontSize: '12px'
              }}
              itemStyle={{ color: mounted ? tooltipText : '#fff' }}
              formatter={(value: number) => [`${value}%`, 'Allocation']}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
              {tokenomicsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
        {tokenomicsData.map((item, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">{item.name}</span>
            </div>
            <span className="text-lg font-bold text-white">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white p-6 md:p-10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-green-600 dark:text-green-500 font-mono text-xs uppercase tracking-widest mb-1">Ecosystem Terminal</p>
              <h1 className="text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 dark:from-white to-zinc-400 dark:to-zinc-500">
                DASHBOARD
              </h1>
            </div>
            <div className="text-right font-mono text-zinc-500 text-xs">
              STATUS: <span className="text-green-400">OPERATIONAL</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-10">
            <WalletInfo />
            <TokenPrice />
            <BuyPanel />
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-8">
              <TokenomicsChart />
              <div className="p-6 bg-zinc-950 border border-zinc-900 rounded-2xl">
                <h4 className="text-sm font-mono text-zinc-500 uppercase mb-4">Contract Efficiency</h4>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Stability", value: "99.2%" },
                    { label: "Yield", value: "14.5%" },
                    { label: "Circulation", value: "62.1M" }
                  ].map((stat, i) => (
                    <div key={i}>
                      <p className="text-[10px] text-zinc-600 mb-1">{stat.label}</p>
                      <p className="text-xl font-bold">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="h-full">
              <AIChat />
            </div>
          </div>

          <div className="mt-10">
            <TransactionHistory />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

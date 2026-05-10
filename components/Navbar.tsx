'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Sun, Moon, Hexagon, Pickaxe } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function Navbar() {
  const [wallet, setWallet] = useState("");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  async function connect() {
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

  return (
    <nav className="flex justify-between items-center p-6 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50 border-b border-zinc-200 dark:border-zinc-900">
      <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-105 active:scale-95 group">
        <div className="relative w-10 h-10 flex items-center justify-center">
          <Hexagon className="w-full h-full text-green-600 dark:text-green-400 fill-green-500/10" strokeWidth={1.5} />
          <div className="absolute inset-0 flex items-center justify-center">
            <Pickaxe className="w-5 h-5 text-zinc-900 dark:text-white" strokeWidth={2.5} />
          </div>
          <div className="absolute -inset-1 bg-green-500/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <h1 className="text-2xl text-zinc-900 dark:text-green-400 font-bold hidden sm:block">
          DM DARKMINE
        </h1>
      </Link>

      <div className="flex items-center gap-8">
        <div className="flex gap-6 font-mono text-sm uppercase tracking-widest text-zinc-500">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Home</Link>
          <Link href="/dashboard" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Dashboard</Link>
          <Link href="/staking" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Staking</Link>
          <Link href="/governance" className="hover:text-zinc-900 dark:hover:text-white transition-colors">DAO</Link>
          <Link href="/bridge" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Bridge</Link>
        </div>

        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors border border-zinc-200 dark:border-zinc-700"
          aria-label="Toggle Theme"
        >
          {mounted && (theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />)}
          {!mounted && <div className="w-4 h-4" />}
        </button>

        <button
          onClick={connect}
          className="bg-zinc-800 dark:bg-zinc-800 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-zinc-700 transition-colors border border-zinc-700"
        >
          {wallet ? `${wallet.slice(0, 6)}...${wallet.slice(-4)}` : "Connect Wallet"}
        </button>
      </div>
    </nav>
  );
}

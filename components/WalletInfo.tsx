'use client';

import { useState } from "react";
import { ethers } from "ethers";

export default function WalletInfo() {
  const [wallet, setWallet] = useState("");

  async function connect() {
    if (typeof window === 'undefined' || !(window as any).ethereum) {
      console.warn("Please install a Web3 wallet extension like MetaMask to connect.");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      setWallet(await signer.getAddress());
    } catch (error) {
      console.error("Connection failed", error);
    }
  }

  return (
    <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 transition-colors">
      <button
        onClick={connect}
        className="bg-green-600 dark:bg-green-400 text-white dark:text-black px-6 py-2 rounded-xl font-bold hover:opacity-90 transition-all uppercase text-xs tracking-widest"
      >
        {wallet ? "Connected" : "Connect Wallet"}
      </button>

      {wallet && (
        <div className="mt-4">
          <p className="text-[10px] font-mono text-zinc-500 uppercase mb-1">Active Account</p>
          <p className="text-sm font-mono text-zinc-900 dark:text-white break-all">
            {wallet}
          </p>
        </div>
      )}
    </div>
  );
}

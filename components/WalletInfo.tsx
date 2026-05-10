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
    <div className="bg-zinc-900 p-6 rounded-2xl border border-mine-800">
      <button
        onClick={connect}
        className="bg-green-400 text-black px-4 py-2 rounded-xl font-bold hover:bg-green-300 transition-colors"
      >
        {wallet ? "Connected" : "Connect Wallet"}
      </button>

      {wallet && (
        <div className="mt-4">
          <p className="text-[10px] font-mono text-mine-600 uppercase mb-1">Active Account</p>
          <p className="text-sm font-mono text-white break-all">
            {wallet}
          </p>
        </div>
      )}
    </div>
  );
}

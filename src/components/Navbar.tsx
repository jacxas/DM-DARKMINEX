import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ethers } from 'ethers';

export default function Navbar() {
  const [wallet, setWallet] = useState("");

  async function connect() {
    if (!(window as any).ethereum) {
      alert("Please install MetaMask");
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
    <nav className="flex justify-between items-center p-6 bg-mine-950/80 backdrop-blur-md sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-3">
        <img src="/logo.png" alt="DM DARKMINE Logo" className="w-10 h-10 object-contain" />
        <h1 className="text-2xl text-green-400 font-bold hidden sm:block">
          DM DARKMINE
        </h1>
      </Link>

      <div className="flex items-center gap-8">
        <div className="flex gap-6 font-mono text-sm uppercase tracking-widest text-zinc-500">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
          <Link to="/staking" className="hover:text-white transition-colors">Staking</Link>
          <Link to="/governance" className="hover:text-white transition-colors">DAO</Link>
          <Link to="/bridge" className="hover:text-white transition-colors">Bridge</Link>
        </div>

        <button
          onClick={connect}
          className="bg-zinc-800 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-zinc-700 transition-colors border border-mine-800"
        >
          {wallet ? `${wallet.slice(0, 6)}...${wallet.slice(-4)}` : "Connect Wallet"}
        </button>
      </div>
    </nav>
  );
}

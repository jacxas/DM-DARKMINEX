import Link from 'next/link';
import { Hexagon, Pickaxe } from 'lucide-react';

export default function Hero() {
  return (
    <section className="h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      <div className="mb-12 relative">
        <div className="absolute inset-0 bg-green-500/20 blur-[120px] rounded-full animate-pulse" />
        <div className="relative w-56 h-56 flex items-center justify-center">
          <Hexagon className="w-full h-full text-green-600 dark:text-green-400 fill-green-500/5 transition-all duration-700" strokeWidth={1} />
          <div className="absolute inset-0 flex items-center justify-center">
            <Pickaxe className="w-24 h-24 text-zinc-900 dark:text-white drop-shadow-[0_0_30px_rgba(74,222,128,0.5)]" strokeWidth={2} />
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-full h-full border border-green-500/10 rounded-full animate-[spin_20s_linear_infinite]" />
          </div>
        </div>
      </div>
      <h1 className="text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
        DM DARKMINE
      </h1>

      <p className="mt-6 text-2xl text-zinc-400">
        Mine the Future.
      </p>

      <Link
        href="/dashboard"
        className="mt-10 bg-cyan-400 text-black px-8 py-4 rounded-xl font-bold hover:bg-cyan-300 transition-colors"
      >
        Launch App
      </Link>
    </section>
  );
}

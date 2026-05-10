import Link from 'next/link';

export default function Hero() {
  return (
    <section className="h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full" />
        <img 
          src="/logo.png" 
          alt="DM DARKMINE Logo" 
          className="w-48 h-48 object-contain relative z-10 drop-shadow-[0_0_35px_rgba(74,222,128,0.4)]" 
        />
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

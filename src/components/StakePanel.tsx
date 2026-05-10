export default function StakePanel() {
  return (
    <div className="bg-zinc-900 p-8 rounded-2xl border border-mine-800 max-w-2xl">
      <h2 className="text-3xl text-cyan-400 font-bold">
        Staking Repository
      </h2>

      <div className="mt-6 flex justify-between items-center border-b border-mine-800 pb-4">
        <span className="text-zinc-400 font-mono uppercase text-xs">Current APR</span>
        <span className="text-2xl text-green-400 font-mono">18.5%</span>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <label className="text-[10px] font-mono text-mine-600 uppercase mb-1 block">Amount to Stake</label>
          <input
            type="number"
            placeholder="0.00"
            className="w-full p-4 bg-black rounded-xl border border-mine-800 text-white font-mono outline-none focus:border-cyan-400 transition-colors"
          />
        </div>

        <button
          className="w-full bg-green-400 text-black px-6 py-4 rounded-xl font-bold hover:bg-green-300 transition-colors active:scale-95"
        >
          Stake Now
        </button>
      </div>
    </div>
  );
}

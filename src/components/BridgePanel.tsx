export default function BridgePanel() {
  return (
    <div className="bg-zinc-900 p-8 rounded-2xl border border-mine-800 max-w-xl mx-auto">
      <h2 className="text-3xl text-cyan-400 font-bold">
        Bridge DM
      </h2>

      <div className="mt-6 space-y-4">
        <div>
          <label className="text-[10px] font-mono text-mine-600 uppercase mb-1 block">Amount to Bridge</label>
          <input
            type="number"
            placeholder="0.00"
            className="w-full p-4 bg-black rounded-xl border border-mine-800 text-white font-mono outline-none focus:border-cyan-400 transition-colors"
          />
        </div>

        <button
          className="w-full mt-6 bg-green-400 text-black px-6 py-4 rounded-xl font-bold hover:bg-green-300 transition-colors active:scale-95"
        >
          Bridge Now
        </button>
      </div>
    </div>
  );
}

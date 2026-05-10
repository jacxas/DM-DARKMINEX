export default function ProposalCard({ id, title, votes }: { id: string, title: string, votes: string }) {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-900 px-6 py-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
      <div className="flex justify-between items-start">
        <div>
          <span className="text-zinc-500 text-sm font-mono tracking-widest uppercase">PROPOSAL #{id}</span>
          <h3 className="text-2xl text-zinc-900 dark:text-white mt-1 font-bold">{title}</h3>
        </div>
        <span className="bg-green-500/10 text-green-600 dark:text-green-400 px-3 py-1 rounded text-xs font-mono font-bold">
          ACTIVE
        </span>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <span className="text-zinc-400 font-mono">{votes} Locked</span>
        <button className="text-cyan-400 hover:underline font-bold">Vote Now</button>
      </div>
    </div>
  );
}

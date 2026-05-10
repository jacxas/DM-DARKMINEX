export default function BuyPanel(){

  return(

    <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-center transition-colors">
      <a
        href="https://pancakeswap.finance/"
        target="_blank"
        rel="noreferrer"
        className="bg-cyan-600 dark:bg-cyan-400 text-white dark:text-black px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-all uppercase text-xs tracking-widest"
      >
        Buy DM
      </a>
    </div>
  )
}

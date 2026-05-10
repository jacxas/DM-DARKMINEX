import ProposalCard from "@/components/ProposalCard"

export default function Governance(){
  return(
    <main className="min-h-screen bg-black text-white p-10">
      <div className="flex justify-between items-center">
        <h1 className="text-5xl text-green-400 font-bold">
          Governance
        </h1>
        <button className="bg-cyan-400 text-black px-6 py-2 rounded-xl font-bold hover:bg-cyan-300 transition-colors">
          Create Proposal
        </button>
      </div>

      <div className="grid gap-6 mt-10">
        <ProposalCard 
          id="142"
          title="Expand Mining Operations"
          votes="2.4M DM"
        />
        <ProposalCard 
          id="141"
          title="Adjust Staking APR"
          votes="1.8M DM"
        />
      </div>
    </main>
  )
}

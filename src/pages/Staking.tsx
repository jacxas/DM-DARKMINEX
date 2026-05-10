import StakePanel from "@/components/StakePanel"

export default function Staking(){
  return(
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl text-green-400 font-bold">
        Staking
      </h1>
      
      <div className="mt-10">
        <StakePanel />
      </div>
    </main>
  )
}

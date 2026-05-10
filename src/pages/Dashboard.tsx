import WalletInfo from "@/components/WalletInfo"
import TokenPrice from "@/components/TokenPrice"
import BuyPanel from "@/components/BuyPanel"
import AIChat from "@/components/AIChat"

export default function Dashboard(){

  return(

    <main className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl text-green-400 font-bold">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6 mt-10">
        <WalletInfo />
        <TokenPrice />
        <BuyPanel />
      </div>

      <div className="mt-10 max-w-4xl">
        <AIChat />
      </div>

    </main>
  )
}

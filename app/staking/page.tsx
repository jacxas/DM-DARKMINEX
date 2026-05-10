import StakePanel from "@/components/StakePanel";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Staking() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <p className="text-green-500 font-mono text-xs uppercase tracking-widest mb-1">Yield Generation</p>
            <h1 className="text-5xl font-black tracking-tighter">
              STAKING
            </h1>
          </div>
          
          <div className="max-w-4xl">
            <StakePanel />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

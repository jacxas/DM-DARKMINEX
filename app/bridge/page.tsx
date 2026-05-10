import BridgePanel from "@/components/BridgePanel";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Bridge() {
  return (
    <>
      <Navbar />
      <main className="bg-black text-white min-h-screen p-6 md:p-10 flex items-center justify-center">
        <BridgePanel />
      </main>
      <Footer />
    </>
  );
}

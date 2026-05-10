import BridgePanel from "@/components/BridgePanel";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Bridge() {
  return (
    <>
      <Navbar />
      <main className="bg-white dark:bg-black text-zinc-900 dark:text-white min-h-screen p-6 md:p-10 flex items-center justify-center transition-colors duration-300">
        <BridgePanel />
      </main>
      <Footer />
    </>
  );
}

import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-white dark:bg-black text-zinc-900 dark:text-white min-h-screen transition-colors duration-300">
      <Navbar />
      <Hero />
      <Footer />
    </main>
  );
}

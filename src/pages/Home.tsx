import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />
      <Hero />
      <Footer />
    </main>
  );
}

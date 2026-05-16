import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";

export default function HomePage() {
  return (
    <main className="bg-[#07111B] min-h-screen">
      <Navbar />
      <Hero />
    </main>
  );
}
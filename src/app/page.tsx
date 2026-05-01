import Hero from "@/components/sections/Hero";
import StatusRow from "@/components/sections/StatusRow";
import FeaturedSection from "@/components/sections/FeaturedSection";
import BentoGrid from "@/components/sections/BentoGrid";

export default function Home() {
  return (
    <div className="pt-[var(--height-nav)]">
      <Hero />
      <StatusRow />
      <FeaturedSection />
      <BentoGrid />
    </div>
  );
}

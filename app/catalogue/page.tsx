// wip: currently use react-scroll
import HeroSection from "@/components/HeroSection"
import FeaturedSection from "@/components/FeaturedSection";

export default function Catalogue() {
  return (
    <main className="w-full px-0 mx-auto my-18 md:my-20 lg:my-20 md:px-4 lg:px-4">
      <HeroSection />
      <FeaturedSection />
    </main>
  );
};
import HeroSection from "@/components/HeroSection"
import FeaturedSection from "@/components/FeaturedSection";

export default function Home() {
  return (
    <main className="mx-auto w-full my-18 md:my-20 lg:my-20 px-0 md:px-8 lg:px-8">
      <HeroSection />
      <FeaturedSection />
    </main>
  );
};

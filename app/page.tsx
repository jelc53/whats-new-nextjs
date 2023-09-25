import HeroSection from "@/components/HeroSection"
import FeaturedSection from "@/components/FeaturedSection";
// import AboutSection from "@/components/AboutSection";
// import CatalogueSection from "@/components/CatalogueSection";

export default function Home() {
  return (
    <main className="w-full px-0 mx-auto my-18 md:my-20 lg:my-20 md:px-10 lg:px-10">
      <HeroSection />
      <FeaturedSection />
      {/* <AboutSection /> */}
      {/* <CatalogueSection /> */}
    </main>
  );
};

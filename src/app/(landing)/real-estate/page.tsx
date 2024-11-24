import HeroSection from "@/components/landing/HeroSection";

export default function RealEstatePage() {
  return (
    <HeroSection
      backgroundImage="/images/landing/real_estate_hero_section.jpg"
      title="Find the Perfect Space—Tailored to Your Needs."
      subtitle="Browse homes, apartments, and commercial spaces with ease"
      buttonText="Explore Listings"
      buttonLink="/listings"
    />
  );
}

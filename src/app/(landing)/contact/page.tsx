import { ContactPageComponent } from "@/components/landing/contact/ContactPageComponent";
import HeroSection from "@/components/landing/HeroSection";
import { dbConnection } from "@/lib/db-conn";

export default async function ContactPage() {
  // Fetch the contact page data from TinaCMS
  const query = await dbConnection.queries.contact({
    relativePath: "contact.md",
  });

  return (
    <div className="-mt-16">
      <HeroSection
        backgroundImage="/images/landing/contact.jpg"
        buttonLink=""
        buttonText=""
        message={query?.data?.contact.message}
        cmsQuery={query}
      />
      <ContactPageComponent {...(query.data.contact as any)} cmsQuery={query} />
    </div>
  );
}

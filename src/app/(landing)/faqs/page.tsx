import { dbConnection } from "@/lib/db-conn";
import FaqHero from "@/components/landing/faqs/FaqHero";
import FaqAccordionSection from "@/components/landing/faqs/FaqAccordionSection";
import FaqContactUs from "@/components/landing/faqs/FaqContactUs";
import { Faq as FaqType } from "@/tina/__generated__/types"; // Import the generated type

// Note: Removed "use client" as data fetching will happen server-side.
// Search term state will need to be managed differently, likely passed down
// and handled in a client component if interactions are needed, or search becomes server-side.
// For now, focusing on displaying CMS data. Search term passing is maintained.

export default async function FaqsPage() {
  // Search term state would need to be handled if this page remains a server component
  // and search is interactive client-side. For now, we'll pass a dummy or no search term.
  // const [searchTerm, setSearchTerm] = useState<string>(""); // This line would cause error in RSC

  const query = await dbConnection.queries.faq({ relativePath: "faqs.md" });
  const data = query.data.faq as FaqType; // Cast to the generated type

  if (!data) {
    // Handle case where data is not found, though TinaCMS might throw error before this
    return <div>FAQ data not found.</div>;
  }

  // Filter out null/undefined FAQs just in case
  const validFaqs = data.faqs?.filter(Boolean) || [];

  return (
    <div className="-mt-16">
      <FaqHero
        // searchTerm={searchTerm} // search term needs client state
        // onSearchTermChange={setSearchTerm} // search term needs client state
        title={data.heroTitle}
        subtitle={data.heroSubtitle}
        backgroundImage={data.heroBackgroundImage}
      />
      <FaqAccordionSection
        // searchTerm={searchTerm} // search term needs client state
        introTitle={data.introTitle}
        introSubtitle={data.introSubtitle}
        faqs={validFaqs as FaqType['faqs']} // Pass down the validated list
      />
      <FaqContactUs
        title={data.contactSectionTitle}
        text={data.contactSectionText}
        buttonText={data.contactSectionButtonText}
        buttonLink={data.contactSectionButtonLink}
      />
    </div>
  );
}

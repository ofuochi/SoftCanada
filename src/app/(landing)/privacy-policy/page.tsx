import HeroSection from "@/components/landing/HeroSection";

const heroBlock = {
  message: `# Our Commitment to Your Privacy\n\nWe value the trust you place in SoftCanada.`,
  buttonText: "",
  buttonLink: "",
  backgroundImage: "/images/landing/hero_section_bg.jpg",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="-mt-16">
      <HeroSection {...heroBlock} />
      <div className="max-w-3xl mx-auto px-5 py-12 space-y-8 text-gray-700">
        <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
        <p>
          We collect information you provide when creating an account, filling out forms or using features such as job tools, real estate resources and immigration guides. This may include your name, contact details and any other data you choose to share.
        </p>
        <h2 className="text-2xl font-semibold">2. How We Use Your Information</h2>
        <p>
          Your information enables us to operate SoftCanada, personalize your experience and respond to your requests. We may also use aggregated data to improve our services and for analytics.
        </p>
        <h2 className="text-2xl font-semibold">3. Sharing Information</h2>
        <p>
          We do not sell your personal data. We may share it with service providers that assist with authentication, analytics or other business operations. These partners are required to protect your information.
        </p>
        <h2 className="text-2xl font-semibold">4. Cookies</h2>
        <p>
          SoftCanada uses cookies and similar technologies to remember your preferences and analyze site traffic.
        </p>
        <h2 className="text-2xl font-semibold">5. Data Security</h2>
        <p>
          We maintain reasonable safeguards to protect your information, but no online service is completely secure.
        </p>
        <h2 className="text-2xl font-semibold">6. Your Choices</h2>
        <p>
          You may update or delete your account at any time. For questions about your data, contact us at <a href="mailto:hello@softcanada.com" className="text-red-600">hello@softcanada.com</a>.
        </p>
        <h2 className="text-2xl font-semibold">7. Changes to This Policy</h2>
        <p>
          We may update this policy from time to time. Significant changes will be posted on this page.
        </p>
      </div>
    </div>
  );
}

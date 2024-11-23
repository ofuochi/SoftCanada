import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="bg-white w-full py-12 px-8 lg:px-28">
      <div className="flex flex-col md:flex-row justify-between gap-8">
        {/* Logo Section */}
        <div className="flex flex-col items-start">
          <Logo size="large"/>
        </div>

        {/* Services Column */}
        <div className="flex flex-col">
          <h3 className="font-semibold text-lg mb-4">Services</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/immigration"
                className="text-gray-400 hover:text-gray-700"
              >
                Immigration
              </Link>
            </li>
            <li>
              <Link href="/deals" className="text-gray-400 hover:text-gray-700">
                Deals
              </Link>
            </li>
            <li>
              <Link
                href="/grant-study"
                className="text-gray-400 hover:text-gray-700"
              >
                Grant & Study
              </Link>
            </li>
            <li>
              <Link
                href="/finance"
                className="text-gray-400 hover:text-gray-700"
              >
                Finance
              </Link>
            </li>
            <li>
              <Link
                href="/real-estate"
                className="text-gray-400 hover:text-gray-700"
              >
                Real Estate
              </Link>
            </li>
            <li>
              <Link
                href="/career-advisor"
                className="text-gray-400 hover:text-gray-700"
              >
                Career Advisor
              </Link>
            </li>
          </ul>
        </div>

        {/* Our Website Column */}
        <div className="flex flex-col">
          <h3 className="font-semibold text-lg mb-4">Our website</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="text-gray-400 hover:text-gray-700">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="text-gray-400 hover:text-gray-700"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/resources"
                className="text-gray-400 hover:text-gray-700"
              >
                Resources
              </Link>
            </li>
            <li>
              <Link
                href="/mortgage-calculator"
                className="text-gray-400 hover:text-gray-700"
              >
                Mortgage Calculator
              </Link>
            </li>
            <li>
              <Link
                href="/cv-builder"
                className="text-gray-400 hover:text-gray-700"
              >
                CV Builder
              </Link>
            </li>
          </ul>
        </div>

        {/* Company Column */}
        <div className="flex flex-col">
          <h3 className="font-semibold text-lg mb-4">Company</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/blog" className="text-gray-400 hover:text-gray-700">
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/career-openings"
                className="text-gray-400 hover:text-gray-700"
              >
                Career Openings
              </Link>
            </li>
            <li>
              <Link
                href="/help-support"
                className="text-gray-400 hover:text-gray-700"
              >
                Help & Support
              </Link>
            </li>
            <li>
              <Link
                href="/privacy-policy"
                className="text-gray-400 hover:text-gray-700"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms-of-service"
                className="text-gray-400 hover:text-gray-700"
              >
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Column */}
        <div className="flex flex-col">
          <h3 className="font-semibold text-lg mb-4">Contact</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/faqs" className="text-gray-400 hover:text-gray-700">
                FAQs
              </Link>
            </li>
            <li>
              <Link
                href="/about-us"
                className="text-gray-400 hover:text-gray-700"
              >
                About us
              </Link>
            </li>
          </ul>
        </div>

        {/* Get in Touch Section */}
        <div className="flex flex-col">
          <h3 className="font-semibold text-lg mb-4">Get in touch</h3>
          <p className="mb-4">Reach us on our socials for swift response!</p>
          <div className="flex space-x-4 text-lg text-gray-600">
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/icons/facebook.svg"
                alt="Facebook"
                width={24}
                height={24}
                className="hover:opacity-80"
              />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/icons/linkedin.svg"
                alt="LinkedIn"
                width={24}
                height={24}
                className="hover:opacity-80"
              />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/icons/instagram.svg"
                alt="Instagram"
                width={24}
                height={24}
                className="hover:opacity-80"
              />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/icons/x.svg"
                alt="Twitter"
                width={24}
                height={24}
                className="hover:opacity-80"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

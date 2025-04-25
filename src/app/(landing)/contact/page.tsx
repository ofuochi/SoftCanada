import HeroSection from "@/components/landing/HeroSection";
import { Button } from "antd";
import React from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

export default function ContactPage() {
  return (
    <div className="-mt-16">
      <HeroSection
        backgroundImage="/images/landing/contact.jpg"
        buttonLink=""
        buttonText=""
        message="Message"
        cmsQuery={{}}
      />
      <section className="mt-10 px-4 md:px-16">
        <div className="text-center">
          <h3 className="text-3xl md:text-3xl lg:text-4xl font-bold">
            Contact
          </h3>
          <p className="text-sm md:text-base text-center mb-10 mt-5 text-gray-500">
            We are here to help, let us know how we can assist you.
          </p>
        </div>
      </section>

      <section className="bg-gray-900 text-gray-300 mt-32 -mx-28 px-36 py-12 mb-10 dark">
        <div className="container mx-auto flex flex-col md:flex-row gap-8 items-start">
          {/* Contact Info */}
          <div className="md:w-1/3 space-y-16 place-self-center">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 flex justify-center items-center bg-gray-700 rounded-full">
                <FaMapMarkerAlt className="text-red-500 text-lg" />
              </div>
              <div>
                <h4 className="text-lg font-semibold">Address</h4>
                <p className="text-sm text-gray-400">
                  123 Main Street, City, Country
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 flex justify-center items-center bg-gray-700 rounded-full">
                <FaEnvelope className="text-red-500 text-lg" />
              </div>
              <div>
                <h4 className="text-lg font-semibold">Email</h4>
                <p className="text-sm text-gray-400">support@softcanada.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 flex justify-center items-center bg-gray-700 rounded-full">
                <FaPhoneAlt className="text-red-500 text-lg" />
              </div>
              <div>
                <h4 className="text-lg font-semibold">Phone</h4>
                <p className="text-sm text-gray-400">+1-234-567-890</p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px bg-gray-700"></div>

          {/* Contact Form */}
          <div className="md:w-2/3 w-full">
            <form className="space-y-8">
              <input
                type="text"
                placeholder="Name"
                className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <textarea
                placeholder="Message"
                rows={5}
                className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <Button
                block
                color="danger"
                variant="solid"
                role="submit"
                size="large"
                style={{ borderRadius: "unset" }}
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

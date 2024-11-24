import {Button} from "antd";
import React from "react";

export default function CallToActionSection() {
  return (
    <section
      className="relative h-[75vh] w-full bg-cover bg-center"
      style={{ backgroundImage: "url('/images/landing/cta_section_bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 md:px-10">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
          Ready to Start Your Journey?
        </h1>
        <p className="text-base md:text-lg lg:text-xl mb-8">
          Take the first step toward a successful settlement in Canada with all
          the resources you need.
        </p>
        <Button size="large" style={{ fontWeight: 600 }}>
          Join SoftCanada Today
        </Button>
      </div>
    </section>
  );
}

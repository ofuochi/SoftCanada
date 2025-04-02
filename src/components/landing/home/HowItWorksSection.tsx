"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  LandingBlocksHowItWorksBlock,
  LandingQuery,
} from "@/tina/__generated__/types";
import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { getIconComponent } from "@/utils/icon.util";

type Props = LandingBlocksHowItWorksBlock & {
  cmsQuery: any;
};

const HowItWorks = (props: Props) => {
  const { data } = useTina<LandingQuery>(props.cmsQuery);

  const howItWorksBlock = data?.landing?.blocks?.find(
    (b) => b?.__typename === "LandingBlocksHowItWorksBlock"
  );
  const content = howItWorksBlock ?? props;

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 1,
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Combine and alternate steps
  const mergedSteps = [];
  const step1 = content.step1 || [];
  const step2 = content.step2 || [];
  const maxLength = Math.max(step1.length, step2.length);

  for (let i = 0; i < maxLength; i++) {
    if (step1[i]) mergedSteps.push({ type: "step1", data: step1[i] });
    if (step2[i]) mergedSteps.push({ type: "step2", data: step2[i] });
  }

  return (
    <section className="w-full bg-gradient-to-b from-blue-50 via-white to-blue-50 py-24 relative overflow-hidden">
      {/* Background Elements */}
      <motion.div
        className="absolute top-0 left-1/3 w-64 h-64 bg-gradient-to-r from-pink-300 via-purple-400 to-indigo-500 rounded-full filter blur-xl opacity-20"
        animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-l from-yellow-300 via-orange-400 to-red-500 rounded-full filter blur-3xl opacity-20"
        animate={{ scale: [1, 1.8, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
      />

      {/* Title and Description */}
      <motion.div
        data-tina-field={tinaField(content, "heading")}
        className="text-center px-4 sm:px-8 md:px-14"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <TinaMarkdown
          content={content.heading}
          components={{
            h2: (props) => (
              <h2
                className="text-4xl xl:text-5xl font-bold text-gray-800 tracking-wide leading-tight max-lg:text-center"
                {...props}
              />
            ),
            p: (props) => (
              <p
                className="text-gray-600 text-base sm:text-lg max-lg:text-center md:max-w-3xl mx-auto mt-5 mb-16"
                {...props}
              />
            ),
          }}
        />
      </motion.div>

      {/* Steps */}
      {mergedSteps.map((step, index) => {
        const IconComponent = getIconComponent(step.data?.icon);
        return (
          <motion.div
            data-tina-field={tinaField(step.data)}
            key={index}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`flex flex-col ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } items-center gap-12 mb-32 px-3 sm:px-8 md:px-14 lg:px-20 xl:px-28`}
          >
            <motion.div
              className="flex-shrink-0"
              variants={floatingVariants}
              animate="animate"
            >
              <motion.div
                className={`p-8 bg-white rounded-full shadow-2xl border-4 border-${step.data?.iconColor}-100`}
                whileHover={{ scale: 1.1 }}
                whileTap={{
                  rotate: step.type === "step1" ? 360 : -360,
                  transition: { duration: 1 },
                }}
              >
                {IconComponent && (
                  <IconComponent
                    className={`text-${step.data?.iconColor}-500 text-7xl`}
                  />
                )}
              </motion.div>
            </motion.div>
            <motion.div className="lg:w-2/3 space-y-5" variants={textVariants}>
              <h3 className="text-3xl lg:text-4xl font-semibold text-gray-800 max-lg:text-center">
                {step.data?.title}
              </h3>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-lg:text-center">
                {step.data?.description}
              </p>
            </motion.div>
          </motion.div>
        );
      })}
    </section>
  );
};

export default HowItWorks;

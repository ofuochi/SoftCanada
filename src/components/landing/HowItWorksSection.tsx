"use client";

import React from "react";
import {motion} from "framer-motion";
import {FaCompass, FaHandshake, FaRocket} from "react-icons/fa";

const HowItWorks = () => {
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
        className="text-center px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <h2 className="text-5xl font-bold text-gray-800 mb-8 tracking-wide leading-tight">
          Embark on Your Adventure
        </h2>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-16">
          Follow our easy steps to seamlessly start your journey. Let SoftCanada
          be your guide through the complex maze of opportunity — we make your
          transition effortless and exciting.
        </p>
      </motion.div>

      {/* Step 1 */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-col md:flex-row items-center gap-12 mb-32 px-10 md:px-28"
      >
        <motion.div
          className="flex-shrink-0"
          variants={floatingVariants}
          animate="animate"
        >
          <motion.div
            className="p-8 bg-white rounded-full shadow-2xl border-4 border-blue-100"
            whileHover={{ scale: 1.1 }}
            whileTap={{ rotate: 360, transition: { duration: 1 } }}
          >
            <FaRocket className="text-red-500 text-7xl" />
          </motion.div>
        </motion.div>
        <motion.div className="md:w-2/3" variants={textVariants}>
          <h3 className="text-4xl font-semibold text-gray-800 mb-6">
            Lift Off: Sign Up
          </h3>
          <p className="text-xl text-gray-600 leading-relaxed">
            Begin your adventure by signing up for a SoftCanada account.
            Registration takes just a moment, but it opens the doors to all of
            our comprehensive tools and insights, ready to help you navigate
            this thrilling journey to Canada.
          </p>
        </motion.div>
      </motion.div>

      {/* Step 2 */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-col md:flex-row-reverse items-center gap-12 mb-32 px-10 md:px-28"
      >
        <motion.div
          className="flex-shrink-0"
          variants={floatingVariants}
          animate="animate"
        >
          <motion.div
            className="p-8 bg-white rounded-full shadow-2xl border-4 border-purple-100"
            whileHover={{ scale: 1.1 }}
            whileTap={{ rotate: -360, transition: { duration: 1 } }}
          >
            <FaCompass className="text-blue-500 text-7xl" />
          </motion.div>
        </motion.div>
        <motion.div className="md:w-2/3" variants={textVariants}>
          <h3 className="text-4xl font-semibold text-gray-800 mb-6">
            Explore the Possibilities
          </h3>
          <p className="text-xl text-gray-600 leading-relaxed">
            Explore our exclusive tools, ranging from job recommendations, real
            estate guidance, financial planning tools, to immigration pathways.
            We offer the best features that help you navigate everything
            smoothly.
          </p>
        </motion.div>
      </motion.div>

      {/* Step 3 */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-col md:flex-row items-center gap-12 px-10 md:px-28"
      >
        <motion.div
          className="flex-shrink-0"
          variants={floatingVariants}
          animate="animate"
        >
          <motion.div
            className="p-8 bg-white rounded-full shadow-2xl border-4 border-yellow-100"
            whileHover={{ scale: 1.1 }}
            whileTap={{ rotate: 180, transition: { duration: 1 } }}
          >
            <FaHandshake className="text-yellow-500 text-7xl" />
          </motion.div>
        </motion.div>
        <motion.div className="md:w-2/3" variants={textVariants}>
          <h3 className="text-4xl font-semibold text-gray-800 mb-6">
            Save & Celebrate
          </h3>
          <p className="text-xl text-gray-600 leading-relaxed">
            Save your progress, bookmark important milestones, and take full
            control of your journey. Once completed, celebrate your achievements
            knowing that we are here for every step of the way.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HowItWorks;

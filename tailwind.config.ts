import type { Config } from "tailwindcss";

const generateColorShades = (baseColor: string) => {
  const shades = {
    50: `color-mix(in srgb, ${baseColor}, white 90%)`,
    100: `color-mix(in srgb, ${baseColor}, white 80%)`,
    200: `color-mix(in srgb, ${baseColor}, white 60%)`,
    300: `color-mix(in srgb, ${baseColor}, white 40%)`,
    400: `color-mix(in srgb, ${baseColor}, white 20%)`,
    500: baseColor,
    600: `color-mix(in srgb, ${baseColor}, black 20%)`,
    700: `color-mix(in srgb, ${baseColor}, black 40%)`,
    800: `color-mix(in srgb, ${baseColor}, black 60%)`,
    900: `color-mix(in srgb, ${baseColor}, black 80%)`,
    950: `color-mix(in srgb, ${baseColor}, black 90%)`,
  };
  return shades;
};

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        dm_sans: ["DM Sans"],
        lato: ["Lato"],
        poppins: ["Poppins"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        sc_green: generateColorShades("#72FA3266"),
      },
    },
  },
  plugins: [],
} satisfies Config;

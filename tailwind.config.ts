import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderColor: {
        DEFAULT: `${colors.gray[500]}66`,
      },
      colors: {
        ascent: {
          DEFAULT: colors.blue[500],
          secondary: colors.slate[800],
        },
        primary: colors.white,
        secondary: {
          DEFAULT: colors.black,
          light: colors.slate[600],
          lighter: {
            DEFAULT: "#edeff3",
            hover: "#e3e6ea"
          },
        },
        shadow: colors.gray[500],
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(({ addBase, addComponents, addUtilities, theme }) => {
      addUtilities({
        ".min-h-screen-svh": {
          "min-height": ["100vh", "100svh"],
        },
        ".h-screen-svh": {
          height: ["100vh", "100svh"],
        },
      });
    }),
  ],
};
export default config;

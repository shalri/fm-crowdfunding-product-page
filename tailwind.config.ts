import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "cp-moderate-cyan": "var(--moderate-cyan)",
        "cp-dark-cyan": "var(--dark-cyan)",
        "cp-black": "var(--black)",
        "cp-dark-gray": "var(--dark-gray)",
      },
      fontFamily: {
        commissioner: "var(--font-family-commissioner)",
      },
      fontWeight: {
        regular: "var(--font-weight-regular)",
        "semi-bold": "var(--font-weight-semi-bold)",
        bold: "var(--font-weight-bold)",
      },
    },
  },
  plugins: [],
};
export default config;

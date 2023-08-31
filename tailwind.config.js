/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx,scss}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx,scss}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx,scss}",
  ],
  important: "#root",
  theme: {
    colors: {
      "primary-light": "#42a5f5",
      primary: "#1976d2",
      "primary-dark": "#1565c0",
      "secondary-light": "#ba68c8",
      secondary: "#9c27b0",
      "secondary-dark": "#7b1fa2",
      "error-light": "#ef5350",
      error: "#d32f2f",
      "error-dark": "#c62828",
      "warning-light": "#ff9800",
      warning: "#fb8c00",
      "warning-dark": "#f57c00",
      "info-light": "#009688",
      info: "#00897b",
      "info-dark": "#00796b",
      "success-light": "#009900",
      success: "#008000",
      "success-dark": "#006600",
    },
    screens: {
      xs: "450px",
      sm: "600px",
      md: "900px",
      lg: "1200px",
      xl: "1536px",
    },
    extend: {},
  },
  plugins: [],
};

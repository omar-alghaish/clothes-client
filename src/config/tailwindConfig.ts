export const tailwindRadius = {
  lg: "var(--radius)",
  md: "calc(var(--radius) - 2px)",
  sm: "calc(var(--radius) - 4px)",
};

export const tailwindFonts = {
  sans: ["Inter", "ui-sans-serif", "system-ui"],
  serif: ["Georgia", "ui-serif", "serif"],
};

export const tailwindShadows = {
  sm: "0 1px 2px var(--shadow-color)",
  md: "0 4px 6px var(--shadow-color)",
  lg: "0 10px 15px var(--shadow-color)",
};

export const tailwindColors = {
  primary: "var(--primary)",
  secondary: "var(--secondary)",
  tertiary: "var(--tertiary)",
  background: "var(--background)",
  foreground: "var(--foreground)",
  text: "var(--text-color)",
  heading: "var(--heading-color)",
  border: "var(--border-color)",
  hover: "var(--hover-color)",
  card: "var(--card-background)",
  button: {
    background: "var(--button-background)",
    text: "var(--button-text-color)",
  },
  link: "var(--link-color)",
  shadow: "var(--shadow-color)",
};

export const tailwindContainers = {
  // center: true,
  // padding: '2rem',
  screens: {
    sm: "576px",
    "sm-max": {
      max: "576px",
    },
    md: "768px",
    "md-max": {
      max: "768px",
    },
    lg: "992px",
    "lg-max": {
      max: "992px",
    },
    xl: "1200px",
    "xl-max": {
      max: "1200px",
    },
    "2xl": "1320px",
    "2xl-max": {
      max: "1320px",
    },
    "3xl": "1600px",
    "3xl-max": {
      max: "1600px",
    },
    "4xl": "1850px",
    "4xl-max": {
      max: "1850px",
    },
  },
};

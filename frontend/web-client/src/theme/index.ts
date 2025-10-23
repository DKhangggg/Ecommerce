// Project theme palette - single source of truth
export const theme = {
  colors: {
    brand1: "#F7E6CA",
    brand2: "#E8D59E",
    brand3: "#D9BBB0",
    brand4: "#AD9C8E",
    textOnBrand: "#2b2b2b",
  },
  gradients: {
    brand:
      "linear-gradient(90deg, #F7E6CA 0%, #E8D59E 33%, #D9BBB0 66%, #AD9C8E 100%)",
    accent: "linear-gradient(90deg, #AD9C8E, #D9BBB0)",
  },
} as const;

export type Theme = typeof theme;

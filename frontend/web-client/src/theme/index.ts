// Project theme palette - single source of truth
export const theme = {
  colors: {
    brand1: "#F7E6CA",
    brand2: "#E8D59E",
    brand3: "#D9BBB0",
    brand4: "#AD9C8E",
    textOnBrand: "#2b2b2b",
  },
  
} as const;

export type Theme = typeof theme;

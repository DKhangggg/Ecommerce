import { Box, SimpleGrid } from "@chakra-ui/react";
import type { banner } from "../../types/banner";
import BannerCard from "./Banner";
import CircularIndeterminate from "../common/Loading";

interface BannerListProps {
  isLoading?: boolean;
  banners: banner[];
}

export const BannerList = ({ banners, isLoading = false }: BannerListProps) => {
  if (isLoading) {
    return (
      <Box
        p={4}
        bg="white"
        borderRadius="lg"
        boxShadow="md"
        border="1px solid var(--brand-2)"
      >
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
          {banners.map((banner) => (
            <CircularIndeterminate></CircularIndeterminate>
          ))}
        </SimpleGrid>
      </Box>
    );
  }

  return (
    <Box
      p={4}
      bg="white"
      borderRadius="lg"
      boxShadow="md"
      border="1px solid var(--brand-2)"
    >
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
        {banners.map((banner) => (
          <BannerCard key={banner.id} data={banner} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

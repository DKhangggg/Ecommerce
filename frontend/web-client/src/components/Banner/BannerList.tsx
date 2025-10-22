import { Box, SimpleGrid } from "@chakra-ui/react";
import type { banner } from "../../types/banner";
import BannerCard from "./Banner";

interface BannerListProps {
  banners: banner[];
}

export const BannerList = ({ banners }: BannerListProps) => {
  return (
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
        {banners.map((banner) => (
          <BannerCard key={banner.id} data={banner} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

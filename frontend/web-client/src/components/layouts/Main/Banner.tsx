import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";

export interface BannerProps {
  id?: number;
  title?: string;
  description?: string;
  imageUrl?: string;
  predictiveText?: string;
  ctaLink?: string;
  ctaText?: string;
}

export const Banner = ({
  title,
  description,
  imageUrl,
  ctaLink,
  ctaText,
}: BannerProps) => {
  return (
    <Box
      position="relative"
      borderRadius="xl"
      overflow="hidden"
      w="100%"
      h={{ base: "200px", md: "250px" }}
      _hover={{ transform: "scale(1.01)", transition: "0.3s ease" }}
    >
      <Image src={imageUrl} alt={title} w="100%" h="100%" objectFit="cover" />

      {/* Overlay text & nút */}
      <Box
        position="absolute"
        top="0"
        left="0"
        w="100%"
        h="100%"
        bgGradient="linear(to-t, blackAlpha.600, transparent 40%)"
        color="white"
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        alignItems="flex-start"
        p={6}
      >
        {title && <Heading size="md">{title}</Heading>}
        {description && (
          <Text fontSize="sm" mb={2}>
            {description}
          </Text>
        )}
        {ctaLink && (
          <Button
            as="a"
            href={ctaLink}
            colorScheme="blue"
            size="sm"
            bg="white"
            color="black"
            _hover={{ bg: "blue.500", color: "white" }}
          >
            {ctaText || "Mua ngay"}
          </Button>
        )}
      </Box>
    </Box>
  );
};

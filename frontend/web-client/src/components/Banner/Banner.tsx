import { Box, Button, Image, type ButtonProps } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import type { banner } from "../../types/banner";
import { Text, type TextProps } from "@chakra-ui/react";

interface BannerCardProps {
  data: banner;
}

export default function BannerCard({ data }: BannerCardProps) {
  return (
    <Box
      bg="white"
      borderRadius="xl"
      overflow="hidden"
      position="relative"
      w="full"
      h="250px"
      boxShadow="md"
    >
      <Image
        src={data.imageUrl}
        alt={data.title}
        w="100%"
        h="100%"
        objectFit="cover"
      />

      <Box
        position="absolute"
        top="0"
        left="0"
        p={6}
        color="white"
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        h="100%"
        bgGradient="linear(to-t, blackAlpha.600, transparent)"
      >
        <Text fontSize="xl" fontWeight="bold">
          {data.title}
        </Text>
        <Text fontSize="sm" {...({ noOfLines: 2 } as TextProps)}>
          {data.description}
        </Text>

        <Button
          as={Link}
          {...({ to: data.ctaLink } as ButtonProps & { to: string })}
          size="sm"
          mt={3}
          colorScheme="blue"
          bg="white"
          color="black"
          _hover={{ bg: "blue.500", color: "white" }}
          w="fit-content"
        >
          {data.ctaText}
        </Button>
      </Box>
    </Box>
  );
}

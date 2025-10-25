import {
  Badge,
  Box,
  Button,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import BackToHomeButton from "../components/common/BackToHomeButton";
import { useParams } from "react-router-dom";
import { type Product } from "../types/product";

interface Props {
  data?: any;
}

export function ProductDetailPage({ data }: Props) {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState<Product | undefined>();
  
  const Mockproduct = data || {
    name: "Handcrafted Wooden Chair",
    price: 249.99,
    description:
      "This handcrafted wooden chair is made from sustainable oak wood, designed for maximum comfort and premium aesthetics. Perfect for modern homes or minimalist interiors.",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
      "https://images.unsplash.com/photo-1555041600-79b53fcd2d8b?w=800",
    ],
    stock: 8,
    category: "Furniture",
    rating: 4.5,
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          style={{
            color: i <= rating ? "#FFA726" : "#E0E0E0",
            fontSize: "20px",
          }}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .product-container {
          animation: fadeInUp 0.6s ease-out;
        }
      `}</style>

      {/* Back to Homepage Button */}
      <BackToHomeButton style={{ marginBottom: "24px" }} />

      <Box
        className="product-container flex flex-col lg:flex-row gap-12 w-full"
        style={{
          background: "linear-gradient(135deg, #f5f0eb 0%, #ffffff 100%)",
          padding: "60px 50px",
          borderRadius: "20px",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.08)",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {/* Left: Product Image Gallery */}
        <Box className="w-full lg:w-1/2 flex flex-col" style={{ gap: "20px" }}>
          {/* Main Image */}
          <Box
            style={{
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 15px 40px rgba(0, 0, 0, 0.1)",
              position: "relative",
            }}
          >
            <Image
              src={Mockproduct.images[selectedImage]}
              alt={Mockproduct.name}
              className="w-full object-cover"
              style={{
                height: "500px",
                transition: "transform 0.4s ease",
                cursor: "zoom-in",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            />
          </Box>

          {/* Thumbnail Gallery */}
          <HStack style={{ gap: "15px", justifyContent: "center" }}>
            {Mockproduct.images.map((img: string, i: number) => (
              <Box
                key={i}
                onClick={() => setSelectedImage(i)}
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "15px",
                  overflow: "hidden",
                  cursor: "pointer",
                  border:
                    selectedImage === i
                      ? "3px solid #B97B48"
                      : "3px solid transparent",
                  transition: "all 0.3s ease",
                  boxShadow:
                    selectedImage === i
                      ? "0 8px 20px rgba(185, 123, 72, 0.3)"
                      : "0 4px 12px rgba(0, 0, 0, 0.08)",
                }}
                onMouseEnter={(e) => {
                  if (selectedImage !== i) {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 20px rgba(0, 0, 0, 0.15)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    selectedImage === i
                      ? "0 8px 20px rgba(185, 123, 72, 0.3)"
                      : "0 4px 12px rgba(0, 0, 0, 0.08)";
                }}
              >
                <Image
                  src={img}
                  alt={`thumbnail ${i + 1}`}
                  className="w-full h-full object-cover"
                  style={{ opacity: selectedImage === i ? 1 : 0.7 }}
                />
              </Box>
            ))}
          </HStack>
        </Box>

        {/* Vertical Divider */}
        <Box
          style={{
            width: "1px",
            background:
              "linear-gradient(to bottom, transparent, #E0E0E0, transparent)",
            display: "none",
          }}
          className="lg:block"
        />

        {/* Right: Product Details */}
        <VStack
          align="start"
          className="w-full lg:w-1/2"
          style={{ gap: "25px" }}
        >
          {/* Badges */}
          <HStack style={{ gap: "12px" }}>
            <Badge
              style={{
                background: "#FFF3E0",
                color: "#E67300",
                padding: "6px 14px",
                borderRadius: "8px",
                fontWeight: "600",
                fontSize: "13px",
                textTransform: "uppercase",
              }}
            >
              {Mockproduct.category}
            </Badge>
            <Badge
              style={{
                background: Mockproduct.stock > 0 ? "#E8F5E9" : "#FFEBEE",
                color: Mockproduct.stock > 0 ? "#2E7D32" : "#C62828",
                padding: "6px 14px",
                borderRadius: "8px",
                fontWeight: "600",
                fontSize: "13px",
              }}
            >
              {Mockproduct.stock > 0
                ? `${Mockproduct.stock} In Stock`
                : "Out of Stock"}
            </Badge>
          </HStack>

          {/* Product Name */}
          <Text
            style={{
              fontSize: "36px",
              fontWeight: "700",
              color: "#2b2b2b",
              lineHeight: "1.3",
              marginTop: "5px",
            }}
          >
            {Mockproduct.name}
          </Text>

          {/* Rating */}
          <HStack style={{ gap: "10px", alignItems: "center" }}>
            <HStack style={{ gap: "3px" }}>
              {renderStars(Math.floor(Mockproduct.rating))}
            </HStack>
            <Text
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#666",
              }}
            >
              {Mockproduct.rating}
            </Text>
            <Text
              style={{
                fontSize: "14px",
                color: "#999",
                marginLeft: "5px",
              }}
            >
              (128 reviews)
            </Text>
          </HStack>

          {/* Price */}
          <Text
            style={{
              fontSize: "42px",
              fontWeight: "700",
              color: "#B97B48",
              marginTop: "10px",
            }}
          >
            ${Mockproduct.price.toFixed(2)}
          </Text>

          {/* Divider */}
          <Box
            style={{
              width: "100%",
              height: "1px",
              background: "linear-gradient(to right, #E0E0E0, transparent)",
              margin: "10px 0",
            }}
          />

          {/* Description */}
          <Text
            style={{
              fontSize: "16px",
              lineHeight: "1.8",
              color: "#555",
            }}
          >
            {Mockproduct.description}
          </Text>

          {/* Action Buttons */}
          <HStack style={{ gap: "15px", marginTop: "20px", width: "100%" }}>
            <Button
              size="lg"
              style={{
                flex: 1,
                height: "56px",
                borderRadius: "15px",
                background: "linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)",
                color: "white",
                fontSize: "16px",
                fontWeight: "600",
                border: "none",
                boxShadow: "0 10px 25px rgba(20, 184, 166, 0.3)",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(135deg, #2DD4BF 0%, #14B8A6 100%)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 15px 35px rgba(20, 184, 166, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 10px 25px rgba(20, 184, 166, 0.3)";
              }}
            >
              🛒 Add to Cart
            </Button>

            <Button
              size="lg"
              style={{
                flex: 1,
                height: "56px",
                borderRadius: "15px",
                background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
                color: "white",
                fontSize: "16px",
                fontWeight: "600",
                border: "none",
                boxShadow: "0 10px 25px rgba(249, 115, 22, 0.3)",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(135deg, #FB923C 0%, #F97316 100%)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 15px 35px rgba(249, 115, 22, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(135deg, #F97316 0%, #EA580C 100%)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 10px 25px rgba(249, 115, 22, 0.3)";
              }}
            >
              ⚡ Buy Now
            </Button>
          </HStack>

          {/* Additional Info */}
          <Box
            style={{
              marginTop: "20px",
              padding: "20px",
              background: "rgba(185, 123, 72, 0.05)",
              borderRadius: "12px",
              border: "1px solid rgba(185, 123, 72, 0.1)",
            }}
          >
            <VStack align="start" style={{ gap: "10px" }}>
              <HStack style={{ gap: "10px" }}>
                <Text style={{ fontSize: "14px", color: "#666" }}>✓</Text>
                <Text style={{ fontSize: "14px", color: "#666" }}>
                  Free shipping on orders over $100
                </Text>
              </HStack>
              <HStack style={{ gap: "10px" }}>
                <Text style={{ fontSize: "14px", color: "#666" }}>✓</Text>
                <Text style={{ fontSize: "14px", color: "#666" }}>
                  30-day return policy
                </Text>
              </HStack>
              <HStack style={{ gap: "10px" }}>
                <Text style={{ fontSize: "14px", color: "#666" }}>✓</Text>
                <Text style={{ fontSize: "14px", color: "#666" }}>
                  Secure payment guaranteed
                </Text>
              </HStack>
            </VStack>
          </Box>
        </VStack>
      </Box>
    </>
  );
}

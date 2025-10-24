import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface BackToHomeButtonProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function BackToHomeButton({
  className = "",
  style = {},
}: BackToHomeButtonProps) {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        .back-to-home-btn {
          transition: all 0.3s ease;
        }
        
        .back-to-home-btn:hover {
          transform: translateX(-4px);
        }
      `}</style>

      <button
        onClick={() => navigate("/")}
        className={`back-to-home-btn ${className}`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          padding: "14px 28px",
          background: "linear-gradient(135deg, #f8e7c9 0%, #f2d5a1 100%)",
          border: "2px solid rgba(185, 123, 72, 0.2)",
          borderRadius: "16px",
          color: "#7b614a",
          fontSize: "16px",
          fontWeight: "600",
          fontFamily: "'Poppins', sans-serif",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
          ...style,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background =
            "linear-gradient(135deg, #f2d5a1 0%, #e8c280 100%)";
          e.currentTarget.style.boxShadow =
            "0 8px 20px rgba(185, 123, 72, 0.25)";
          e.currentTarget.style.borderColor = "#B97B48";
          e.currentTarget.style.color = "#4b3a2b";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background =
            "linear-gradient(135deg, #f8e7c9 0%, #f2d5a1 100%)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.08)";
          e.currentTarget.style.borderColor = "rgba(185, 123, 72, 0.2)";
          e.currentTarget.style.color = "#7b614a";
        }}
      >
        <ArrowLeft size={20} />
        <span>Back to Homepage</span>
      </button>
    </>
  );
}

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { apiService } from "../services/apiService";

const GOOGLE_SVG = (
  <svg width="20" height="20" viewBox="0 0 48 48">
    <path
      fill="#FFC107"
      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    />
    <path
      fill="#FF3D00"
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    />
    <path
      fill="#4CAF50"
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
    />
    <path
      fill="#1976D2"
      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
    />
  </svg>
);

const GITHUB_SVG = (
  <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ username, password });
    if (!username || !password) {
      setError("Vui lòng nhập cả username và password");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const userData = await apiService.login(username, password);

      login(userData);

      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đã có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(135deg, #f5e6d3 0%, #d4a574 100%)",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * {
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
      `}</style>

      <div
        className="bg-white w-full max-w-[600px]"
        style={{
          borderRadius: "20px",
          padding: "60px 50px",
          boxShadow: "0 25px 70px rgba(139, 94, 60, 0.2)",
        }}
      >
        {/* Logo */}
        <div className="flex justify-center" style={{ marginBottom: "25px" }}>
          <div
            className="flex items-center justify-center"
            style={{
              width: "85px",
              height: "85px",
              borderRadius: "18px",
              background: "linear-gradient(135deg, #b88968 0%, #a06a3e 100%)",
              boxShadow: "0 10px 30px rgba(139, 94, 60, 0.35)",
            }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 80 80"
              fill="none"
              stroke="white"
              strokeWidth="3.5"
              strokeLinecap="round"
            >
              <path d="M20 30h40l-6 16H26z" />
              <circle cx="30" cy="60" r="4" fill="white" />
              <circle cx="54" cy="60" r="4" fill="white" />
              <path d="M40 38v-16M40 22l-5 5M40 22l5 5" strokeWidth="4" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2
          className="text-center font-bold"
          style={{
            color: "#2b2b2b",
            fontSize: "32px",
            marginBottom: "12px",
          }}
        >
          Welcome Back
        </h2>
        <p
          className="text-center text-gray-500"
          style={{
            fontSize: "15px",
            marginBottom: "35px",
          }}
        >
          Sign in to continue to your account
        </p>

        {/* Form */}
        <form onSubmit={handleLogin}>
          {/* Username field */}
          <div style={{ marginBottom: "25px" }}>
            <label
              className="block font-medium"
              style={{
                color: "#5a5a5a",
                fontSize: "14px",
                marginBottom: "10px",
              }}
            >
              Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full outline-none text-gray-800 placeholder:text-gray-400"
              style={{
                height: "50px",
                padding: "0 20px",
                fontSize: "15px",
                borderRadius: "15px",
                border: "2px solid #e5e7eb",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#b88968";
                e.target.style.boxShadow = "0 0 0 4px rgba(184, 137, 104, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e7eb";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Password field */}
          <div style={{ marginBottom: "25px" }}>
            <label
              className="block font-medium"
              style={{
                color: "#5a5a5a",
                fontSize: "14px",
                marginBottom: "10px",
              }}
            >
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full outline-none text-gray-800 placeholder:text-gray-400"
              style={{
                height: "50px",
                padding: "0 20px",
                fontSize: "15px",
                borderRadius: "15px",
                border: "2px solid #e5e7eb",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#b88968";
                e.target.style.boxShadow = "0 0 0 4px rgba(184, 137, 104, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e7eb";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="w-full font-semibold text-white"
            style={{
              height: "52px",
              fontSize: "16px",
              borderRadius: "15px",
              background: "linear-gradient(135deg, #b88968 0%, #a06a3e 100%)",
              boxShadow: "0 10px 25px rgba(184, 137, 104, 0.35)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              marginTop: "30px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, #c99d7d 0%, #b07a52 100%)";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 15px 35px rgba(184, 137, 104, 0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, #b88968 0%, #a06a3e 100%)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 10px 25px rgba(184, 137, 104, 0.35)";
            }}
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div
          className="flex items-center"
          style={{
            margin: "35px 0",
          }}
        >
          <div className="flex-grow border-t border-gray-300"></div>
          <span
            className="text-gray-400 font-medium"
            style={{
              margin: "0 20px",
              fontSize: "14px",
            }}
          >
            or continue with
          </span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Social login buttons */}
        <div className="flex" style={{ gap: "18px" }}>
          <button
            type="button"
            className="flex-1 flex items-center justify-center font-medium text-gray-700"
            style={{
              height: "48px",
              gap: "10px",
              borderRadius: "15px",
              border: "2px solid #e5e7eb",
              background: "white",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              fontSize: "14px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#d1d5db";
              e.currentTarget.style.boxShadow =
                "0 10px 25px rgba(0, 0, 0, 0.12)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#e5e7eb";
              e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(0, 0, 0, 0.05)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {GOOGLE_SVG}
            <span>Google</span>
          </button>

          <button
            type="button"
            className="flex-1 flex items-center justify-center font-medium text-gray-700"
            style={{
              height: "48px",
              gap: "10px",
              borderRadius: "15px",
              border: "2px solid #e5e7eb",
              background: "white",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              fontSize: "14px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#d1d5db";
              e.currentTarget.style.boxShadow =
                "0 10px 25px rgba(0, 0, 0, 0.12)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#e5e7eb";
              e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(0, 0, 0, 0.05)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {GITHUB_SVG}
            <span>GitHub</span>
          </button>
        </div>

        {/* Forgot password link */}
        <div className="text-center" style={{ marginTop: "30px" }}>
          <a
            href="#"
            className="text-gray-500"
            style={{
              fontSize: "14px",
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#6b7280";
              e.currentTarget.style.textDecoration = "underline";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#9ca3af";
              e.currentTarget.style.textDecoration = "none";
            }}
          >
            Forgot password?
          </a>
        </div>

        {/* Back to Homepage */}
        <div className="text-center" style={{ marginTop: "20px" }}>
          <a
            href="/"
            className="inline-flex items-center font-medium"
            style={{
              gap: "8px",
              fontSize: "14px",
              color: "#b88968",
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#a06a3e";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#b88968";
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Homepage
          </a>
        </div>
      </div>
    </div>
  );
}

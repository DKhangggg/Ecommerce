import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate, Link } from "react-router-dom";
import type { LoginPayload } from "../types/auth.ts";
import loginBg from "../assets/loginBackground.webp";

const GOOGLE_SVG = (
    <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 s5.373-12,12-12c3.059,0,5.842,1.153,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24 s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.294,16.108,18.789,12,24,12c3.059,0,5.842,1.153,7.961,3.039l5.657-5.657 C34.046,6.053,29.268,4,24,4C16.318,4,9.635,8.037,6.306,14.691z"/>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.197l-6.191-5.238C29.151,35.091,26.715,36,24,36 c-5.202,0-9.688-3.315-11.351-7.946l-6.49,5.003C9.464,39.782,16.227,44,24,44z"/>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.095,5.566l6.191,5.238 C36.855,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
    </svg>
);
const GITHUB_SVG = (
    <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
    </svg>
);


export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { login,isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";
    React.useEffect(() => {
        if (isAuthenticated) {
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, from]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username || !password) {
            setError("Vui lòng nhập cả username và password");
            return;
        }
        setLoading(true);
        setError(null);
        const payload: LoginPayload = {
            username: username,
            password: password,
        };
        try {
            await login(payload);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message.includes("401") || err.message.includes("403")
                    ? "Tên đăng nhập hoặc mật khẩu không chính xác."
                    : "Đã có lỗi xảy ra. Vui lòng thử lại.");
            } else {
                setError("Đã có lỗi không xác định.");
            }
        } finally {
            setLoading(false);
        }
    };

    // Social & helper handlers
    const handleGoogleLogin = () => {
        if (loading) return;

        setError("Đăng nhập bằng Google hiện chưa được cấu hình.");
    };

    const handleGithubLogin = () => {
        if (loading) return;
        setError("Đăng nhập bằng GitHub hiện chưa được cấu hình.");
    };

    const handleBack = () => {
        if (loading) return;
        navigate(-1);
    };

    return (
        <div
            className="min-h-screen w-full flex items-center justify-center p-4"
            style={{
                backgroundColor: "#d4a574",
                backgroundImage: `linear-gradient(rgba(245,230,211,0.4), rgba(212,165,116,0.4)), url(${loginBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <style>{`
              .login-card {
                background: rgba(255,255,255,0.85);
                backdrop-filter: blur(14px) saturate(120%);
                -webkit-backdrop-filter: blur(14px) saturate(120%);
                border: 1px solid rgba(255,255,255,0.55);
                border-radius: 20px;
                padding: 60px 50px;
                box-shadow:
                  0 25px 70px rgba(0,0,0,0.22),
                  0 10px 25px rgba(160,106,62,0.20);
              }
              .login-title {
                font-weight: 800;
                font-size: 30px;
                line-height: 1.1;
                background: linear-gradient(135deg, #8b5e3c, #a06a3e, #d4a574);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
                margin-bottom: 8px;
                text-align: center;
              }
              .login-subtitle {
                color: #6b7280;
                font-size: 14px;
                text-align: center;
                margin-bottom: 10px;
              }
              .login-input {
                height: 50px;
                padding: 0 20px;
                font-size: 15px;
                border-radius: 14px;
                border: 2px solid #e5e7eb;
                background: white;
                color: #111827;
                outline: none;
                transition: box-shadow .2s ease, border-color .2s ease, background-color .2s ease;
              }
              .login-input:focus {
                border-color: #a06a3e;
                box-shadow: 0 0 0 4px rgba(160,106,62,0.18);
              }
              .login-input:disabled {
                background: #f3f4f6;
                cursor: not-allowed;
              }
              .login-btn {
                height: 52px;
                font-size: 16px;
                border-radius: 15px;
                color: #fff;
                background: linear-gradient(135deg, #b88968 0%, #a06a3e 100%);
                border: none;
                box-shadow: 0 12px 28px rgba(184,137,104,0.35);
                transition: transform .12s ease, box-shadow .12s ease, opacity .2s ease;
                cursor: pointer;
              }
              .login-btn:hover { transform: translateY(-1px); box-shadow: 0 16px 34px rgba(184,137,104,0.42); }
              .login-btn:active { transform: translateY(0); box-shadow: 0 10px 24px rgba(184,137,104,0.35); }
              .login-btn:disabled { opacity: .75; cursor: not-allowed; }
            `}</style>

            <div className="w-full max-w-[600px] login-card">
                <h2 className="login-title">Welcome Back</h2>
                <p className="login-subtitle">Sign in to continue to your account</p>

                {/* Form */}
                <form onSubmit={handleLogin}>
                    {/* Error banner */}
                    {error && (
                        <div style={{
                            color: '#b91c1c',
                            backgroundColor: 'rgba(254,242,242,0.9)',
                            border: '1px solid #fecaca',
                            padding: '12px 16px',
                            borderRadius: '12px',
                            marginBottom: '20px',
                            fontSize: '14px',
                            fontWeight: 600,
                            textAlign: 'center',
                            boxShadow: '0 6px 16px rgba(185,28,28,0.12)'
                        }}>
                            {error}
                        </div>
                    )}

                    {/* Username */}
                    <div style={{ marginBottom: 18 }}>
                        <label className="block font-medium" style={{ color: '#4b5563', fontSize: 14, marginBottom: 10 }}>Username</label>
                        <input
                            className="w-full login-input placeholder:text-gray-400"
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            disabled={loading}
                        />
                    </div>

                    {/* Password */}
                    <div style={{ marginBottom: 10 }}>
                        <label className="block font-medium" style={{ color: '#4b5563', fontSize: 14, marginBottom: 10 }}>Password</label>
                        <input
                            className="w-full login-input placeholder:text-gray-400"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            disabled={loading}
                        />
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
                            <Link to="/forgot-password" style={{ color: '#a06a3e', fontSize: 13, fontWeight: 700, textDecoration: 'none' }} onClick={(e) => { if (loading) e.preventDefault(); }}>
                                Forget Password?
                            </Link>
                        </div>
                    </div>

                    {/* Submit */}
                    <button type="submit" className="w-full font-semibold login-btn" disabled={loading}>
                        {loading ? 'Đang đăng nhập...' : 'Login'}
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center" style={{ margin: '28px 0' }}>
                    <div style={{ flex: 1, height: 1, backgroundColor: '#e5e7eb' }} />
                    <span style={{ padding: '0 12px', fontSize: 12, color: '#9ca3af', background: 'rgba(255,255,255,0.6)', borderRadius: 9999 }}>Or</span>
                    <div style={{ flex: 1, height: 1, backgroundColor: '#e5e7eb' }} />
                </div>

                {/* Social buttons (kept) */}
                <div className="flex" style={{ gap: "18px" }}>
                    <button
                        type="button"
                        className="flex-1 flex items-center justify-center font-medium"
                        style={{
                            height: "48px",
                            borderRadius: '12px',
                            background: '#4285F4', // Google blue
                            color: '#fff',
                            boxShadow: '0 6px 16px rgba(66, 133, 244, 0.35)',
                            border: 'none',
                            gap: '10px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.85 : 1,
                            transition: 'transform 0.1s ease',
                        }}
                        onClick={handleGoogleLogin}
                        onMouseDown={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.99)'; }}
                        onMouseUp={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}
                        disabled={loading}
                    >
                        {GOOGLE_SVG}
                        <span>Continue with Google</span>
                    </button>

                    <button
                        type="button"
                        className="flex-1 flex items-center justify-center font-medium"
                        style={{
                            height: "48px",
                            borderRadius: '12px',
                            background: '#24292e', // GitHub black
                            color: '#fff',
                            boxShadow: '0 6px 16px rgba(36, 41, 46, 0.35)',
                            border: 'none',
                            gap: '10px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.85 : 1,
                            transition: 'transform 0.1s ease',
                        }}
                        onClick={handleGithubLogin}
                        onMouseDown={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.99)'; }}
                        onMouseUp={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}
                        disabled={loading}
                    >
                        {GITHUB_SVG}
                        <span>Continue with GitHub</span>
                    </button>
                </div>
                {/*register*/}
                <div className="form-section mt-2.5 text-sm">
                    <p>
                        Don't have an account?{' '}
                        <Link
                            to="/Register"
                            className="font-bold text-blue-600 underline hover:text-blue-700"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
                {/* Back */}
                <div style={{ marginTop: '26px', textAlign: 'center' }}>
                    <button
                        type="button"
                        onClick={handleBack}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#6b7280',
                            fontSize: '14px',
                            fontWeight: 500,
                            cursor: 'pointer',
                            textDecoration: 'underline',
                        }}
                        disabled={loading}
                    >
                        Go Back
                    </button>
                </div>

            </div>
        </div>
    );
}
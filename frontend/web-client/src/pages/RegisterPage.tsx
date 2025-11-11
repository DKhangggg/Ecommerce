import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import type { RegisterPayload } from "../types/auth.ts";
import { Dayjs } from "dayjs";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useAuth } from "../context/AuthContext.tsx";
import { CircularIndeterminate } from "../components/common/Loading.tsx";

const RegisterPage = () => {
  const [FirstName, setFirstName] = useState<string>("");

  const [LastName, setLastName] = useState<string>("");

  const [Email, setEmail] = useState<string>("");

  const [Password, setPassword] = useState<string>("");

  const [ConfirmPassword, setConfirmPassword] = useState<string>("");

  const [error, setError] = useState<string>("");

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [username, setUsername] = useState<string>("");

  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const [gender, setGender] = useState<string>("");

  const [dateOfBirth, setDateOfBirth] = useState<Dayjs | null>(null);
  const { register } = useAuth();
  const navigate = useNavigate();
  const [Loading, setLoading] = useState<Boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (Password !== ConfirmPassword) {
      setError("Mật khẩu không khớp. Vui lòng nhập lại!");
      return;
    }
    setLoading(true);
    setError("");
    const payload: RegisterPayload = {
      username: username,
      password: Password,
      email: Email,
      firstName: FirstName,
      lastName: LastName,
      phoneNumber: phoneNumber,
      gender: gender || null,
      dateOfBirth: dateOfBirth ? dateOfBirth.format("YYYY-MM-DD") : null,
    };
    try {
      await register(payload);
      navigate("/");
    } catch (err) {
      // 6. XỬ LÝ LỖI TỐT HƠN
      if (err instanceof Error) {
        if (err.message.includes("409")) {
          // 409 Conflict
          setError("Tên đăng nhập hoặc email đã tồn tại.");
        } else if (err.message.includes("400")) {
          // 400 Bad Request
          setError("Thông tin cung cấp không hợp lệ.");
        } else {
          setError("Đã có lỗi xảy ra. Vui lòng thử lại.");
        }
      } else {
        setError("Đã có lỗi không xác định.");
      }
    } finally {
      // 7. TẮT LOADING (LUÔN LUÔN)
      setLoading(false);
    }
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        {Loading ? (
          <CircularIndeterminate />
        ) : (
          <form
            className="w-full max-w-md bg-white p-6 rounded-2xl shadow"
            onSubmit={handleSubmit}
          >
            <div className="relative mb-4">
              <p className="text-2xl font-semibold text-slate-900">Register</p>
              {/* decorative dots: one static, one ping */}
              <span className="absolute left-0 top-0 inline-block w-4 h-4 rounded-full bg-royalblue" />
              <span className="absolute left-0 top-0 inline-block w-4 h-4 rounded-full bg-royalblue animate-ping opacity-60" />
            </div>

            <p className="text-sm text-gray-500 mb-4">
              Signup now and get full access to our app.
            </p>

            <div className="flex gap-2 mb-3">
              <input
                required
                placeholder="First name"
                type="text"
                className="flex-1 p-3 border rounded-lg outline-none"
                value={FirstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                required
                placeholder="Last name"
                type="text"
                className="flex-1 p-3 border rounded-lg outline-none"
                value={LastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                required
                placeholder="Email"
                type="email"
                className="w-full p-3 border rounded-lg outline-none"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                required
                placeholder="User Name"
                type="text"
                className="w-full p-3 border rounded-lg outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                required
                placeholder="Phone Number"
                type="tel"
                className="w-full p-3 border rounded-lg outline-none"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="flex gap-2 mb-3">
              <select
                required
                className="flex-1 p-3 border rounded-lg outline-none"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="" disabled hidden>
                  Gender
                </option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
              <div className="flex-1">
                <DateField
                  label="Date of Birth"
                  value={dateOfBirth}
                  onChange={(newValue) => setDateOfBirth(newValue)}
                  disableFuture
                  format="YYYY-MM-DD"
                  sx={{ width: "100%" }}
                />
              </div>
            </div>

            <div className="relative mb-3">
              <input
                required
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                className="w-full p-3 border rounded-lg outline-none"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                aria-label="toggle password"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>

            <div className="relative mb-3">
              <input
                required
                placeholder="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                className="w-full p-3 border rounded-lg outline-none"
                value={ConfirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                aria-label="toggle confirm password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible />
                ) : (
                  <AiOutlineEye />
                )}
              </button>
            </div>

            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}

            <button className="w-full bg-royalblue text-white py-3 rounded-lg mt-3">
              Submit
            </button>
            <p className="text-sm text-gray-500 text-center mt-3">
              Already have an account?{" "}
              <Link to="/login" className="text-royalblue underline">
                {" "}
                Signin
              </Link>
            </p>
          </form>
        )}
      </div>
    </LocalizationProvider>
  );
};

export default RegisterPage;

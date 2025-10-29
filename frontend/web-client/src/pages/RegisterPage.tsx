import React, {useState} from 'react';

import {Link, useNavigate} from "react-router-dom";

import styled from 'styled-components';

import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import type {RegisterPayload} from "../types/auth.ts";
import {Dayjs} from 'dayjs';
import {DateField, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {useAuth} from "../context/AuthContext.tsx";
import {CircularIndeterminate} from "../components/common/Loading.tsx";

const RegisterPage = () => {

    const [FirstName, setFirstName] = useState<string>("")

    const [LastName, setLastName] = useState<string>("")

    const [Email, setEmail] = useState<string>("")

    const [Password, setPassword] = useState<string>("")

    const [ConfirmPassword, setConfirmPassword] = useState<string>("");

    const [error, setError] = useState<string>("");

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [username, setUsername] = useState<string>("");

    const [phoneNumber, setPhoneNumber] = useState<string>("");

    const [gender, setGender] = useState<string>("");

    const [dateOfBirth, setDateOfBirth] = useState<Dayjs | null>(null);
    const {register} = useAuth();
    const navigate = useNavigate();
    const [Loading, setLoading] = useState<Boolean>(false)

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
            dateOfBirth: dateOfBirth ? dateOfBirth.format("YYYY-MM-DD") : null
        };
        try {
            await register(payload);
            navigate('/')
        } catch (err) {// 6. XỬ LÝ LỖI TỐT HƠN
            if (err instanceof Error) {
                if (err.message.includes("409")) { // 409 Conflict
                    setError("Tên đăng nhập hoặc email đã tồn tại.");
                } else if (err.message.includes("400")) { // 400 Bad Request
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
            <StyledWrapper>{Loading ? (<CircularIndeterminate></CircularIndeterminate>) : (
                <form className="form" onSubmit={handleSubmit}>
                    <p className="title">Register </p>
                    <p className="message">Signup now and get full access to our app. </p>
                    <div className="flex">
                        <label>
                            <input required placeholder="First name" type="text" className="input" value={FirstName}
                                   onChange={(e) => setFirstName(e.target.value)}/>
                        </label>
                        <label>
                            <input required placeholder="Last name" type="text" className="input" value={LastName}
                                   onChange={(e) => setLastName(e.target.value)}/>
                        </label>
                    </div>
                    <label>
                        <input required placeholder="Email" type="email" className="input" value={Email}
                               onChange={(e) => setEmail(e.target.value)}/>
                    </label>
                    <label>
                        <input required placeholder="User Name" type="text" className="input"
                               value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </label>
                    <label>
                        <input required placeholder="Phone Number" type="tel" className="input"
                               value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                    </label>
                    <div className="flex">
                        <label>
                            <select required className="input" value={gender}
                                    onChange={(e) => setGender(e.target.value)}>
                                <option value="" disabled hidden>Gender</option>
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                                <option value="OTHER">Other</option>
                            </select>
                        </label>
                        <label className="date-field-label">
                            <DateField
                                label="Date of Birth"
                                value={dateOfBirth}
                                onChange={(newValue) => setDateOfBirth(newValue)}
                                disableFuture
                                format="YYYY-MM-DD"
                                sx={{width: '100%'}}
                            />
                        </label>
                    </div>
                    <label>
                        <input required placeholder={Password} type={showPassword ? "text" : "password"}
                               className="input" value={Password}
                               onChange={(e) => setPassword(e.target.value)}/>
                        <span>Password</span>
                        <span className="password-icon" onClick={() => setShowPassword(!showPassword)}>{showPassword ?
                            <AiOutlineEyeInvisible/> : <AiOutlineEye/>}
</span>
                    </label>
                    <label>
                        <input required placeholder={ConfirmPassword} type={showConfirmPassword ? "text" : "password"}
                               className="input" value={ConfirmPassword}
                               onChange={(e) => setConfirmPassword(e.target.value)}/>
                        <span>Confirm password</span>
                        <span className="password-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>}
            </span>
                    </label>
                    {error && <p style={{color: 'red', fontSize: '14px', textAlign: 'center'}}>{error}</p>}
                    <button className="submit">Submit</button>
                    <p className="signin">Already have an acount ? <Link to="/login"> Signin</Link></p>
                </form>)}

            </StyledWrapper>
        </LocalizationProvider>
    );
}
const StyledWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #f0f2f5;

    .form {
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-width: 350px;
        background-color: #fff;
        padding: 20px;
        border-radius: 20px;
        position: relative;
    }

    .title {
        font-size: 28px;
        color: #2b2b2b;
        font-weight: 600;
        letter-spacing: -1px;
        position: relative;
        display: flex;
        align-items: center;
        padding-left: 30px;
    }

    .title::before, .title::after {
        position: absolute;
        content: "";
        height: 16px;
        width: 16px;
        border-radius: 50%;
        left: 0px;
        background-color: royalblue;
    }

    .title::before {
        width: 18px;
        height: 18px;
        background-color: royalblue;
    }

    .password-icon {
        position: absolute;
        top: 15px;
        right: 15px;
        cursor: pointer;
        color: #999;
        font-size: 1.25rem;
    }

    .title::after {
        width: 18px;
        height: 18px;
        animation: pulse 1s linear infinite;
    }

    .message, .signin {
        color: rgba(88, 87, 87, 0.822);
        font-size: 14px;
    }

    .signin {
        text-align: center;
    }

    .signin a {
        color: royalblue;
    }

    .signin a:hover {
        text-decoration: underline royalblue;
    }

    .flex {
        display: flex;
        width: 100%;
        gap: 6px;
    }

    .form label {
        position: relative;
    }

    .form label .input {
        width: 100%;
        padding: 10px 10px 20px 10px;
        outline: 0;
        border: 1px solid rgba(105, 105, 105, 0.397);
        border-radius: 10px;
    }

    .form label .input + span {
        position: absolute;
        left: 10px;
        top: 15px;
        color: grey;
        font-size: 0.9em;
        cursor: text;
        transition: 0.3s ease;
    }

    .form label .input:placeholder-shown + span {
        top: 15px;
        font-size: 0.9em;
    }

    .form label .input:focus + span, .form label .input:valid + span {
        top: 30px;
        font-size: 0.7em;
        font-weight: 600;
    }

    .form label .input:valid + span {
        color: green;
    }

    .submit {
        border: none;
        outline: none;
        background-color: royalblue;
        padding: 10px;
        border-radius: 10px;
        color: #fff;
        font-size: 16px;
    }

    .submit:hover {
        background-color: rgb(56, 90, 194);
    }

    @keyframes pulse {
        from {
            transform: scale(0.9);
            opacity: 1;
        }
        to {
            transform: scale(1.8);
            opacity: 0;
        }
    }`;
export default RegisterPage;
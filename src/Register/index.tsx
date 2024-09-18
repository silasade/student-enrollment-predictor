import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import {
  CreateUserWithEmailAndPassword,
  SignInWithGoogle,
} from "../firebase/auth";
import Alerts from "../global components/Alert";
import { Link, Navigate, useNavigate } from "react-router-dom";
import s from "./register.module.scss";
import clsx from "clsx";
import Line from "../../public/assets/images/Line 2.png";
type Inputs = {
  email: string;
  password: string;
};
function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error" | "warning" | "info";
  } | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await CreateUserWithEmailAndPassword(data.email, data.password);
      setAlert({ message: "Registration successful!", type: "success" });
      navigate("/login");
    } catch (error: any) {
      const errorMessage = error.message || "Registration failed";

      setAlert({ message: errorMessage, type: "error" });
    }
  };
  const googleSigin = async () => {
    try {
      await SignInWithGoogle();
      setAlert({ message: "Login successful!", type: "success" });
      navigate("/login");
    } catch (error: any) {
      const errorMessage = error.message || "Login failed";

      setAlert({ message: errorMessage, type: "error" });
    }
  };
  return (
    <div className={clsx(s.wrapper)}>
      <h3>Create an account</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        {alert && <Alerts message={alert.message} type={alert.type} />}
        <span>
          <input
            type="email"
            placeholder="Email Address"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </span>

        <span>
          <span className={clsx(s.passwordIcon)}>
            {showPassword ? (
              <EyeOutlined
                width={150}
                className={clsx(s.icon)}
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <EyeInvisibleOutlined
                className={clsx(s.icon)}
                onClick={() => setShowPassword(true)}
              />
            )}
          </span>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: /^[A-Za-z0-9]+$/i,
                message: "Password must contain only letters and numbers",
              },
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
          />
          {errors.password && (
            <span style={{ color: "red" }}>{errors.password.message}</span>
          )}
        </span>

        <button className={clsx(s.login)}>Continue</button>
      </form>
      <span className={s.account}>
        Already have an account? <Link to="/login">Login</Link>
      </span>
      <span className={clsx(s.or)}>
        <img
          width={"150px"}
          height={"1px"}
          src={`${process.env.PUBLIC_URL}/assets/images/Line 2.png`}
          alt="Line 2"
        />
        <p>Or</p>
        <img
          width={"150px"}
          height={"1px"}
          src={`${process.env.PUBLIC_URL}/assets/images/Line 2.png`}
          alt="Line 2"
        />
      </span>
      <span className={clsx(s.google)} onClick={googleSigin}>
        <img
          width={"32px"}
          height={"38px"}
          src={`${process.env.PUBLIC_URL}/assets/images/Google.png`}
          alt="Line 2"
        />
        <p> Continue with Google</p>
      </span>
    </div>
  );
}

export default Register;

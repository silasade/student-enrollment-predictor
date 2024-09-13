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
      navigate("/login")
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
        <h3>Create your account</h3>
      <button onClick={googleSigin}>Sigin With google</button>
      <form onSubmit={handleSubmit(onSubmit)}>
        {alert && <Alerts message={alert.message} type={alert.type} />}
        <span>
          <p>Email</p>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </span>

        <span>
          <p>Password</p>
          <span className={clsx(s.passwordIcon)}>
            {showPassword ? (
              <EyeOutlined onClick={() => setShowPassword(false)} />
            ) : (
              <EyeInvisibleOutlined onClick={() => setShowPassword(true)} />
            )}
          </span>
          <input
            type={showPassword ? "text" : "password"}
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
          {errors.password && <span style={{color:"red"}}>{errors.password.message}</span>}
        </span>

        <button className={clsx(s.login)}>Register</button>
      </form>
      <span>
        Don't have an account? <Link to="/login">Register your account</Link>
      </span>
    </div>
  );
}

export default Register;

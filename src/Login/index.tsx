import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { SignINithEmailAndPassword, SignInWithGoogle } from "../firebase/auth";
import Alerts from "../global components/Alert";
import { Navigate, useNavigate, Link } from "react-router-dom";
import s from "./Login.module.scss";
import clsx from "clsx";
type Inputs = {
  email: string;
  password: string;
};

function Login() {
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
      await SignINithEmailAndPassword(data.email, data.password);
      setAlert({ message: "Login successful!", type: "success" });
      navigate("/");
    } catch (error: any) {
      const errorMessage = error.message || "Login failed";

      setAlert({ message: errorMessage, type: "error" });
    }
  };
  const googleSigin = async () => {
    try {
      await SignInWithGoogle();
      setAlert({ message: "Login successful!", type: "success" });
    } catch (error: any) {
      const errorMessage = error.message || "Login failed";

      setAlert({ message: errorMessage, type: "error" });
    }
  };
  return (
    <div className={clsx(s.wrapper)}>
        <h3>Welcome back</h3>
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
           
        <button className={clsx(s.login)}>Login</button>
      </form>
      <span>
        Don't have an account? <Link to="/register">Register your account</Link>
      </span>
    </div>
  );
}

export default Login;

import React, { useState } from "react";
import "./UpdatePassword.css";
import { RotateCcwKey } from "lucide-react";
import { useForm } from "react-hook-form";
import Loader from "../pages/Loader";
import { updatePassword } from "../services/userService";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate;
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const handleUpdatePassword = async (data) => {
    setLoading(true);
    console.log(data);
    try {
      const response = await updatePassword(data);
      console.log(`response on update password - ${JSON.stringify(response)}`);
      alert("Password update successful !");
      reset();
      navigate("/login");
    } catch (error) {
      console.error("Login failed", error);
      alert(
        "Login failed: " + error?.response?.data?.message || "Server error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <form onSubmit={handleSubmit(handleUpdatePassword)}>
        <div className="hero bg-base-500 min-h-screen">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              <div className="card-body">
                <fieldset className="fieldset">
                  <label className="label">Email</label>
                  <input
                    {...register("email", {
                      required: { value: true, message: "Email is required" },
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Email format is incorrect",
                      },
                    })}
                    type="email"
                    className="input"
                    placeholder="Email"
                  />
                  {errors.email && (
                    <p className="error-msg">{errors.email.message}</p>
                  )}

                  <label className="label">Password</label>
                  <input
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Password is required",
                      },
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/,
                        message:
                          "Password should have uppercase, lowercase, special character and digit each",
                      },
                      minLength: {
                        value: 8,
                        message: "Minimum length required - 8",
                      },
                      maxLength: {
                        value: 30,
                        message: "Maximum length allowed - 30",
                      },
                    })}
                    type="password"
                    className="input"
                    placeholder="Enter new password"
                  />
                  {errors.password && (
                    <p className="error-msg">{errors.password.message}</p>
                  )}

                  <label className="label">Confirm Password</label>
                  <input
                    {...register("confirmPassword", {
                      required: {
                        value: true,
                        message: "Confirm password is required",
                      },
                      validate: (value) =>
                        value === password || "Passwords do not match",
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/,
                        message:
                          "Password should have uppercase, lowercase, special character and digit each",
                      },
                      minLength: {
                        value: 8,
                        message: "Minimum length required - 8",
                      },
                      maxLength: {
                        value: 30,
                        message: "Maximum length allowed - 30",
                      },
                    })}
                    type="password"
                    className="input"
                    placeholder="Confirm password"
                  />
                  {errors.confirmPassword && (
                    <p className="error-msg">
                      {errors.confirmPassword.message}
                    </p>
                  )}

                  <button type="submit" className="btn btn-neutral mt-4">
                    Update Password <RotateCcwKey />
                  </button>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default UpdatePassword;

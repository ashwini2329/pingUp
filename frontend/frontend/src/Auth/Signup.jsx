import React, { useState } from "react";
import { LogIn } from "lucide-react";
import { UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./Signup.css";
import { signUpUser } from "../services/userService";
import Loader from "../pages/Loader";

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigateToSignIn = () => {
    navigate("/login");
  };

  const handleSignUp = async (data) => {
    setLoading(true);
    try {
      const response = await signUpUser(data);
      alert(`Signup successful! - ${response}`);
      reset();
      navigate("/login");
    } catch (error) {
      console.error("Signup failed", error);
      alert(
        "Signup failed: " + error?.response?.data?.message || "Server error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {isLoading && <Loader />}
      <form onSubmit={handleSubmit(handleSignUp)}>
        <div className="hero bg-base-500 min-h-screen">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              <div className="card-body">
                <button
                  onClick={navigateToSignIn}
                  className="btn bg-black text-white border-black"
                >
                  Back to Login <LogIn />
                </button>
                <fieldset className="fieldset">
                  <label className="label">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="input"
                    placeholder="Name"
                    {...register("name", {
                      required: { value: true, message: "Name is required" },
                      pattern: {
                        value: /^[A-Za-z\s]+$/,
                        message: "Name format is incorrect",
                      },
                      minLength: {
                        value: 3,
                        message: "Minimum 3 characters required",
                      },
                    })}
                  />
                  {errors.name && (
                    <p className="error-msg">{errors.name.message}</p>
                  )}

                  <label className="label">Email</label>
                  <input
                    type="email"
                    className="input"
                    placeholder="Email"
                    {...register("email", {
                      required: { value: true, message: "Email is required" },
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Email format is incorrect",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="error-msg">{errors.email.message}</p>
                  )}

                  <label className="label">Password</label>
                  <input
                    type="password"
                    className="input"
                    placeholder="Password"
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
                  />
                  {errors.password && (
                    <p className="error-msg">{errors.password.message}</p>
                  )}

                  <label className="label">Phone</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Phone"
                    {...register("phone", {
                      required: { value: true, message: "Phone is required" },
                      pattern: {
                        value: /^[6-9]\d{9}$/,
                        message: "Phone format is incorrect",
                      },
                    })}
                  />
                  {errors.phone && (
                    <p className="error-msg">{errors.phone.message}</p>
                  )}

                  <button type="submit" className="btn btn-neutral mt-4">
                    Register <UserPlus />
                  </button>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;

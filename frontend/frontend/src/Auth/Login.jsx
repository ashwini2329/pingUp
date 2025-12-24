import React, { useState } from "react";
import { LogIn } from "lucide-react";
import { UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginUser } from "../services/userService";
import Loader from "../pages/Loader";

const Login = () => {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigateToSignUp = () => {
    navigate("/signup"); // Replace with your desired route
  };

  const navigateToUpdatePassword = () => {
    navigate("/updatePassword"); // navigate to update password page
  };

  const handleLogin = async (data) => {
    setLoading(true);
    try {
      const response = await loginUser(data);
      console.log(`response on login --- ${JSON.stringify(response)}`);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("profileId", response.data.user.id);
      alert("Login successful!");
      reset();
      navigate("/home");
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
    <div>
      {isLoading && <Loader />}
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="hero bg-base-500 min-h-screen">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              <div className="card-body">
                <button
                  onClick={navigateToSignUp}
                  className="btn bg-black text-white border-black"
                >
                  New User <UserPlus />
                </button>
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
                    placeholder="Password"
                  />
                  {errors.password && (
                    <p className="error-msg">{errors.password.message}</p>
                  )}
                  <div>
                    <a
                      onClick={navigateToUpdatePassword}
                      className="link link-hover"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <button type="submit" className="btn btn-neutral mt-4">
                    Login <LogIn />
                  </button>
                </fieldset>
                {/* Google */}
                <button className="btn bg-white text-black border-[#e5e5e5]">
                  <svg
                    aria-label="Google logo"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <g>
                      <path d="m0 0H512V512H0" fill="#fff"></path>
                      <path
                        fill="#34a853"
                        d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                      ></path>
                      <path
                        fill="#4285f4"
                        d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                      ></path>
                      <path
                        fill="#fbbc02"
                        d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                      ></path>
                      <path
                        fill="#ea4335"
                        d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                      ></path>
                    </g>
                  </svg>
                  Login with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;

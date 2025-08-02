import { React, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { X } from "lucide-react"; // or use any icon
import Loader from "../pages/Loader";
import "./EditProfile.css";
import { Send } from "lucide-react";
import { updateUser } from "../services/userService";

const EditProfile = () => {
  const navigate = useNavigate();
  const [hobbies, setHobbies] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState("");

  const [hobbyInput, setHobbyInput] = useState("");
  const { state } = useLocation();
  const [isLoading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [userData, setUserData] = useState(state?.userData || null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (file && allowedTypes.includes(file.type)) {
      setSelectedFile(file);
      setFileError("");
    } else {
      setSelectedFile(null);
      setFileError("Only JPG, PNG, and WEBP image files are allowed.");
    }
  };

  const addHobby = () => {
    const trimmed = hobbyInput.trim();
    if (trimmed && !hobbies.includes(trimmed) && hobbies.length < 5) {
      setHobbies([...hobbies, trimmed]);
      setHobbyInput("");
    }
  };

  useEffect(() => {
    if (!userData) {
      // Optional: Fallback fetch if needed
      // fetchUserDetails(id).then(res => setUserData(res.data));
    }
    console.log(`userData - ${JSON.stringify(userData)}`);
  }, [userData]);

  if (!userData) {
    return <Loader />;
  }

  const removeHobby = (hobbyToRemove) => {
    setHobbies(hobbies.filter((hobby) => hobby !== hobbyToRemove));
  };

  const handleCancel = () => {
    navigate(-1); // Goes back to previous page
  };

  const handleUpdateUser = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("about", data.about);
      formData.append("phone", data.phone);
      formData.append("linkedin", data.linkedin);
      formData.append("github", data.github);
      formData.append("twitter", data.twitter);
      formData.append("portfolio", data.portfolio);

      console.log("data.profileImage", data.profileImage);
      if (selectedFile) {
        formData.append("profileImage", selectedFile);
      }

      hobbies.forEach((hobby, index) => {
        formData.append(`hobbies[${index}]`, hobby);
      });
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      const response = await updateUser(formData);
      console.log(`response == ${response}`);
      alert(`Update profile successful! - ${response}`);
      reset();
      navigate("/home");
    } catch (error) {
      console.error(`error -- ${error}`);
      alert(
        "Update profile failed: " + error?.response?.data?.message ||
          "Server error"
      );
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 bg-base-100">
      {/* Top Section with Close Icon */}
      {isLoading && <Loader />}
      <div className="w-full max-w-2xl relative">
        <button
          onClick={handleCancel}
          className="absolute right-0 top-0 text-gray-600 hover:text-red-500"
          title="Close"
        >
          <X size={24} />
        </button>
        {/* Edit Form Card */}
        <div className="card bg-base-200 shadow-xl p-6 mt-8">
          <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
          <form onSubmit={handleSubmit(handleUpdateUser)} className="space-y-4">
            {/* Input fields */}
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full"
              value={userData.name}
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
            {errors.name && <p className="error-msg">{errors.name.message}</p>}

            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              value={userData.email}
              {...register("email", {
                required: { value: true, message: "Email is required !" },
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Email format is incorrect",
                },
              })}
            />
            {errors.email && (
              <p className="error-msg">{errors.email.message}</p>
            )}

            <textarea
              placeholder="About"
              className="textarea textarea-bordered w-full"
              value={userData.about}
              {...register("about", {
                required: { value: true, message: "About is required !" },
                minLength: {
                  value: 50,
                  message: "About should not be less than 50 chars",
                },
                maxLength: {
                  value: 400,
                  message: "About should not be more than 500 chars",
                },
              })}
            ></textarea>
            {errors.about && (
              <p className="error-msg">{errors.about.message}</p>
            )}

            <input
              type="tel"
              placeholder="Phone Number"
              className="input input-bordered w-full"
              value={userData.phone}
              {...register("phone", {
                required: { value: true, message: "Phone is required !" },
                length: {
                  value: 10,
                  message: "Phone should be of 10 digits !",
                },
              })}
            />
            {errors.phone && (
              <p className="error-msg">{errors.phone.message}</p>
            )}

            <input
              type="url"
              placeholder="LinkedIn URL"
              className="input input-bordered w-full"
              value={userData.socials.linkedin}
              {...register("linkedin", {
                required: { value: true, message: "LinkedIn URL is required" },
                pattern: {
                  value: /^https?:\/\/(www\.)?linkedin\.com\/.*$/i,
                  message: "Enter a valid LinkedIn profile URL",
                },
              })}
            />
            {errors.linkedin && (
              <p className="error-msg">{errors.linkedin.message}</p>
            )}

            <input
              type="url"
              placeholder="GitHub URL"
              value={userData.socials.github}
              className="input input-bordered w-full"
              {...register("github", {
                required: { value: true, message: "GitHub URL is required" },
                pattern: {
                  value: /^https?:\/\/(www\.)?github\.com\/[A-Za-z0-9_-]+$/i,
                  message: "Enter a valid GitHub profile URL",
                },
              })}
            />
            {errors.github && (
              <p className="error-msg">{errors.github.message}</p>
            )}

            <input
              type="url"
              placeholder="Twitter URL"
              value={userData.socials.twitter}
              className="input input-bordered w-full"
              {...register("twitter", {
                required: { value: true, message: "Twitter URL is required" },
                pattern: {
                  value: /^https?:\/\/(www\.)?twitter\.com\/[A-Za-z0-9_]+$/i,
                  message: "Enter a valid Twitter profile URL",
                },
              })}
            />
            {errors.twitter && (
              <p className="error-msg">{errors.twitter.message}</p>
            )}

            <input
              type="url"
              placeholder="Portfolio URL"
              className="input input-bordered w-full"
              value={userData.socials.portfolio}
              {...register("portfolio", {
                required: { value: true, message: "Portfolio URL is required" },
                pattern: {
                  value:
                    /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w-./?%&=]*)?$/i,
                  message: "Enter a valid Portfolio URL",
                },
              })}
            />
            {errors.portfolio && (
              <p className="error-msg">{errors.portfolio.message}</p>
            )}

            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full"
              onChange={handleFileChange}
            />
            {fileError && <p className="text-red-500">{fileError}</p>}

            {/* Hobbies Input */}
            <div>
              <label className="block text-sm font-medium mb-1">Hobbies</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={hobbyInput}
                  onChange={(e) => setHobbyInput(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="Enter a hobby"
                />
                <button
                  type="button"
                  onClick={addHobby}
                  className="btn btn-accent"
                  disabled={hobbies.length >= 5}
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setHobbies([])}
                  className="btn btn-error text-white"
                  disabled={hobbies.length === 0}
                >
                  Remove All
                </button>
              </div>

              {hobbies.length >= 5 && (
                <p className="text-sm text-red-500 mb-2">
                  You can only add up to 5 hobbies.
                </p>
              )}

              {hobbies.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {hobbies.map((hobby, index) => (
                    <div
                      key={index}
                      className="badge badge-outline badge-lg flex items-center gap-1"
                    >
                      {hobby}
                      <button
                        type="button"
                        onClick={() => removeHobby(hobby)}
                        className="ml-1 text-red-500 hover:text-red-700"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={handleCancel}
                className="btn btn-outline btn-error"
              >
                Cancel <X />
              </button>
              <button type="submit" className="btn btn-primary">
                Save <Send />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default EditProfile;

import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react"; // or use any icon
const EditProfile = () => {
  const navigate = useNavigate();
  const [hobbies, setHobbies] = useState([]);
  const [hobbyInput, setHobbyInput] = useState("");

  const addHobby = () => {
    const trimmed = hobbyInput.trim();
    if (trimmed && !hobbies.includes(trimmed)) {
      setHobbies([...hobbies, trimmed]);
      setHobbyInput("");
    }
  };

  const removeHobby = (hobbyToRemove) => {
    setHobbies(hobbies.filter((hobby) => hobby !== hobbyToRemove));
  };
  const handleCancel = () => {
    navigate(-1); // Goes back to previous page
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Your save logic here
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 bg-base-100">
      {/* Top Section with Close Icon */}
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
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input fields */}
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full"
            />
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
            />
            <textarea
              placeholder="About"
              className="textarea textarea-bordered w-full"
            ></textarea>
            <input
              type="tel"
              placeholder="Phone Number"
              className="input input-bordered w-full"
            />
            <input
              name="linkedin"
              type="url"
              placeholder="LinkedIn URL"
              className="input input-bordered w-full"
            />
            <input
              name="github"
              type="url"
              placeholder="GitHub URL"
              className="input input-bordered w-full"
            />
            <input
              name="twitter"
              type="url"
              placeholder="Twitter URL"
              className="input input-bordered w-full"
            />
            <div>
              <label className="block text-sm font-medium mb-1">
                Profile Image
              </label>
              <input
                name="profileImage"
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full"
              />
            </div>

            {/* Hobbies Input */}
            <div>
              <label className="block text-sm font-medium mb-1">Hobbies</label>
              <div className="flex gap-2">
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
                >
                  Add
                </button>
              </div>
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
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default EditProfile;

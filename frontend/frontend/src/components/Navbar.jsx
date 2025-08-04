import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../services/userService";

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const closeDropdown = () => setIsDropdownOpen(false);

  const handleNavigate = (path) => {
    navigate(path);
    closeDropdown();
  };

  const handleLogout = () => {
    localStorage.clear("token");
    navigate("/login");
    closeDropdown();
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDetails = await getUserDetails();
        console.log(`userDetailsNavbar -- ${JSON.stringify(userDetails)}`);
        setProfilePhoto(userDetails.data.message.profilePhoto);
        console.log(`profilephoto -- ${profilePhoto}`);
      } catch (error) {
        console.error(`error while fetching user details - ${error}`);
      }
    };
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (profilePhoto) {
      console.log("Updated profilePhoto:", profilePhoto);
    }
  }, [profilePhoto]);

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <a
            onClick={() => handleNavigate("/home")}
            className="btn btn-ghost text-xl"
          >
            PingUp
          </a>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />

          {/* Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Avatar"
                  src={
                    profilePhoto
                      ? `http://localhost:5000/uploads/${profilePhoto}`
                      : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>
            </button>

            {isDropdownOpen && (
              <ul className="menu menu-sm absolute right-0 mt-3 w-52 bg-base-100 rounded-box shadow z-10">
                <li>
                  <a
                    onClick={() =>
                      handleNavigate(
                        `/home/profile/${localStorage.getItem("profileId")}`
                      )
                    }
                  >
                    Profile
                  </a>
                </li>
                <li>
                  <a onClick={() => handleNavigate("/home/settings")}>
                    Settings
                  </a>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUserDetails, getUserDetails } from "../services/userService";
import { UserRoundPlus } from "lucide-react";
import UserProfileModal from "../components/UserProfileModal";
import { GlobeLock } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const searchWrapperRef = useRef(null);
  const avatarDropdownRef = useRef(null);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const closeDropdown = () => setIsDropdownOpen(false);

  const handleNavigate = (path) => {
    navigate(path);
    closeDropdown();
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const allUsersList = await getAllUserDetails();
      console.log(
        `allUsersList -- ${JSON.stringify(allUsersList.data.message)}`
      );
      setAllUsers(allUsersList.data.message);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close search results if clicked outside
      if (
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(event.target)
      ) {
        setFilteredUsers([]);
      }

      // Close avatar dropdown if clicked outside
      if (
        avatarDropdownRef.current &&
        !avatarDropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = allUsers.filter((user) =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filtered);
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
        setProfilePhoto(userDetails.data.message.profilePhoto);
      } catch (error) {
        console.error(`error while fetching user details - ${error}`);
      }
    };
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {}, [profilePhoto]);

  const openProfileModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const sendFriendRequest = () => {};

  return (
    <div>
      {showModal && (
        <UserProfileModal
          user={selectedUser}
          onClose={() => setShowModal(false)}
        />
      )}
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
          <div ref={searchWrapperRef}>
            <input
              type="text"
              placeholder="Search User"
              className="input input-bordered w-24 md:w-auto"
              value={searchTerm}
              onChange={handleSearch}
            />
            {filteredUsers.length > 0 && (
              <div className="absolute top-16 right-4 bg-base-200 border border-base-300 shadow-lg rounded-lg px-3 py-2 w-full max-w-xs z-50 max-h-96 overflow-y-auto">
                {filteredUsers.map((user) => (
                  <div
                    key={user._id}
                    className="flex items-center justify-between gap-2 p-2 rounded-md hover:bg-base-300 transition"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <img
                        src={`http://localhost:5000/uploads/${user.profilePhoto}`}
                        alt="dp"
                        className="w-8 h-8 rounded-full object-cover border border-base-300"
                      />
                      <span className="truncate font-medium text-sm text-base-content">
                        {user.name}
                      </span>
                      <span>
                        {user.isPrivate === true ? <GlobeLock /> : ""}
                      </span>
                    </div>

                    <div className="flex gap-1 items-center shrink-0">
                      <button
                        className="btn btn-xs btn-outline px-2 min-w-fit"
                        onClick={() => openProfileModal(user)}
                      >
                        View Profile
                      </button>
                      <button
                        className="btn btn-xs btn-primary px-2 min-w-fit"
                        onClick={() => sendFriendRequest(user._id)}
                      >
                        <UserRoundPlus />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Dropdown */}
          <div className="relative" ref={avatarDropdownRef}>
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

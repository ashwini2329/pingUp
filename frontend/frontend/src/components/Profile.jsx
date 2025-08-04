import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../services/userService";
import Loader from "../pages/Loader";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDetails = await getUserDetails();
        console.log(`userDetails -- ${JSON.stringify(userDetails)}`);
        setUserData(userDetails.data.message);
      } catch (error) {
        console.error(`error while fetching user details - ${error}`);
      }
    };
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editProfile = (path, userData) => {
    navigate(path, { state: { userData } });
  };

  // Dummy user data (replace with actual state or props)
  const user = {
    profileImage:
      "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001884.png",
  };

  if (!userData) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col items-center p-6">
      {/* Circular Profile Image */}
      <div className="avatar mb-4">
        <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img
            src={
              userData.profilePhoto
                ? `http://localhost:5000/uploads/${userData.profilePhoto}`
                : `${user.profileImage}`
            }
            alt="Profile"
          />
        </div>
      </div>

      {/* Card with Details */}
      <div className="card w-full md:w-1/2 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center text-2xl font-semibold">
            {userData.name}
          </h2>
          <p className="text-sm text-gray-500 mb-2">{userData.about}</p>

          <div className="mt-2 space-y-1 text-sm">
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              <strong>Phone:</strong> {userData.phone}
            </p>
            <p>
              <strong>GitHub:</strong>{" "}
              <a
                className="link text-blue-600"
                href={userData.socials.github}
                target="_blank"
                rel="noreferrer"
              >
                {userData.socials.github}
              </a>
            </p>
            <p>
              <strong>LinkedIn:</strong>{" "}
              <a
                className="link text-blue-600"
                href={userData.socials.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                {userData.socials.linkedin}
              </a>
            </p>
            <p>
              <strong>Twitter:</strong>{" "}
              <a
                className="link text-blue-600"
                href={userData.socials.twitter}
                target="_blank"
                rel="noreferrer"
              >
                {userData.socials.twitter}
              </a>
            </p>
            <p>
              <strong>Portfolio :</strong>{" "}
              <a
                className="link text-blue-600"
                href={userData.socials.portfolio}
                target="_blank"
                rel="noreferrer"
              >
                {userData.socials.portfolio}
              </a>
            </p>
          </div>

          <div className="card-actions justify-end mt-4">
            <button
              className="btn btn-primary"
              onClick={() =>
                editProfile(
                  `/home/edit-profile/${localStorage.getItem("profileId")}`,
                  userData
                )
              }
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

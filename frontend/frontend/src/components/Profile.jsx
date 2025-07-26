import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const editProfile = (path) => {
    navigate(path);
  };

  // Dummy user data (replace with actual state or props)
  const user = {
    name: "Ashwini Kumar",
    email: "ashwini@example.com",
    about: "MEAN Stack Developer | Poet | Bike Lover",
    phone: "+91-9876543210",
    profileImage:
      "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001884.png",
    social: {
      github: "https://github.com/ashwini",
      linkedin: "https://linkedin.com/in/ashwini",
    },
  };

  return (
    <div className="flex flex-col items-center p-6">
      {/* Circular Profile Image */}
      <div className="avatar mb-4">
        <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src={user.profileImage} alt="Profile" />
        </div>
      </div>

      {/* Card with Details */}
      <div className="card w-full md:w-1/2 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center text-2xl font-semibold">
            {user.name}
          </h2>
          <p className="text-sm text-gray-500 mb-2">{user.about}</p>

          <div className="mt-2 space-y-1 text-sm">
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <p>
              <strong>GitHub:</strong>{" "}
              <a
                className="link text-blue-600"
                href={user.social.github}
                target="_blank"
                rel="noreferrer"
              >
                {user.social.github}
              </a>
            </p>
            <p>
              <strong>LinkedIn:</strong>{" "}
              <a
                className="link text-blue-600"
                href={user.social.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                {user.social.linkedin}
              </a>
            </p>
          </div>

          <div className="card-actions justify-end mt-4">
            <button
              className="btn btn-primary"
              onClick={() =>
                editProfile(
                  `/home/edit-profile/${localStorage.getItem("profileId")}`
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

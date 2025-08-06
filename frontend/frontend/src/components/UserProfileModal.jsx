import React from "react";
import { UserRoundPlus } from "lucide-react";
import { EarthLock } from "lucide-react";

const UserProfileModal = ({ user, onClose }) => {
  const sendFriendRequest = async (receiverId) => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/friends/send-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${yourAuthToken}`,
          },
          body: JSON.stringify({ receiverId }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Friend request sent successfully!");
      } else {
        alert(data.message || "Failed to send request.");
      }
    } catch (error) {
      console.error("Error sending friend request:", error);
      alert("Something went wrong.");
    }
  };

  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
      <div className="bg-base-100 rounded-xl shadow-lg w-full max-w-md p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Profile Picture & Name */}
        <div className="flex flex-col items-center text-center">
          <img
            src={`http://localhost:5000/uploads/${user.profilePhoto}`}
            alt="Profile"
            className="w-24 h-24 rounded-full border border-base-300 object-cover"
          />
          <h2 className="text-xl font-semibold mt-3">{user.name}</h2>
          <p className="text-sm text-base-content mt-1">
            {user.about || "No bio provided."}
          </p>
        </div>

        {!user.isPrivate && (
          <>
            {/* Phone */}
            <div className="mt-5">
              <h3 className="text-md font-semibold mb-1">Phone</h3>
              <p className="text-sm text-base-content">{user.phone || "N/A"}</p>
            </div>

            <div className="flex flex-col items-center justify-center w-full gap-5">
              {/* Socials - Horizontal layout */}
              {user.socials && Object.keys(user.socials).length > 0 && (
                <div className="mt-4">
                  <h3 className="text-md font-semibold mb-2">Socials</h3>
                  <div className="flex flex-wrap gap-3">
                    {Object.entries(user.socials).map(([platform, link]) => (
                      <a
                        key={platform}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline bg-base-300 px-3 py-1 rounded-full"
                      >
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </a>
                    ))}
                  </div>
                </div>
              )}
              {/* Hobbies - Horizontal layout */}
              {user.hobbies && user.hobbies.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-md font-semibold mb-2">Hobbies</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.hobbies.map((hobby, index) => (
                      <span
                        key={index}
                        className="bg-base-300 px-3 py-1 rounded-full text-xs text-base-content"
                      >
                        {hobby}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Send Friend Request Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => sendFriendRequest(user._id)}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            Add Friend <UserRoundPlus size={16} />
          </button>
        </div>
        <div className="mt-6 flex justify-center">
          {user.isPrivate && (
            <p className="mt-3 text-center text-xs italic text-base-content/60 tracking-wide shadow-inner">
              <span className="inline-flex items-center gap-1">
                This account is private <EarthLock />
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;

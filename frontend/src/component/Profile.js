import React, { useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext"; // Assuming this is where your AuthContext is defined
import { useNavigate } from "react-router-dom";
import ProfileImage from "./ProfileImage"; // Import the new ProfileImage component

const Profile = () => {
  const { userdata, isLoading, error } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Profile userdata:', userdata); // Check the structure of userdata
  }, [userdata]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg text-gray-700">
        Loading...
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg text-gray-700">
        Error loading data: {error}
      </div>
    );
  }
  if (!userdata) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg text-gray-700">
        Please log in to view your profile.
      </div>
    );
  }

  const displayName = userdata.displayName || "Unknown User";
  return (
    <div className="py-8 w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden">
          {/* Profile Header */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
              {/* Profile Image */}
              <ProfileImage displayName={displayName}  className = "w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-xl" />
              <div className="text-center md:text-left">
                <h1 className="text-2xl font-bold text-black">
                  {userdata.displayName || "User Name"}
                </h1>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-600">Email</p>
                <p className="font-medium">{userdata.email || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600">Phone Number</p>
                <p className="font-medium">{userdata.phonenumber || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600">Experience Level</p>
                <p className="font-medium">{userdata.experience || "Not Available"}</p>
              </div>
              <div>
                 <p className="text-gray-600">Risk Appetite</p>
                <p className="font-medium">{userdata.risk || "Not Available"}</p>
              </div>

            </div>
          </div>

          {/* Edit Profile Button */}
        </div>
      </div>
    </div>
  );
};

export default Profile;

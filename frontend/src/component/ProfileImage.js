// import React from "react";

// // Function to generate a random background color
// const getRandomColor = () => {
//   const colors = [
//     "bg-blue-500",
//   ];
//   const randomIndex = Math.floor(Math.random() * colors.length);
//   return colors[randomIndex];
// };

// const ProfileImage = ({ displayName }) => {
//     // Split the displayName into first and last names
//     const nameParts = displayName ? displayName.split(" ") : [];
//     const firstInitial = nameParts[0]?.charAt(0).toUpperCase() || "?";
//     const lastInitial = nameParts[1]?.charAt(0).toUpperCase() || "?";
  
//     return (
//       <div
//         className={`${getRandomColor()} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xl`}
//       >
//         {firstInitial}{lastInitial}
//       </div>
//     );
//   };
  

// export default ProfileImage;

import React from "react";

// Function to generate a random background color
const getRandomColor = () => {
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-red-500",
    "bg-yellow-500",
    "bg-purple-500",
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const ProfileImage = ({ displayName}) => {
  // Split the displayName into first and last names
  const nameParts = displayName ? displayName.split(" ") : [];
  
  // Extract initials with proper fallbacks
  const firstInitial = nameParts[0]?.charAt(0).toUpperCase() || "?";
  const lastInitial = nameParts.length > 1 ? nameParts[1]?.charAt(0).toUpperCase() : "";

  return (
    <div
      className={`${getRandomColor()} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xl`}
    >
      {firstInitial}{lastInitial}
    </div>
  );
};

export default ProfileImage;
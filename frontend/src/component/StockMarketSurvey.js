import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const StockMarketSurvey = () => {
  const [step, setStep] = useState(1);
  const [experience, setExperience] = useState("");
  const [risk, setRisk] = useState("");
  const navigate = useNavigate();

  const handleExperienceSubmit = () => {
    if (experience) {
      setStep(2);
    } else {
      alert("Please select an option.");
    }
  };

  const { userdata, setUserdata } = useContext(AuthContext); // Ensure you have access to context

  const handleRiskSubmit = async () => {
    if (risk) {
      const userData = { experience, risk };
  
      try {
        const response = await fetch("http://localhost:6005/submit-data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });
  
        const result = await response.json();
        console.log("API response:", result); // ✅ Check what we are receiving
  
        if (response.ok) {
          localStorage.setItem("userdata", JSON.stringify(result)); // ✅ Save to localStorage
          setUserdata(result); // ✅ Update context
          console.log("Updated User Context:", result);
          navigate("/stockcrypto");
        } else {
          alert(result.message || "An error occurred.");
        }
      } catch (error) {
        console.error("Error submitting data:", error);
        alert("Failed to submit data. Please try again.");
      }
    } else {
      alert("Please select an option.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {step === 1 && (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            How much experience do you have in the stock market?
          </h2>
          <div className="space-y-3">
            {["Beginner", "Intermediate", "Advanced"].map((level) => (
              <button
                key={level}
                onClick={() => setExperience(level)}
                className={`w-full py-2 px-4 rounded-lg ${
                  experience === level
                    ? "bg-customBlue text-black"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
          <button
            onClick={handleExperienceSubmit}
            className="mt-4 w-full bg-customBlue  text-black py-2 px-4 rounded-lg"
          >
            Submit
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            What is your risk-taking capacity?
          </h2>
          <div className="space-y-3">
            {["Basic", "Moderate", "Advanced"].map((level) => (
              <button
                key={level}
                onClick={() => setRisk(level)}
                className={`w-full py-2 px-4 rounded-lg ${
                  risk === level
                    ? "bg-customBlue text-black"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
          <button
            onClick={handleRiskSubmit}
            className="mt-4 w-full bg-customBlue  text-black py-2 px-4 rounded-lg"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default StockMarketSurvey;

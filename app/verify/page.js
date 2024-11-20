// pages/verify.js
"use client";
import { useState } from "react";
import Header from "../components/Header";

export default function Verify() {
  const [selectedOption, setSelectedOption] = useState("ID");
  const [tin, setTin] = useState("");
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleFileChange = (e, setFile) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  return (
    <Header>
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white text-black">
        <h1 className="text-2xl font-bold mb-4">Verify Your Identity</h1>

        <div className="max-w-2xl text-center mb-8">
          <p className="mb-4">
            To complete your verification, please choose one of the following
            document types and upload the front and back images. Make sure the
            images are clear and all details are visible.
          </p>
          <p>
            You will also need to provide your Tax Identification Number (TIN)
            as part of the verification process.
          </p>
        </div>

        {/* TIN input */}
        <div className="w-full max-w-md mb-4">
          <input
            type="text"
            placeholder="Enter your Tax Identification Number (TIN)"
            value={tin}
            onChange={(e) => setTin(e.target.value)}
            className="p-2 w-full rounded-md bg-gray-200 border"
          />
        </div>

        {/* Document selection buttons */}
        <div className="flex space-x-4 mb-6 mt-8">
          <button
            className={`p-2 ${
              selectedOption === "ID"
                ? "border-b-2 border-blue text-black"
                : "text-black"
            }`}
            onClick={() => handleOptionClick("ID")}
          >
            ID
          </button>
          <button
            className={`p-2 ${
              selectedOption === "Residence Permit"
                ? "border-b-2 border-blue text-black"
                : "bg-gray-300 text-black"
            }`}
            onClick={() => handleOptionClick("Residence Permit")}
          >
            Residence Permit
          </button>
          <button
            className={`p-2  ${
              selectedOption === "Passport"
                ? "border-b-2 border-blue text-black"
                : "bg-gray-300 text-black"
            }`}
            onClick={() => handleOptionClick("Passport")}
          >
            Passport
          </button>
          <button
            className={`p-2 ${
              selectedOption === "Drivers License"
                ? "border-b-2 border-blue text-black"
                : "bg-gray-300 text-black"
            }`}
            onClick={() => handleOptionClick("Drivers License")}
          >
            Driver's License
          </button>
        </div>

        {/* Show file upload fields if a document type is selected */}
        {selectedOption && (
          <div className="w-full max-w-md">
            {/* Front image upload */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Upload Front of {selectedOption}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, setFrontImage)}
                className="block w-full p-2 bg-gray-200 rounded-md"
              />
            </div>

            {/* Back image upload */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Upload Back of {selectedOption}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, setBackImage)}
                className="block w-full p-2 bg-gray-200 rounded-md"
              />
            </div>

            {/* Submit button */}
            <button
              className="bg-blue text-white p-2 rounded-md w-full font-semibold mt-4"
              onClick={() => {
                if (!tin || !frontImage || !backImage) {
                  alert("Please complete all fields before submitting.");
                } else {
                  // Handle the file and TIN submission logic here
                  alert("Verification submitted successfully!");
                }
              }}
            >
              Submit Verification
            </button>
          </div>
        )}
      </div>
    </Header>
  );
}

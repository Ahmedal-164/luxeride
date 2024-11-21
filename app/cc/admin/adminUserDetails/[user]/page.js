"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import BackendApi from "../../../../components/BackendApi"; // Adjust the import path to your API utility

const AdminUserdetails = () => {
  const router = useRouter();
  const user = JSON.parse(router.query.user || "{}"); // Parse the user data from the query parameter

  const [formData, setFormData] = useState({
    Id: user._id || "",
    firstname: user.firstname || "",
    lastname: user.lastname || "",
    email: user.email || "",
    balance: user.balance || "",
    status: user.status || "active",
    stakingBalance: user.stakingBalance || "",
    securityPhrase: user.securityPhrase || [],
    staking: user.staking || [],
    transactions: user.transactions || [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleArrayChange = (arrayName, index, e) => {
    const { name, value } = e.target;
    const updatedArray = [...formData[arrayName]];
    updatedArray[index] = { ...updatedArray[index], [name]: value };
    setFormData((prevData) => ({
      ...prevData,
      [arrayName]: updatedArray,
    }));
  };

  const handleSave = async () => {
    const data = {
      userId: formData.Id,
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      balance: formData.balance,
      status: formData.status,
    };
    try {
      await axios.post(`${BackendApi}/adminEdituser`, data);
      toast.success("User details updated successfully");
    } catch (error) {
      toast.error("Error updating user details");
    }
  };

  if (!user || !user._id) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <h2 className="text-xl font-bold">User not found</h2>
        <button
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 bg-blue-500 rounded hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6">Edit User</h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-1">First Name:</label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Last Name:</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Balance:</label>
          <input
            type="number"
            name="balance"
            value={formData.balance}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Fixed Capital:</label>
          <input
            type="number"
            name="stakingBalance"
            value={formData.stakingBalance}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
          >
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>

        {/* Fixed Capital Transactions */}
        <div>
          <h3 className="text-lg font-bold mb-3">
            Fixed Capital Transactions:
          </h3>
          {formData.staking.map((stake, index) => (
            <div key={index} className="p-3 bg-gray-800 rounded mb-4">
              <p>Amount: ${stake.amount}</p>
              <p>Days: {stake.days}</p>
              <p>Rate: {stake.rate}%</p>
              <div className="mt-2">
                <label className="block text-sm mb-1">Status:</label>
                <select
                  name="status"
                  value={stake.status}
                  onChange={(e) => handleArrayChange("staking", index, e)}
                  className="w-full p-2 rounded bg-gray-700 border border-gray-600"
                >
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          ))}
        </div>

        {/* Transactions */}
        <div>
          <h3 className="text-lg font-bold mb-3">Transactions:</h3>
          {formData.transactions.map((transaction, index) => (
            <div key={index} className="p-3 bg-gray-800 rounded mb-4">
              <p>Type: {transaction.type}</p>
              <p>Amount: ${transaction.amount}</p>
              <p>Profit: ${transaction.profit}</p>
              <div className="mt-2">
                <label className="block text-sm mb-1">Status:</label>
                <select
                  name="status"
                  value={transaction.status}
                  onChange={(e) => handleArrayChange("transactions", index, e)}
                  className="w-full p-2 rounded bg-gray-700 border border-gray-600"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                </select>
              </div>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full py-2 bg-blue-500 rounded text-white hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AdminUserdetails;

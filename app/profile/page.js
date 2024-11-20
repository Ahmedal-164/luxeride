// pages/dashboard/profile.js
"use client";
import DashboardLayout from "../components/DashboardLayout";
import Image from "next/image";
import { useState, useEffect } from "react";
import user from "../images/usericon.jpeg";
import axios from "axios";
import BackendApi from "../components/BackendApi";
import { getUserToken } from "../components/storage";
import { FaCheckCircle } from "react-icons/fa"; // Icon for verified status
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userData, setUserData] = useState({});
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userToken = await getUserToken();
        setToken(userToken);
      } catch (error) {
        console.error("Error retrieving token:", error);
      }
    };

    fetchData();
  }, []);

  const getData = async () => {
    const data = { token };
    try {
      const response = await axios.post(`${BackendApi}/userdata`, data);
      setUserData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (token) {
      const interval = setInterval(() => {
        getData();
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [token]);

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Handle password change logic here
    alert("Password successfully changed!");
  };

  return (
    <DashboardLayout>
      <h1 className="text-xl font-bold mb-6 text-black">Profile</h1>

      <div className="flex flex-col items-center space-y-4">
        {/* User profile picture */}
        <Image
          src={user}
          alt="User Profile Picture"
          width={100}
          height={100}
          className="rounded-full"
        />

        {/* Verified status */}
        <div className="flex items-center space-x-2">
          {userData.status == "verified" ? (
            <div className="flex items-center text-green">
              <FaCheckCircle className="mr-2" />
              <span>Verified</span>
            </div>
          ) : (
            <button
              className="bg-blue p-2 rounded-md text-white font-semibold"
              onClick={() => router.push("/verify")}
            >
              Verify Account
            </button>
          )}
        </div>

        {/* Profile form */}
        <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder={userData.firstname || "First Name"}
            className="p-2 border border-black rounded text-black w-full"
            defaultValue={userData.firstname}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, firstname: e.target.value }))
            }
          />
          <input
            type="text"
            placeholder={userData.lastname || "Last Name"}
            className="p-2 border border-black rounded text-black w-full"
            defaultValue={userData.lastname}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, lastname: e.target.value }))
            }
          />
          <input
            type="email"
            placeholder={userData.email || "Email"}
            className="p-2 border border-black rounded text-black w-full"
            defaultValue={userData.email}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          <input
            type="text"
            placeholder={userData.gender || "Gender"}
            className="p-2 border border-black rounded text-black w-full"
            defaultValue={userData.gender}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, gender: e.target.value }))
            }
          />
          <input
            type="text"
            placeholder={userData.phone || "Phone Number"}
            className="p-2 border border-black rounded text-black w-full"
            defaultValue={userData.phone}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, phone: e.target.value }))
            }
          />
          <input
            type="text"
            placeholder={userData.country || "Country"}
            className="p-2 border border-black rounded text-black w-full"
            defaultValue={userData.country}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, country: e.target.value }))
            }
          />
          <input
            type="password"
            placeholder="New Password"
            className="p-2 border border-black rounded text-white w-full"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="p-2 border border-black rounded text-white w-full"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {/* Change Password Button */}
        <button
          className="bg-blue p-2 rounded-md text-white w-full font-semibold mt-4"
          onClick={handleChangePassword}
        >
          Save Changes
        </button>
      </div>
    </DashboardLayout>
  );
}

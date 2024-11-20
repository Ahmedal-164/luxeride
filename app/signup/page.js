"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import BackendApi from "../components/BackendApi";
import background from "../images/car3.jpeg"; // Replace with your background image

const Signup = () => {
  const router = useRouter();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      toast.error("Please fill out all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/;
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    const data = {
      firstname,
      lastname,
      email,
      password,
      role: "user",
    };

    setLoading(true);

    try {
      const response = await axios.post(`${BackendApi}/register`, data);
      if (response.data.status === "ok") {
        toast.success(response.data.data);
        setFirstname("");
        setLastname("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        toast.error(response.data.data);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.data);
      } else {
        toast.error("Registration error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Header>
      <div
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center min-h-fit py-36"
        style={{ backgroundImage: `url(${background.src})` }}
      >
        <ToastContainer />
        {/* Dark overlay to dim the background */}
        <div className="absolute inset-0 bg-black opacity-60 z-0"></div>

        {/* Sign-up Form Container */}
        <div className="relative z-10 w-full max-w-md bg-opacity-90 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-6 text-white">
            Create a LuxeRide Account
          </h2>

          <form className="mt-12" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="First Name"
              className="w-full p-3 mb-4 bg-gray-200 rounded-lg text-black focus:outline-none border"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full p-3 mb-4 bg-gray-200 rounded-lg text-black focus:outline-none border"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 mb-4 bg-gray-200 rounded-lg text-black focus:outline-none border"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 mb-4 bg-gray-200 rounded-lg text-black focus:outline-none border"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-3 mb-4 bg-gray-200 rounded-lg text-black focus:outline-none border"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="submit"
              className="w-full p-3 bg-gold rounded-lg text-white font-bold"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Register"}
            </button>
          </form>

          <p className="text-gray-400 mt-6 text-center text-sm">
            Already have an account?
            <span
              className="text-gold cursor-pointer ml-2"
              onClick={() => router.push("/login")}
            >
              Sign in here
            </span>
          </p>
        </div>
      </div>
    </Header>
  );
};

export default Signup;

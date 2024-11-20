// pages/dashboard/withdrawal.js
"use client";
import { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import axios from "axios";
import BackendApi from "../components/BackendApi";
import { getUserToken } from "../components/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Withdrawal() {
  const [amount, setAmount] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountBank, setAccountBank] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("bank");
  const [userData, setUserData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
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
        // console.log(token);
      } catch (error) {
        console.error("Error retrieving token:", error);
      }
    };

    fetchData();
  }, []);

  const getData = async () => {
    const data = {
      token,
    };
    try {
      // console.log(token);
      const response = await axios.post(`${BackendApi}/userdata`, data);
      setUserData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (token) {
      const interval = setInterval(() => {
        setRefreshing(true);
        getData();
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [token]);

  const handleConfirmClick = async () => {
    if (amount < 10000) {
      toast.error("Minimum amount for withdrawal is ₦10,000");
      return;
    }

    if (userData.totalBalance < amount) {
      toast.error("Insufficient balance");
      return;
    }

    const data = {
      userId: userData._id,
      name: userData.firstname,
      amount,
      type: "withdrawal",
      accountNumber,
      accountBank,
    };

    try {
      const response = await axios.post(`${BackendApi}/transaction`, data);
      toast.success("Your withdrawal will be confirmed ");
    } catch (error) {
      toast.error("Deposit error", error);
    }
  };

  return (
    <DashboardLayout>
      <ToastContainer />
      <div className="py-6 text-black">
        {/* Amount and Wallet Address Section */}
        <section className="mb-6">
          <h1 className="text-xl font-bold mb-4 text-center">Withdraw Funds</h1>

          {/* Coin Selection */}
          <select
            value={selectedMethod}
            onChange={(e) => setSelectedMethod(e.target.value)}
            className="w-full p-2 border border-black rounded text-black mb-4 mt-4"
          >
            <option value="bank">Bank Transfer</option>
          </select>

          {/* Amount Input */}
          <input
            type="text"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full p-2 mb-4 border border-black rounded bg-background text-black mt-8"
          />

          {/* Wallet Address Input */}
          <input
            type="text"
            placeholder="Enter Account Number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="w-full p-2 mb-4 border border-black rounded bg-background text-black mt-8"
          />

          <input
            type="text"
            placeholder="Enter Account Bank"
            value={accountBank}
            onChange={(e) => setAccountBank(e.target.value)}
            className="w-full p-2 mb-4 border border-black rounded bg-background text-black mt-8"
          />

          {/* Continue Button */}
          <button
            onClick={handleConfirmClick}
            className="p-2 w-full bg-blue text-white rounded-lg mt-8"
          >
            Continue
          </button>
        </section>

        {/* Confirmation Modal */}
        {/* {isModalOpen && (
          <Modal
            title="Confirm Withdrawal"
            onClose={handleCloseModal}
          >
            <p>Amount: ${amount}</p>
            <p>Coin: {selectedCoin === "usdt" ? "USDT" : "Bitcoin (BTC)"}</p>
            <p>Wallet Address: {walletAddress}</p>
            <div className="mt-4">
              <button
                onClick={handleCloseModal}
                className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg mr-4"
              >
                Cancel
              </button>
              <button className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg">
                Confirm
              </button>
            </div>
          </Modal>
        )} */}
      </div>
    </DashboardLayout>
  );
}

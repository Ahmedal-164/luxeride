"use client";
import { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import axios from "axios";
import BackendApi from "../components/BackendApi";
import { getUserToken } from "../components/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Deposit() {
  const [amount, setAmount] = useState();
  const [userData, setUserData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const bankDetails = {
    accountNumber: "5800169187",
    accountName: "KINGSLEY ALEXANDER",
    bankName: "Moniepoint MFB",
  };

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
    const data = {
      token,
    };
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
        setRefreshing(true);
        getData();
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [token]);

  const handleConfirmClick = async () => {
    const data = {
      userId: userData._id,
      name: userData.firstname,
      amount,
      type: "deposit",
    };

    try {
      const response = await axios.post(`${BackendApi}/transaction`, data);
      toast.success("Your deposit will be confirmed.");
    } catch (error) {
      toast.error("Deposit error", error);
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    })
      .format(amount)
      .replace("NGN", "₦");
  };

  // List of amounts to display
  const amounts = [1000, 2000, 5000, 10000, 20000, 50000];

  return (
    <DashboardLayout>
      <ToastContainer />
      <div className="py-6 text-black">
        {/* Amount Selection Section */}
        <section className="mb-6">
          <h1 className="text-xl font-bold mb-4">Select Amount to Deposit</h1>
          <div className="grid grid-cols-3 gap-4 mb-4">
            {amounts.map((amt) => (
              <div
                key={amt}
                onClick={() => setAmount(Number(amt))}
                className={`cursor-pointer p-4 bg-gray-800 text-center rounded-lg border ${
                  amount === amt ? "border-gold" : "border-transparent"
                } hover:border-blue-500`}
              >
                <p className="text-base font-bold">{formatAmount(amt)}</p>
              </div>
            ))}
          </div>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full p-2 mb-4 border border-black rounded text-black mt-10"
          />
        </section>

        {/* Bank Deposit Section */}
        <section className="bg-white2 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-black">
            Bank Deposit Details
          </h2>
          <p className="mb-2 text-black">
            <strong>Account Number:</strong> {bankDetails.accountNumber}
          </p>
          <p className="mb-2 text-black">
            <strong>Account Name:</strong> {bankDetails.accountName}
          </p>
          <p className="mb-4 text-black">
            <strong>Bank Name:</strong> {bankDetails.bankName}
          </p>
          <p className="text-red-500 text-sm">
            <strong>Warning:</strong> Please ensure the deposit is made using a
            bank account name that matches your sign-up name to avoid delays in
            confirmation.
          </p>
          <button
            className="p-2 bg-blue text-white rounded-lg mt-6"
            onClick={handleConfirmClick}
          >
            Deposit Made
          </button>
        </section>
      </div>
    </DashboardLayout>
  );
}

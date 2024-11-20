"use client";

import { useEffect, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import axios from "axios";
import { getUserToken } from "../../../components/storage";
import BackendApi from "../../../components/BackendApi";
import moment from "moment";
import Image from "next/image";
import {
  FaArrowDown,
  FaArrowUp,
  FaWallet,
  FaChartLine,
  FaCoins,
} from "react-icons/fa";

export default function Overview() {
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    totalBalance: 0,
    totalInvestment: 0,
    totalReturn: 0,
    portfolio: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const updateCurrentTime = () => {
      setCurrentTime(new Date());
    };
    const timer = setInterval(updateCurrentTime, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const greeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const fetchData = async () => {
    try {
      const userToken = await getUserToken();
      setToken(userToken);
    } catch (error) {
      console.error("Error retrieving token:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.post(`${BackendApi}/userdata`, { token });
      const fetchedData = response.data.data;
      setUserData({
        firstname: fetchedData.firstname || "",
        lastname: fetchedData.lastname || "",
        totalBalance: fetchedData.totalBalance || 0,
        totalInvestment: fetchedData.totalInvestment || 0,
        totalReturn: fetchedData.totalReturn || 0,
        transactions: (fetchedData.transactions || []).reverse(),
        portfolio: (fetchedData.portfolio || []).reverse(),
      });
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) getData();
  }, [token]);

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    })
      .format(amount)
      .replace("NGN", "₦");
  };

  const [numUsers, setNumUsers] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${BackendApi}/allUsers`);
        setNumUsers(response.data.length);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`${BackendApi}/allTransaction`);
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-8 bg-white text-black">
        {/* Greeting and Date Section */}
        <div className=" justify-between items-center lg:flex">
          <h1 className="text-xl text-black font-semibold">
            {greeting()}, Admin {userData.firstname}
          </h1>
          <p className="text-gray-500">
            {moment(currentTime).format("dddd, MMMM D, YYYY")}
          </p>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Total Balance Card */}
          <div className="bg-white2 shadow-lg p-6 rounded-lg text-center flex justify-center">
            <FaChartLine className="text-5xl text-blue mb-2 self-center" />
            <div className="ml-12">
              <p className="text-base text-black">Total Users</p>
              <h2 className="text-2xl font-bold text-black mt-2">{numUsers}</h2>
            </div>
          </div>

          {/* Total Investment Card */}
          <div className="bg-white2 shadow-lg p-6 rounded-lg text-center flex justify-center">
            <FaCoins className="text-5xl text-orange mb-2" />
            <div className="ml-12">
              <p className="text-base text-black">Total Deposit</p>
              <h2 className="text-2xl font-bold text-black mt-2">
                {formatAmount(userData.totalInvestment)}
              </h2>
            </div>
          </div>
          <div className="bg-white2 shadow-lg p-6 rounded-lg text-center flex justify-center">
            <FaCoins className="text-5xl text-orange mb-2" />
            <div className="ml-12">
              <p className="text-base text-black">Total Withdrawal</p>
              <h2 className="text-2xl font-bold text-black mt-2">
                {formatAmount(userData.totalInvestment)}
              </h2>
            </div>
          </div>
        </div>

        {/* Transactions and Cars Invested Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Transaction Details */}
          <div>
            <h2 className="text-xl font-semibold text-black">
              Recent Transactions
            </h2>
            <div className="space-y-4 text-black mt-4">
              {transactions.slice(0, 5).map((transaction, index) => (
                <div
                  key={index}
                  className={`bg-white2 p-4 rounded-lg shadow-md flex items-center justify-between transition-transform transform hover:scale-105 ${
                    transaction.type === "deposit"
                      ? "border-l-4 border-green"
                      : "border-l-4 border-red"
                  }`}
                >
                  {/* Icon and Label */}
                  <div className="flex items-center space-x-4">
                    {transaction.type === "deposit" ? (
                      <FaArrowDown className="text-green text-2xl" />
                    ) : (
                      <FaArrowUp className="text-red text-2xl" />
                    )}
                    <div>
                      <h2 className="text-lg font-semibold text-gray-700">
                        {transaction.type}
                      </h2>
                      <p className="text-gray-500">
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Amount */}
                  <div>
                    <p
                      className={`text-xl font-bold ${
                        transaction.type === "deposit"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {formatAmount(transaction.amount)}
                    </p>
                    <p
                      style={{
                        color:
                          transaction.status == "confirmed"
                            ? "green"
                            : "orange",
                      }}
                    >
                      {transaction.status}
                    </p>
                  </div>
                </div>
              ))}
              {transactions.length === 0 && (
                <tr className="text-gray-500 border-t border-gray-200">
                  <td className="py-2" colSpan="3">
                    No transactions available
                  </td>
                </tr>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

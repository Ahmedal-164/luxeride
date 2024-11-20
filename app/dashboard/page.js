"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import axios from "axios";
import { getUserToken } from "../components/storage";
import BackendApi from "../components/BackendApi";
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
    transactions: [],
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

  return (
    <DashboardLayout>
      <div className="space-y-8 bg-white text-black">
        {/* Greeting and Date Section */}
        <div className=" justify-between items-center lg:flex">
          <h1 className="text-xl text-black font-semibold">
            {greeting()}, {userData.firstname}
          </h1>
          <p className="text-gray-500">
            {moment(currentTime).format("dddd, MMMM D, YYYY")}
          </p>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Total Balance Card */}
          <div className="bg-white2 shadow-lg p-6 rounded-lg text-center flex justify-center">
            <FaWallet className="text-5xl text-blue mb-2 self-center" />
            <div className="ml-12">
              <p className="text-base text-black">Total Balance</p>
              <h2 className="text-2xl font-bold text-black mt-2">
                {formatAmount(userData.totalBalance)}
              </h2>
            </div>
          </div>

          {/* Total Investment Card */}
          <div className="bg-white2 shadow-lg p-6 rounded-lg text-center flex justify-center">
            <FaChartLine className="text-5xl text-green mb-2" />
            <div className="ml-12">
              <p className="text-base text-black">Total Investment</p>
              <h2 className="text-2xl font-bold text-black mt-2">
                {formatAmount(userData.totalInvestment)}
              </h2>
            </div>
          </div>

          {/* Total Return Card */}
          <div className="bg-white2 shadow-lg p-6 rounded-lg text-center flex justify-center">
            <FaCoins className="text-5xl text-orange mb-2" />
            <div className="ml-12">
              <p className="text-base text-black">Total Return</p>
              <h2 className="text-2xl font-bold text-black mt-2">
                {formatAmount(userData.totalReturn)}
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
              {userData.transactions.slice(0, 3).map((transaction, index) => (
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
              {userData.transactions.length === 0 && (
                <tr className="text-gray-500 border-t border-gray-200">
                  <td className="py-2" colSpan="3">
                    No transactions available
                  </td>
                </tr>
              )}
            </div>
          </div>

          {/* Cars Invested In */}
          <div className="text-black">
            <h2 className="text-xl font-semibold text-black">
              Cars Invested In
            </h2>
            <div className="mt-4 space-y-4">
              {userData.portfolio.length === 0 ? (
                <p className="text-gray-400">No assets available.</p>
              ) : (
                userData.portfolio.slice(0, 3).map((asset, index) => (
                  <div
                    key={index}
                    className="bg-white2 rounded-lg shadow-md p-4 mb-4"
                  >
                    <div className="flex items-center space-x-4">
                      <Image
                        src={asset.picture}
                        alt={asset.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="flex-1">
                        <h2 className="text-xl font-semibold">{asset.name}</h2>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-gray-600">
                        Percentage: {asset.share}%
                      </p>
                      <p className="text-gray-600">
                        Price: {formatAmount(asset.amount)}
                      </p>
                      <p className="text-green-600">
                        Estimated Profit: {formatAmount(asset.profit)}/Day
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

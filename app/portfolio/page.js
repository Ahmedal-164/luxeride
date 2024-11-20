// pages/portfolio.js
"use client";
import DashboardLayout from "../components/DashboardLayout";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import BackendApi from "../components/BackendApi";
import { getUserToken } from "../components/storage";

export default function Portfolio() {
  const [userData, setUserData] = useState({ portfolio: [] });
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
      const fetchedData = response.data.data;
      setUserData({
        portfolio: fetchedData.portfolio || [],
      });
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
      <h1 className="text-2xl font-bold mb-6 text-black">
        Investment Portfolio
      </h1>

      {/* Table for larger screens */}
      <div className="overflow-x-auto hidden lg:block bg-white2 rounded-lg shadow-md p-8">
        <table className="min-w-full text-center">
          <thead className="bg-blue-500 text-black">
            <tr>
              <th className="p-4 border-b border-gray-200">Picture</th>
              <th className="p-4 border-b border-gray-200">Name</th>
              <th className="p-4 border-b border-gray-200">Percentage</th>
              <th className="p-4 border-b border-gray-200">Price</th>
              <th className="p-4 border-b border-gray-200">Estimated Profit</th>
              <th className="p-4 border-b border-gray-200">Order Date</th>
            </tr>
          </thead>
          <tbody>
            {userData.portfolio.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-6 text-gray-400">
                  No assets available.
                </td>
              </tr>
            ) : (
              userData.portfolio.map((asset, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 transition-colors text-black"
                >
                  <td className="p-4 border-b border-gray-200">
                    <Image
                      src={asset.picture}
                      alt={asset.name}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                  </td>
                  <td className="p-4 border-b border-gray-200 text-gray-700">
                    {asset.name}
                  </td>
                  <td className="p-4 border-b border-gray-200 text-gray-600">
                    {asset.share}%
                  </td>
                  <td className="p-4 border-b border-gray-200 text-gray-600">
                    {formatAmount(asset.amount)}
                  </td>
                  <td className="p-4 border-b border-gray-200 text-green-600">
                    {formatAmount(asset.profit)}
                  </td>
                  <td className="p-4 border-b border-gray-200 text-gray-500">
                    {new Date(asset.startDate).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Responsive View: Card Layout */}
      <div className="lg:hidden grid grid-cols-1 gap-4 text-black">
        {userData.portfolio.length === 0 ? (
          <p className="text-gray-400">No assets available.</p>
        ) : (
          userData.portfolio.map((asset, index) => (
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
                <p className="text-gray-600">Percentage: {asset.share}%</p>
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
    </DashboardLayout>
  );
}

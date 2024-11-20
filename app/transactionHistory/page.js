// pages/dashboard/transaction-history.js
"use client";
import DashboardLayout from "../components/DashboardLayout";
import { useState, useEffect } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import axios from "axios";
import BackendApi from "../components/BackendApi";
import { getUserToken } from "../components/storage";

export default function TransactionHistory() {
  const [userData, setUserData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [token, setToken] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
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
      const fetchedTransactions = response.data.data.transactions || [];
      setTransactions(fetchedTransactions.reverse()); // Assuming transactions are nested in response.data.data.transactions
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); // Set loading to false on error
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
      <h1 className="text-xl font-bold mb-6 text-black">Transaction History</h1>

      <div className="space-y-4 text-black">
        {loading ? (
          <p style={{ textAlign: "center", fontSize: 16 }}>Loading...</p>
        ) : transactions.length === 0 ? (
          <p style={{ textAlign: "center", fontSize: 16 }}>No transactions</p>
        ) : (
          transactions.map((transaction, index) => (
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
                      transaction.status == "confirmed" ? "green" : "orange",
                  }}
                >
                  {transaction.status}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}

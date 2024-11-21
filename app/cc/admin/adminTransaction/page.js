"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import BackendApi from "../../../components/BackendApi";
import AdminLayout from "../../../components/AdminLayout";
// import EditTransactionModal from "../components/EditTransactionModal";

const AdminTransact = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`${BackendApi}/allTransaction`); // Update with the correct API route
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  const handleEditClick = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const closeModal = () => {
    setSelectedTransaction(null);
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-900 text-white">
        <div>
          <h1 className="text-2xl font-bold mb-4 text-black">
            User Transactions
          </h1>

          {/* Table for Desktop */}
          <div className="hidden lg:block overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-gray-700 text-gray-300">
                <tr>
                  <th className="p-3 text-black">ID</th>
                  <th className="p-3 text-black">Name</th>
                  <th className="p-3 text-black">Type</th>
                  <th className="p-3 text-black">Amount</th>
                  <th className="p-3 text-black">Method</th>
                  <th className="p-3 text-black">Address</th>
                  <th className="p-3 text-black">Status</th>
                  <th className="p-3 text-black">Edit</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-gray-700 hover:bg-gray-700 text-black"
                  >
                    <td className="p-3">{transaction.userId.slice(-5)}</td>
                    <td className="p-3">
                      {transaction.name} {transaction.lname}
                    </td>
                    <td className="p-3">{transaction.type}</td>
                    <td className="p-3">{transaction.amount}</td>
                    <td className="p-3">{transaction.method}</td>
                    <td className="p-3">{transaction.address}</td>
                    <td className="p-3 flex items-center">
                      <span
                        className={`h-2 w-2 rounded-full mr-2 ${
                          transaction.status === "confirmed"
                            ? "bg-green"
                            : "bg-orange"
                        }`}
                      ></span>
                      {transaction.status}
                    </td>
                    <td className="p-3">
                      <FaEdit
                        onClick={() => handleEditClick(transaction)}
                        className="cursor-pointer text-xl hover:text-gray-400 text-bluey"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card View for Mobile */}
          <div className="lg:hidden space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="bg-gray-800 rounded-lg p-4 shadow-lg"
              >
                <div className="flex justify-end">
                  <FaEdit
                    onClick={() => handleEditClick(transaction)}
                    className="cursor-pointer text-xl hover:text-gray-400 text-bluey mb-2"
                  />
                </div>
                <div className="flex justify-between mb-2 text-black">
                  <span className="font-semibold">ID:</span>
                  <span>{transaction.userId.slice(-5)}</span>
                </div>
                <div className="flex justify-between mb-2 text-black">
                  <span className="font-semibold">Name:</span>
                  <span>
                    {transaction.name} {transaction.lname}
                  </span>
                </div>
                <div className="flex justify-between mb-2 text-black">
                  <span className="font-semibold">Type:</span>
                  <span>{transaction.type}</span>
                </div>
                <div className="flex justify-between mb-2 text-black">
                  <span className="font-semibold">Amount:</span>
                  <span>{transaction.amount}</span>
                </div>
                <div className="flex justify-between mb-2 text-black">
                  <span className="font-semibold">Method:</span>
                  <span>{transaction.method}</span>
                </div>
                <div className="flex justify-between mb-2 text-black">
                  <span className="font-semibold">Address:</span>
                  <span>{transaction.address}</span>
                </div>
                <div className="flex justify-between items-center mb-2 text-black">
                  <span className="font-semibold">Status:</span>
                  <div className="flex items-center">
                    <span
                      className={`h-2 w-2 rounded-full mr-2 ${
                        transaction.status === "confirmed"
                          ? "bg-green"
                          : "bg-orange"
                      }`}
                    ></span>
                    {transaction.status}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Modal */}
          {/* {selectedTransaction && (
            <EditTransactionModal
              transaction={selectedTransaction}
              closeModal={closeModal}
            />
          )} */}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminTransact;

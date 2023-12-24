import { useGetTransaction } from "../hooks/useGetTransaction";

import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { format, formatDistanceToNow } from "date-fns";

import EditTransaction from "./EditTransaction";
import { useState } from "react";

const TransactionList = () => {
  const [showModal, setShowModal] = useState(false);
  const [EditTransactionId, setEditTransactionId] = useState(null);

  const { transactions, setTransactions, deleteTransaction } =
    useGetTransaction();

  const handleDelete = async (id) => {
    await deleteTransaction(id);
    const filterTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    );

    setTransactions(filterTransactions);
  };

  const handleClose = () => {
    setShowModal(false);
    setEditTransactionId(null);
  };

  const handleUpdate = (id) => {
    setEditTransactionId(id);
    setShowModal(true);
  };

  return (
    <>
      {Array.isArray(transactions) &&
        transactions.map((transaction) => {
          const { desc, amount, transactionType, id, createdAt } = transaction;

          // Convert createdAt to a formatted date string
          const formattedDate =
            createdAt &&
            format(new Date(createdAt.seconds * 1000), "d MMMM yyyy");

          // Calculate the relative time
          const relativeTime =
            createdAt &&
            formatDistanceToNow(new Date(createdAt.seconds * 1000), {
              addSuffix: true,
            });

          return (
            <div
              className="bg-slate-300 rounded p-1 shadow-green-100 shadow-md"
              key={id}
            >
              <p>
                <span className="font-semibold text-md">
                  Transaction Type:{" "}
                </span>
                <span
                  className="uppercase font-semibold"
                  style={{
                    color: transactionType === "expense" ? "red" : "green",
                  }}
                >
                  {transactionType}
                </span>
              </p>
              <h3>Description: {desc}</h3>
              <div className="flex justify-start items-center gap-1">
                <h3>Amount: {amount}</h3>
                <FaBangladeshiTakaSign className="text-orange-600" />
              </div>
              <div className="flex gap-2 items-center justify-between">
                <p className="text-xs text-yellow-600">{formattedDate}</p>
                <p className="text-sm bg-yellow-500 text-white font-semibold rounded-tl-sm rounded-bl-3xl pl-4">
                  {relativeTime}
                </p>
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="relative group">
                  <FaEdit
                    onClick={() => handleUpdate(id)}
                    className="text-xl text-black cursor-pointer"
                  />
                  <div className="absolute inset-y-0 left-8 flex justify-center items-end opacity-0 group-hover:opacity-100 transition duration-150 ease-in-out text-md sm:text-lg text-green-800 font-semibold">
                    Edit
                  </div>
                  <EditTransaction
                    onId={EditTransactionId}
                    visible={showModal}
                    onClose={handleClose}
                  />
                </div>
                <div className="relative group">
                  <MdDelete
                    onClick={() => handleDelete(id)}
                    className="text-xl text-red-400 hover:text-red-500 cursor-pointer"
                  />
                  <div className="absolute inset-y-0 right-8 flex justify-center items-end opacity-0 group-hover:opacity-100 transition duration-150 ease-in-out text-md sm:text-lg text-red-800 font-semibold">
                    Delete
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default TransactionList;

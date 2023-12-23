import PropTypes from "prop-types";
import { useState } from "react";

import { useAddTransaction } from "../hooks/useAddTransaction";

import Spinner from "./Spinner";
import { toast } from "react-toastify";

const TransactionModal = ({ visible, onClose }) => {
  const { addTransaction } = useAddTransaction();

  const [transactionData, setTransactionData] = useState({
    desc: "",
    amount: 0,
    transactionType: "expense",
  });

  const [loading, setLoading] = useState(false);

  if (!visible) return null;

  const handleClose = (e) => {
    if (e.target.id === "container") onClose();
  };

  const { desc, amount, transactionType } = transactionData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransactionData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      addTransaction({
        amount,
        desc,
        transactionType,
      });
      setLoading(false);
      {
        loading && <Spinner />;
      }
      setTransactionData({
        desc: "",
        amount: "",
      });
      onClose();
      toast.success("Transaction is added");
      console.log(transactionData);
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <div
      id="container"
      onClick={handleClose}
      className="bg-white fixed inset-0 bg-opacity-[0.01] backdrop-blur-sm flex justify-center items-center"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded p-2 shadow-lg space-y-1"
      >
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Transaction Details</h3>
          <button
            className="text-2xl font-bold text-red-400 hover:text-red-600"
            onClick={onClose}
          >
            X
          </button>
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold" htmlFor="desc">
            Description
          </label>
          <input
            className="border border-solid border-blue-600 py-1 px-3 rounded focus:outline-none focus:border-2 focus:border-solid focus:border-blue-800 transition duration-150 ease-out placeholder:italic"
            value={desc}
            onChange={handleChange}
            type="text"
            name="desc"
            id="desc"
            placeholder="house rent"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold" htmlFor="amount">
            Amount
          </label>
          <input
            className="border border-solid border-blue-600 py-1 px-3 rounded focus:outline-none focus:border-2 focus:border-solid focus:border-blue-800 transition duration-150 ease-out placeholder:italic"
            value={amount}
            onChange={handleChange}
            type="number"
            name="amount"
            id="amount"
            placeholder="1000 tk"
            required
            min={0}
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="space-x-1">
            <input
              type="radio"
              name="transactionType"
              id="expense"
              value="expense"
              checked={transactionType === "expense"}
              required={!transactionType}
              onChange={handleChange}
            />
            <label
              className="text-md font-semibold text-red-400 hover:text-red-500 transition duration-150 ease-in-out"
              htmlFor="expense"
            >
              Expense
            </label>
          </div>
          <div className="space-x-1">
            <input
              type="radio"
              name="transactionType"
              id="income"
              value="income"
              checked={transactionType === "income"}
              required={!transactionType}
              onChange={handleChange}
            />
            <label
              className="text-md font-semibold text-green-400 hover:text-green-500 transition duration-150 ease-in-out"
              htmlFor="income"
            >
              Income
            </label>
          </div>
        </div>
        <button
          className="bg-orange-500  w-full rounded text-white uppercase font-semibold px-3 py-1 shadow hover:bg-orange-600 hover:shadow-lg active:bg-orange-700 transition duration-150 ease-in-out"
          type="submit"
        >
          Save Transaction
        </button>
      </form>
    </div>
  );
};

TransactionModal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.bool,
};

export default TransactionModal;

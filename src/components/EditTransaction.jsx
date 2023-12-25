import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { useGetTransaction } from "../hooks/useGetTransaction";
import { useGetUserInfo } from "../hooks/useGetUserInfo";

import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";

const EditTransaction = ({ visible, onClose, onId }) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const { userId } = useGetUserInfo();

  const { setTransactions } = useGetTransaction();

  const [transactionData, setTransactionData] = useState({
    desc: "",
    amount: "",
    transactionType: "expense",
  });

  useEffect(() => {
    if (onId && userId !== auth.currentUser.uid) {
      toast.error("You cannot edit!");
      navigate("/");
    }
  }, [auth.currentUser.uid, navigate, userId, onId]);

  useEffect(() => {
    const fetchTransaction = async () => {
      const docRef = onId && doc(db, "transactions", onId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setTransactions(docSnap.data());
        setTransactionData({ ...docSnap.data() });
      } else {
        navigate("/");
        toast.error("This transaction does not exist!");
      }
    };

    fetchTransaction();
  }, [navigate, onId, setTransactions]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = onId && doc(db, "transactions", onId);
      await updateDoc(docRef, transactionData);
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
            min={1}
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

EditTransaction.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.any,
  onId: PropTypes.any,
};

export default EditTransaction;

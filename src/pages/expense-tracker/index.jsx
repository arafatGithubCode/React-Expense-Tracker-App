import { useState } from "react";

import { IoIosAddCircle } from "react-icons/io";
import { FaHistory } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import TransactionModal from "../../components/TransactionModal";
import Summary from "../../components/Summary";

import { getAuth } from "firebase/auth";
import TransactionList from "../../components/TransactionList";

const ExpenseTracker = () => {
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const auth = getAuth();
  const userName = auth.currentUser.displayName;
  const userEmail = auth.currentUser.email;
  const photoURL = auth.currentUser.photoURL;

  const handleClose = () => setShowModal(false);

  const handleSignOut = async () => {
    const auth = getAuth();
    await auth.signOut();
    navigate("/");
  };

  return (
    <section className="bg-black bg-opacity-[0.8] w-screen">
      <div className="bg-slate-700 py-3 flex items-center">
        <h1 className="text-yellow-500 font-semibold text-2xl flex-1 text-center">
          {`${userName}'s Expense Tracker App`}
        </h1>
        <button
          onClick={handleSignOut}
          className="bg-gray-400 text-black py-1 px-3 rounded mr-3 hover:bg-red-400 font-semibold text-md transition duration-150 ease-in-out"
          type="button"
        >
          Sign Out
        </button>
      </div>
      <div className="flex justify-start sm:justify-center items-center gap-5 mt-3 ml-2">
        <button
          onClick={() => setShowModal(true)}
          className="bg-pink-500 text-white p-1 rounded text-lg font-medium flex justify-center items-center w-[15rem] sm:w-[20rem] shadow-lg hover:shadow-xl hover:bg-pink-600 active:bg-pink-700 transition duration-200 ease-in-out"
          type="button"
        >
          <IoIosAddCircle className="font-bold text-3xl" />
          <span>Add Transaction</span>
        </button>

        {photoURL && (
          <div className="w-[10%] relative group">
            <img
              className="rounded-full w-full  border-slate-700 border"
              src={photoURL}
              alt="Image"
            />
            <div className="opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out absolute inset-x-0 bottom-[-1] flex justify-center items-start text-[8px] font-medium text-white sm:text-sm md:text-lg">
              {`${userEmail}`}
            </div>
          </div>
        )}
      </div>
      <Summary />
      <div className="flex justify-center items-center bg-gray-400 p-1 my-4 gap-3">
        <h1 className="text-xl italic text-orange-800">Transaction List</h1>
        <FaHistory className="font-bold text-2xl text-blue-700" />
      </div>
      <div className="flex gap-2 flex-wrap justify-center items-center">
        <TransactionList />
      </div>
      <TransactionModal visible={showModal} onClose={handleClose} />
    </section>
  );
};

export default ExpenseTracker;

import { useState } from "react";

import { IoIosAddCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import TransactionModal from "../../components/TransactionModal";
import Summary from "../../components/Summary";
import TransactionList from "../../components/TransactionList";

import { getAuth } from "firebase/auth";

const ExpenseTracker = () => {
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const auth = getAuth();
  const userName = auth.currentUser.displayName;
  const userEmail = auth.currentUser.email;

  const handleClose = () => setShowModal(false);

  const handleSignOut = async () => {
    const auth = getAuth();
    await auth.signOut();
    navigate("/");
  };

  return (
    <section className="bg-black bg-opacity-[0.8] w-screen h-screen">
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

        <div className="w-[10%] relative group">
          <img
            className="rounded-full w-full  border-slate-700 border"
            src="https://scontent.fdac157-1.fna.fbcdn.net/v/t39.30808-6/408530412_685658527039699_8041186522868706873_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=4ng-W3-ua-0AX_vatHZ&_nc_ht=scontent.fdac157-1.fna&oh=00_AfBgxaR8qgW1VaolBsHQW6FAyh97vW8k_MiATBSBMMjA6g&oe=65883219"
            alt="Image"
          />
          <div className="opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out absolute inset-x-0 bottom-[-1] flex justify-center items-start text-[8px] font-medium text-white sm:text-sm md:text-lg">
            {`${userEmail}`}
          </div>
        </div>
      </div>
      <Summary />
      <TransactionList />
      <TransactionModal visible={showModal} onClose={handleClose} />
    </section>
  );
};

export default ExpenseTracker;

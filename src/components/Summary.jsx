import { FaBangladeshiTakaSign } from "react-icons/fa6";

import { useGetTransaction } from "../hooks/useGetTransaction";

const Summary = () => {
  const { totalTransaction } = useGetTransaction();
  const { balance, income, expense } = totalTransaction;

  // formatted amount
  const formattedBalance = balance.toLocaleString("en-US");
  const formattedIncome = income.toLocaleString("en-US");
  const formattedExpense = expense.toLocaleString("en-US");

  return (
    <div className="text-white mt-[1rem] mx-auto w-[60%] sm:mt-[2rem]">
      <div className="flex justify-center items-center gap-3">
        <h1 className="font-bold text-xl">Transaction Summary</h1>
        <img
          className="w-[3rem] bg-white rounded-full border-2 border-yellow-500"
          src="balance.png"
          alt="img"
        />
      </div>
      <div className="flex justify-start items-center gap-2 mb-3">
        <h2 className="font-semibold text-lg uppercase">
          Balance:{" "}
          <span className="text-2xl font-semibold">
            <span className="underline decoration-double underline-offset-8 decoration-1">
              {formattedBalance}
            </span>
          </span>
        </h2>
        <FaBangladeshiTakaSign className="text-yellow-500 font-bold text-2xl" />
      </div>
      <div>
        <h1 className="uppercase font-semibold text-green-500 text-xl">
          Income
        </h1>
        <div className="flex justify-start items-center gap-2">
          <h2>
            <span className="text-sm">Total Income: </span>
            <span className="text-2xl font-semibold">{formattedIncome}</span>
          </h2>
          <FaBangladeshiTakaSign className="text-yellow-500 font-bold text-2xl" />
        </div>
      </div>
      <div>
        <h1 className="uppercase font-semibold text-red-400 text-xl">
          Expense
        </h1>
        <div className="flex justify-start items-center gap-2">
          <h2>
            <span className="text-sm">Total Expense: </span>
            <span className="text-2xl font-semibold">{formattedExpense}</span>
          </h2>
          <FaBangladeshiTakaSign className="text-yellow-500 font-bold text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default Summary;

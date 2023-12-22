import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";

const TransactionList = () => {
  return (
    <div className="text-white">
      <h1>Transaction List</h1>
      <div>
        <h3>Description: </h3>
        <div>
          <h3>Amount: 0.00</h3>
          <FaBangladeshiTakaSign />
        </div>
        <div>
          <h3>Income</h3>
          <div>
            <div className="relative group">
              <FaEdit />
              <div className="opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out absolute inset-x-0 bottom-[-1] flex justify-center items-start text-sm font-medium text-white">
                Edit
              </div>
            </div>
            <div className="relative group">
              <FaRegTrashAlt />
              <div className="opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out absolute inset-x-0 bottom-[-1] flex justify-center items-start text-sm font-medium text-red-500">
                Delete
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionList;

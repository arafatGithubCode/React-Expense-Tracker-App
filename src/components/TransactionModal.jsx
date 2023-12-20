import PropTypes from "prop-types";

const TransactionModal = ({ visible, onClose }) => {
  if (!visible) return null;

  const handleClose = (e) => {
    if (e.target.id === "container") onClose();
  };

  return (
    <div
      id="container"
      onClick={handleClose}
      className="bg-white fixed inset-0 bg-opacity-[0.01] backdrop-blur-sm flex justify-center items-center"
    >
      <form className="bg-white rounded p-2 shadow-lg space-y-1">
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
            type="number"
            name="amount"
            id="amount"
            placeholder="1000 tk"
            required
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="space-x-1">
            <input type="radio" name="expense" id="expense" />
            <label
              className="text-md font-semibold text-red-400 hover:text-red-500 transition duration-150 ease-in-out"
              htmlFor="expense"
            >
              Expense
            </label>
          </div>
          <div className="space-x-1">
            <input type="radio" name="income" id="income" />
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

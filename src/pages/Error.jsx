const Error = () => {
  return (
    <div className="flex justify-center items-center flex-col h-screen gap-5">
      <div className="text-red-500 font-semibold">
        <span className="text-5xl">0</span>
        <span className="text-5xl">ops!</span>
      </div>

      <p>404- PAGE NOT FOUND </p>
      <p className="text-gray-300">
        the page, you are looking for might be removed or temporary unable
      </p>
      <button
        className="bg-red-300 py-1 px-3 rounded text-white font-semibold text-xl hover:bg-red-400"
        type="button"
      >
        Go to home page
      </button>
    </div>
  );
};

export default Error;

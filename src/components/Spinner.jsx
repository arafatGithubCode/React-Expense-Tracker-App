import spinner from "../assets/svg/spinner.svg";

const Spinner = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center ">
      <img className="w-[4rem]" src={spinner} alt="loading" />
    </div>
  );
};

export default Spinner;

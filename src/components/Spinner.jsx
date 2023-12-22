import spinner from "../assets/svg/spinner.svg";

const Spinner = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <img src={spinner} alt="loading" />
    </div>
  );
};

export default Spinner;

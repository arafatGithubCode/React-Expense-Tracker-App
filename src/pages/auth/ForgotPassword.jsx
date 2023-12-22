import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Oauth from "../../components/Oauth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Email was sent!");
      navigate("/sign-in");
    } catch (error) {
      toast.error("Could not send reset password!");
    }
  };

  return (
    <section
      className="w-screen h-screen bg bg-cover bg-center"
      style={{ backgroundImage: 'url("bg.jpg")' }}
    >
      <h1 className="text-center bg-slate-600 p-3 text-3xl font-semibold shadow-lg text-white">
        Track Your Daily Expense
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-[60%] sm:w-[50%] mx-auto mt-[2rem] bg-white bg-opacity-[0.4] shadow-lg rounded p-1"
      >
        <p className="mb-1 text-4xl font-semibold text-black text-center">
          Reset Password
        </p>
        <p className="mb-5 text-center">
          <span className="text-black font-lg">Do not have an account?</span>
          <span className="text-blue-500 hover:text-blue-700 cursor-pointer hover:font-semibold active:text-blue-800 transition duration-200 ease-in-out">
            <Link to="/">Sign Up</Link>
          </span>
        </p>
        <div className="flex flex-col flex-1 mb-3">
          <label
            className="font-semibold text-black cursor-pointer text-xl"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="bg-gray-500 p-2 border border-blue-500 focus:border-blue-800 rounded bg-opacity-[0.8] shadow hover:shadow-lg transition duration-200 ease-in-out text-white text-lg"
            type="email"
            name="email"
            id="email"
            placeholder="example@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="flex justify-end font-semibold gap-1">
          <p>Have an account?</p>
          <Link
            to="/sign-in"
            className="text-blue-600 hover:text-blue-700 hover:font-semibold transition duration-150 ease-in-out"
          >
            Sign In
          </Link>
        </div>
        <div className="bg-blue-500 flex  p-1 justify-center items-center my-2 text-white font-bold text-xl rounded hover:bg-blue-600 focus:bg-blue-700 active:bg-blue-900 transition duration-200 ease-in-out">
          <button className="flex-1" type="submit">
            Send Reset Password
          </button>
        </div>
        <div className="flex items-center">
          <div className="border border-gray-700 flex-grow"></div>
          <p className="text-center font-bold text-lg mx-3">or</p>
          <div className="border border-gray-700 flex-grow"></div>
        </div>
        <Oauth />
      </form>
    </section>
  );
};

export default ForgotPassword;

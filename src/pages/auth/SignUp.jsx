import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { db } from "../../config/firebase-config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import Oauth from "../../components/Oauth";
import Spinner from "../../components/Spinner";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { name, email, password } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formDataCopy);
      <Spinner />;
      navigate("/expense-tracker");
    } catch (error) {
      toast.error("You are already registered!");
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
          Sign Up
        </p>
        <p className="mb-5 text-center">
          <span className="text-black font-lg">Already a member?</span>
          <span className="text-blue-500 hover:text-blue-700 cursor-pointer hover:font-semibold active:text-blue-800 transition duration-200 ease-in-out">
            <Link to="/sign-in">Sign In</Link>
          </span>
        </p>
        <div className="flex flex-col flex-1 mb-3">
          <label
            className="font-semibold text-black cursor-pointer text-xl"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="bg-gray-500 p-2 border border-blue-500 focus:border-blue-800 rounded bg-opacity-[0.8] shadow hover:shadow-lg transition duration-200 ease-in-out text-white text-lg"
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name"
            onChange={handleChange}
            value={name}
            required
          />
        </div>
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
            onChange={handleChange}
            value={email}
            required
          />
        </div>
        <div className="flex flex-col flex-1">
          <label
            className="font-semibold text-black cursor-pointer text-xl"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="bg-gray-500 p-2 border border-blue-500 focus:border-blue-800 rounded bg-opacity-[0.8] shadow hover:shadow-lg transition duration-200 ease-in-out text-white text-lg"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
            value={password}
            required
          />
        </div>
        <div className="bg-blue-500 flex  p-1 justify-center items-center my-2 text-white font-bold text-xl rounded hover:bg-blue-600 focus:bg-blue-700 active:bg-blue-900 transition duration-200 ease-in-out">
          <button className="flex-1" type="submit">
            Sign Up
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

export default SignUp;

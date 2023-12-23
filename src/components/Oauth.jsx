import { FaGooglePlus } from "react-icons/fa";

import { db } from "../config/firebase-config";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getDoc, doc, setDoc, serverTimestamp } from "firebase/firestore";

import { useNavigate } from "react-router-dom";

const Oauth = () => {
  const navigate = useNavigate();

  const googleSignIn = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      //check user
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      const authInfo = {
        name: user.displayName,
        email: user.email,
        createdAt: serverTimestamp(),
        photoURL: user.photoURL,
        isAuth: user.emailVerified,
        userId: user.uid,
      };
      if (!docSnap.exists()) {
        await setDoc(docRef, authInfo);
      }
      localStorage.setItem("auth", JSON.stringify(authInfo));
      console.log(result);
      navigate("/expense-tracker");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="flex flex-col gap-2 lg:flex-row">
        <div className="flex justify-center items-center gap-2 bg-green-500 rounded p-1 hover:bg-green-600 focus:bg-green-700 active:bg-green-800 transition duration-200 ease-in-out flex-1">
          <FaGooglePlus className="bg-white rounded-full text-pink-500 text-2xl font-bold" />
          <button
            onClick={googleSignIn}
            type="button"
            className="uppercase text-white font-semibold text-[15px]"
          >
            Continue with google
          </button>
        </div>
      </div>
    </>
  );
};

export default Oauth;

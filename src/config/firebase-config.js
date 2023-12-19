import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCV24WwhkCWIR3vehkuzje5SGiep9WtSRs",
  authDomain: "setup-firebase-a5d93.firebaseapp.com",
  projectId: "setup-firebase-a5d93",
  storageBucket: "setup-firebase-a5d93.appspot.com",
  messagingSenderId: "702064209644",
  appId: "1:702064209644:web:d6679b003e12c01e54bfc9",
  measurementId: "G-BNMPK72WJN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

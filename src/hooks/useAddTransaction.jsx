import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";

import { useGetUserInfo } from "../hooks/useGetUserInfo";

export const useAddTransaction = () => {
  const { userId } = useGetUserInfo();
  const transactionRef = collection(db, "transactions");

  const addTransaction = async ({ amount, desc, transactionType }) => {
    await addDoc(transactionRef, {
      userId,
      amount,
      desc,
      transactionType,
      createdAt: serverTimestamp(),
    });
  };
  return { addTransaction };
};

import { useEffect, useState } from "react";

import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase-config";

import { useGetUserInfo } from "./useGetUserInfo";

import { toast } from "react-toastify";

export const useGetTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalTransaction, setTotalTransaction] = useState({
    balance: 0.0,
    income: 0.0,
    expense: 0.0,
  });

  const { userId } = useGetUserInfo();
  const transactionCollectionRef = collection(db, "transactions");

  const getTransactions = async () => {
    let unsubscribe;
    try {
      const transactionQuery = query(
        transactionCollectionRef,
        where("userId", "==", userId),
        orderBy("createdAt")
      );

      unsubscribe = onSnapshot(transactionQuery, (snapshot) => {
        const docs = [];
        let totalIncome = 0;
        let totalExpense = 0;

        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;

          docs.push({ ...data, id });

          if (data.transactionType === "expense") {
            totalExpense += Number(data.amount);
          } else {
            totalIncome += Number(data.amount);
          }
        });
        setTransactions(docs);

        let balance = totalIncome - totalExpense;
        setTotalTransaction({
          balance,
          income: totalIncome,
          expense: totalExpense,
        });
      });
    } catch (error) {
      console.error(error);
    }
    return () => unsubscribe();
  };

  const deleteTransaction = async (id) => {
    try {
      await deleteDoc(doc(transactionCollectionRef, id));
      toast.success("Clicked transaction deleted");
    } catch (error) {
      console.error(error);
      toast.error("Could not delete");
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);
  return { transactions, setTransactions, deleteTransaction, totalTransaction };
};

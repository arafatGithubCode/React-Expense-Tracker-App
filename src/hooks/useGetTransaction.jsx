import { useEffect, useState } from "react";

import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase-config";

import { useGetUserInfo } from "./useGetUserInfo";

export const useGetTransaction = () => {
  const [transactions, setTransactions] = useState([]);

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
        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;

          docs.push({ ...data, id });
        });
        setTransactions(docs);
      });
    } catch (error) {
      console.error(error);
    }
    return () => unsubscribe();
  };
  useEffect(() => {
    getTransactions();
  }, []);
  return { transactions };
};

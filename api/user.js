import { db } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";

export const addBP = async ({ userId, sys, dia, pul }) => {
  try {
    await addDoc(collection(db, "bp"), {
      user: userId,
      sys: sys,
      dia: dia,
      pul: pul,
      createdAt: Timestamp.now(),
      changeAt: Timestamp.now(),
    });
  } catch (err) {
    console.log(err);
  }
};

export const editBP = async ({ docId, sys, dia, pulse, changeAt }) => {
  try {
    const timestamp = new Date().getTime();
    const formattedTimestamp = new Date(timestamp).toLocaleString();
    const BPRef = doc(db, "bp", docId);

    await updateDoc(BPRef, {
      sys,
      dia,
      pulse,
      changeAt: formattedTimestamp,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteBP = async (docId) => {
  try {
    const BPRef = doc(db, "bp", docId);
    await deleteDoc(BPRef);
  } catch (err) {
    console.log(err);
  }
};

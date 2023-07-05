import { db } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  Timestamp,
  query,
  onSnapshot,
  where,
} from "firebase/firestore";

export const getBPs = (user, setBPs) => {
  try {
    if (!user) {
      setBPs([]);
      return;
    }
    const q = query(collection(db, "bp"), where("user", "==", user.uid));

    onSnapshot(q, (querySnapshot) => {
      let ar = [];
      querySnapshot.docs.forEach((doc) => {
        ar.push({ id: doc.id, ...doc.data() });
      });
      ar.sort((a, b) => {
        const timeA = a.createdAt.toMillis();
        const timeB = b.createdAt.toMillis();
        return timeB - timeA;
      });
      setBPs(ar);
    });
  } catch (err) {
    console.log(err);
  }
};

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
    const BPRef = doc(db, "bp", docId);

    await updateDoc(BPRef, {
      sys,
      dia,
      pulse,
      changeAt: Timestamp.now(),
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

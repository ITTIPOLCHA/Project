import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD800vFC-vbf9T9ifjPRDjhxALIvH1PMyc",
  authDomain: "project-01-07.firebaseapp.com",
  projectId: "project-01-07",
  storageBucket: "project-01-07.appspot.com",
  messagingSenderId: "502319606131",
  appId: "1:502319606131:web:87b7665586a222c175fd06",
  measurementId: "G-4F470CZ9Y2",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

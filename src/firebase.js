import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  //copy and paste your firebaseConfig here
  apiKey: "AIzaSyDWzFguqMzRgr44xezSTDtLXKBg6RToBwI",
  authDomain: "parkbased-2.firebaseapp.com",
  projectId: "parkbased-2",
  storageBucket: "parkbased-2.firebasestorage.app",
  messagingSenderId: "468155628526",
  appId: "1:468155628526:web:ea95cdb62a78e087432cff",
  measurementId: "G-6W34P8MFNX"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

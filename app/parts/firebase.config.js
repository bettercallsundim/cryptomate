// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_GAPI,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PID,
  storageBucket: process.env.NEXT_PUBLIC_STRG_BCKT,
  messagingSenderId: process.env.NEXT_PUBLIC_MSGID,
  appId: process.env.NEXT_PUBLIC_GAPP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
console.log(process.env.GAPP_ID);

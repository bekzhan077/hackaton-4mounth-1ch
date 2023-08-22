// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA6Dh2nUm0UEEDE_830JjD1FSw8VfL2pJ4",
  authDomain: "pinterest-hackthon.firebaseapp.com",
  projectId: "pinterest-hackthon",
  storageBucket: "pinterest-hackthon.appspot.com",
  messagingSenderId: "868429908675",
  appId: "1:868429908675:web:0a91fa0895e2aac54df076",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

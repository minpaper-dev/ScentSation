// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCa1hULO1CLfwLrzpM9_60-qZhh2Ihy-gI",
  authDomain: "scentsation-4e0af.firebaseapp.com",
  projectId: "scentsation-4e0af",
  storageBucket: "scentsation-4e0af.appspot.com",
  messagingSenderId: "785492086425",
  appId: "1:785492086425:web:904cccdde089533904b208"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
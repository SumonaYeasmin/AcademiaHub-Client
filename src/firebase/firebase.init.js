// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3XvwN_uuJ8SmIZS-Wl9lb23omgMJyFt4",
  authDomain: "academia-hub-444ce.firebaseapp.com",
  projectId: "academia-hub-444ce",
  storageBucket: "academia-hub-444ce.firebasestorage.app",
  messagingSenderId: "103303978016",
  appId: "1:103303978016:web:1991bbea73858488b3b045",
  measurementId: "G-95JNC9R5X1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

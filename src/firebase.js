// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLyuu3wJh-FzAAFkTC7POMJYxRPgMn8sA",
  authDomain: "app-cabanas.firebaseapp.com",
  projectId: "app-cabanas",
  storageBucket: "app-cabanas.appspot.com",
  messagingSenderId: "805240480334",
  appId: "1:805240480334:web:e01444b8c6d296e683591f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
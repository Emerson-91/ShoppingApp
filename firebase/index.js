// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4hOeCP1fpBfLUTKlaIITxiqKUNKTSovg",
  authDomain: "shoppingapp-2b70e.firebaseapp.com",
  projectId: "shoppingapp-2b70e",
  storageBucket: "shoppingapp-2b70e.appspot.com",
  messagingSenderId: "53652384028",
  appId: "1:53652384028:web:d449950fb9764c8de9b2d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export {app, db, getFirestore, collection, addDoc, getDocs};
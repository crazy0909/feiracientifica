import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAy4_OxMQaU1ARpvMOUrhkMXrKFDNnSE5w",
  authDomain: "feira-cientifica.firebaseapp.com",
  projectId: "feira-cientifica",
  storageBucket: "feira-cientifica.firebasestorage.app",
  messagingSenderId: "242859974131",
  appId: "1:242859974131:web:3b18beaaeb34b094bb0686",
  measurementId: "G-RDGWZ1P00J"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

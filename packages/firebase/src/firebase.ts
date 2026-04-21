import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA0zuDk-cQycqZjkTncTXC4y1vQXAZyW-0",
  authDomain: "chimpudoku-8d655.firebaseapp.com",
  databaseURL: "https://chimpudoku-8d655-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chimpudoku-8d655",
  storageBucket: "chimpudoku-8d655.firebasestorage.app",
  messagingSenderId: "95121372417",
  appId: "1:95121372417:web:96ecb787930848f290d700",
  measurementId: "G-WXPVGNZR9T"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);        // add this
const analytics = getAnalytics(app);

export { auth, app, db, analytics};
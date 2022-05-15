import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNsKg5Bfza4BBuvi9IAqxZ-OpO8qgUsYM",
  authDomain: "final-restat.firebaseapp.com",
  projectId: "final-restat",
  storageBucket: "final-restat.appspot.com",
  messagingSenderId: "768000270521",
  appId: "1:768000270521:web:0f9ab03870240656d17b68",
  measurementId: "G-845Y0RR7QQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore, doc, setDoc } from "firebase/firestore"



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNsKg5Bfza4BBuvi9IAqxZ-OpO8qgUsYM",
  authDomain: "final-restat.firebaseapp.com",
  databaseURL: "https://final-restat-default-rtdb.firebaseio.com",
  projectId: "final-restat",
  storageBucket: "final-restat.appspot.com",
  messagingSenderId: "768000270521",
  appId: "1:768000270521:web:0f9ab03870240656d17b68",
  measurementId: "G-845Y0RR7QQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);

export const createUserDocument = async (user, additionalData) => {
  if(!user) return;

  const userRef = collection(firestore, `myprofile`);

  const snapshot = await userRef.get();
  if(!snapshot.exists)
  {
    const {name} = additionalData;
    const {email} = user;
    const {affiliation} = additionalData;
    const {aoi} = additionalData;

    try{
      userRef.set({
        name,
        email,
        affiliation,
        aoi,
        createdAt: new Date()
      })
    }catch{
      alert("Error in creating user!!")
    }

  }
}

  





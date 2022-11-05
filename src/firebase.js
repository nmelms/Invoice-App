import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBy64mNVY5BCUS2bpOvAWvnyqT5lMTgbuk",
  authDomain: "invoice-app-60eab.firebaseapp.com",
  databaseURL: "https://invoice-app-60eab-default-rtdb.firebaseio.com",
  projectId: "invoice-app-60eab",
  storageBucket: "invoice-app-60eab.appspot.com",
  messagingSenderId: "597802427806",
  appId: "1:597802427806:web:74adb116154c501018628f",
  measurementId: "G-RBMRMFZ0LB",
};

export const registerWithEmailAndPassword = async (email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      authProvider: "local",
      email,
    });
  } catch (err) {
    alert(err.message);
  }
};

export const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    alert(err.message);
  }
};

export const logout = () => {
  signOut(auth);
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

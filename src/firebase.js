import firebase from 'firebase/app'
import { initializeApp } from "firebase/app";
import  {getFirestore} from 'firebase/firestore'
import 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyBy64mNVY5BCUS2bpOvAWvnyqT5lMTgbuk",
  authDomain: "invoice-app-60eab.firebaseapp.com",
  databaseURL: "https://invoice-app-60eab-default-rtdb.firebaseio.com",
  projectId: "invoice-app-60eab",
  storageBucket: "invoice-app-60eab.appspot.com",
  messagingSenderId: "597802427806",
  appId: "1:597802427806:web:74adb116154c501018628f",
  measurementId: "G-RBMRMFZ0LB"
};

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getDatabase, ref, get, set, child, update, remove} from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const environment = {
  production:false,
  firebase:{
  apiKey: "AIzaSyBNmq-FeOZ7oZU-FSVE987hP9zTxP4UuqU",
  authDomain: "dits-b12b8.firebaseapp.com",
  projectId: "dits-b12b8",
  storageBucket: "dits-b12b8.appspot.com",
  messagingSenderId: "148961012398",
  appId: "1:148961012398:web:3b8d58af1b01f3bbc0db3f",
  measurementId: "G-GG2GSF6Q8L"
  }
};

// Initialize Firebase


// Import the functions you need from the SDKs you need

import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "onecart-d4fd2.firebaseapp.com",
  projectId: "onecart-d4fd2",
  storageBucket: "onecart-d4fd2.firebasestorage.app",
  messagingSenderId: "304676055577",
  appId: "1:304676055577:web:57b79d0d00138e44809888"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth , provider}
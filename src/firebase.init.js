// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-0FlldjS7ymDY6SaNqMz5YPVlR13dRbk",
  authDomain: "email-password-auth-c2a24.firebaseapp.com",
  projectId: "email-password-auth-c2a24",
  storageBucket: "email-password-auth-c2a24.firebasestorage.app",
  messagingSenderId: "645604301707",
  appId: "1:645604301707:web:82839ed75b85c321372d8e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
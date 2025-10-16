// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// DANGER-- -- DO NOT SHARE CONFIG IN PUBLIC
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4YQs2aRE19SfA4B-sprShj8d0HG4JI4A",
  authDomain: "new-email-password-2b0c2.firebaseapp.com",
  projectId: "new-email-password-2b0c2",
  storageBucket: "new-email-password-2b0c2.firebasestorage.app",
  messagingSenderId: "1065056343335",
  appId: "1:1065056343335:web:362e1e3f1fce5612b00502"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);


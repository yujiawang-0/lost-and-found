// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIkYprBlLA_ZiWAaqqoMfNZ8mH5vxvenU",
  authDomain: "lost-and-found-58a23.firebaseapp.com",
  projectId: "lost-and-found-58a23",
  storageBucket: "lost-and-found-58a23.firebasestorage.app",
  messagingSenderId: "995123858650",
  appId: "1:995123858650:web:8b6d4ef57170b70a79e9e3",
  measurementId: "G-T4XNYJGSX6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

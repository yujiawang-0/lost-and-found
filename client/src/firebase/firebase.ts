// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUc0tHV6pSBmsrou5qu6OnrxNoSyqzAO4",
  authDomain: "lost-and-found-425cb.firebaseapp.com",
  projectId: "lost-and-found-425cb",
  storageBucket: "lost-and-found-425cb.firebasestorage.app",
  messagingSenderId: "163468924336",
  appId: "1:163468924336:web:ff85e103ec34af567ab275",
  measurementId: "G-QWGKEVKJFM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export { app ,auth, storage };
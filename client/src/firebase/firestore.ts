import { doc, setDoc, getDoc, serverTimestamp, } from "firebase/firestore";
import { db } from "../firebase/firebase"; // adjust path if needed

export const createUserDocumentIfNotExists = async (user: any, additionalData = {}) => {
  if (!user) return; // if user is not valid, do nothing

  const userRef = doc(db, "users", user.uid);
  const snapshot = await getDoc(userRef); 

  if (!snapshot.exists()) {
    const { email, displayName } = user;
    try {
      await setDoc(userRef, {
        email,
        displayName: displayName || additionalData.name || "",
        createdAt: serverTimestamp(),
        ...additionalData,
      });
      console.log("New user saved to Firestore");
    } catch (error) {
      console.error("Error creating user document:", error);
    }
  } else {
    console.log("📦 User already exists in Firestore");
  }
};

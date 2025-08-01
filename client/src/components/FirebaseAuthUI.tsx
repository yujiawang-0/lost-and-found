import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

import { getAuth, 
        createUserWithEmailAndPassword, 
        signInWithEmailAndPassword,
        validatePassword, 
        signOut } from "firebase/auth";


import { useEffect, useRef } from "react";

import { auth } from "../lib/firebase";

export default function FirebaseAuthUI() {
  const uiRef = useRef<firebaseui.auth.AuthUI>();

  useEffect(() => {
    // Only initialize once
    if (!uiRef.current) {
      uiRef.current = new firebaseui.auth.AuthUI(getAuth());
    }

    uiRef.current.start("#firebase-auth-container", {
      signInOptions: [
        // Add providers here
        getAuth().EmailAuthProvider.PROVIDER_ID,
        getAuth().GoogleAuthProvider.PROVIDER_ID,
      ],
      signInSuccessUrl: "/", // redirect after login
    });

    return () => {
      uiRef.current?.reset();
    };
  }, []);

  return <div id="firebase-auth-container" />;
}




// const auth = getAuth();

// // validating password
// const status = await validatePassword(getAuth(), passwordFromUser);
// if (!status.isValid) {
//   // Password could not be validated. Use the status to show what
//   // requirements are met and which are missing.

//   // If a criterion is undefined, it is not required by policy. If the
//   // criterion is defined but false, it is required but not fulfilled by
//   // the given password. For example:
//   const needsLowerCase = status.containsLowercaseLetter !== true;
// }

// // signing out
// signOut(auth).then(() => {
//   // Sign-out successful.
// }).catch((error) => {
//   // An error happened.
// });

// // create new user with password
// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed up 
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });


//   // sign in a new user with password

// signInWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in 
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });
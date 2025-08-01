// import { StyledFirebaseAuth } from 'react-firebaseui';
// import { getAuth, EmailAuthProvider, GoogleAuthProvider } from "firebase/auth";

// const uiConfig = {
//   signInOptions: [
//     EmailAuthProvider.PROVIDER_ID,
//     GoogleAuthProvider.PROVIDER_ID,
//   ],
//   signInSuccessUrl: '/',
// };

// export default function LoginPage() {
//   return (
//     <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={getAuth()} />
//   );
// }
import { useEffect, useRef } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import * as firebaseui from "firebaseui"; 
import 'firebaseui/dist/firebaseui.css'


// Create component
export default function LoginPage() {
  const uiRef = useRef<firebaseui.auth.AuthUI | null>(null);

  useEffect(() => {
    if (!uiRef.current) {
      uiRef.current = new firebaseui.auth.AuthUI(firebase.auth());
    }

    uiRef.current.start("#firebaseui-auth-container", {
      signInFlow: "popup",
      signInSuccessUrl: "/", // or use signInSuccessWithAuthResult
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccessWithAuthResult: function (authResult) {
          // You could manually redirect here
          console.log("User signed in:", authResult.user);
          return true; // Return false to handle redirect manually
        },
      },
    });

    // Cleanup on unmount
    return () => uiRef.current?.reset();
  }, []);

  return (
    <div>
      <h2>Login</h2>
      <div id="firebaseui-auth-container"></div>
      <div id="loader">Loading...</div>
    </div>
  );
}




// // Initialize the FirebaseUI Widget using Firebase.
// const ui = new firebaseui.auth.AuthUI(firebase.auth());

// const uiConfig = {
//   callbacks: {
//     signInSuccessWithAuthResult: function(authResult, redirectUrl) {
//       // User successfully signed in.
//       // Return type determines whether we continue the redirect automatically
//       // or whether we leave that to developer to handle.
//       return true;
//     },
//     uiShown: function() {
//       // The widget is rendered.
//       // Hide the loader.
//       document.getElementById('loader').style.display = 'none';
//     }
//   },
//   // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
//   signInFlow: 'popup',
//   signInSuccessUrl: '<url-to-redirect-to-on-success>',
//   signInOptions: [
//     // Leave the lines as is for the providers you want to offer your users.
//     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//     firebase.auth.EmailAuthProvider.PROVIDER_ID,

//   ],
//   // Terms of service url.
//   tosUrl: '<your-tos-url>',
//   // Privacy policy url.
//   privacyPolicyUrl: '<your-privacy-policy-url>'
// };


// ui.start('#firebaseui-auth-container', uiConfig);
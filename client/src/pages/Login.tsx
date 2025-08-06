import React from 'react';
import { useNavigate } from 'react-router';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import {useUserStore} from './userStore';


const Login = () => {
    const navigate = useNavigate();
    const setUser = useUserStore((state) => state.setUser); 
    // gives the setUser function in the useUserStore

    const handleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // get firebase-issued ID token
            // a very long encoded string that stores the user info 
            const idToken = await user.getIdToken();


            // store user info in  global zustand store for frontend 
            setUser({
                name: user.displayName || '',
                email: user.email || '',
                avatar: user.photoURL || '',
                idToken: idToken,  
            });
            
            
            navigate('/lost');
            

        } catch (err) {
            alert('Google login failed');
        }
    };

  return (
    <div>
        <h1>Welcome to Lost & Found</h1>
        <p>Please log in with Google to continue</p>
        <div>
            <button onClick= {handleLogin}>Login with Google</button>
        </div>
    </div>
  )
}

export default Login;
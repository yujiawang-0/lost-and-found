import React from 'react';
import { useNavigate } from 'react-router';
import { GoogleLogin} from '@react-oauth/google';
import type { CredentialResponse } from '@react-oauth/google';
import {useUserStore} from './userStore';


const Login = () => {
    const navigate = useNavigate();
    const setUser = useUserStore((state) => state.setUser); 
    // gives the setUser function in the useUserStore

    const handleLogin = async (credentialResponse: CredentialResponse) => {
        const token = credentialResponse.credential; // contains user info 
        // ggl sends a CredentialResponse object to this function 
        // via onSuccess callback in <GoogleLogin /> 
        // CredentialResponse has fields like 
        // ggl client id 
        // credential (string that contains user's info)
        
        if (!token) {
            alert('Google login failed');
            return;
        }

        
        try{
            const res = await fetch('/api/auth/google', {
							  method: 'POST',
							  headers: {
							    Authorization: `Bearer ${token}`,
							    'Content-Type': 'application/json',
							  },
							});
							// sends token to backend (the credential field) (with Authorization header) 
							// backend is where ggl library will verify it 
							// and extract user data 
							// backend has router.post('/auth/google', verifyGoogleToken, createUser);


            const data = await res.json();
            // response the backend sends to the frontend
            // backend returns user data (in createUser) 

            if (!res.ok) {
                alert('Login failed: ' + data.message);
                return;
            }

            // save user details to global zustand store 
            // zustand store is only frontend 
            setUser({
                name: data.name,
                email: data.email,
                avatar: data.avatar,
                idToken: token
            });

            navigate('/');
            // navigate back to home page 

        } catch (err) {
            alert('Something went wrong during login');
        }
    };

  return (
    <div>
        <h1>Welcome to Lost & Found</h1>
        <p>Please log in with Google to continue</p>
        <div>
            <GoogleLogin
                onSuccess= {handleLogin}
                onError= {() => {
                    alert('Google Login failed. Please try again')
                }}
            />
        </div>
    </div>
  )
}

export default Login
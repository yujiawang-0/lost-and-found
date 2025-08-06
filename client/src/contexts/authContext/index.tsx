// this is the auth context provider file. not sure what it does but it does something...
import React, { useContext, useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import type { ReactNode } from "react";

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextType = {
  currentUser: any;
  setCurrentUser: (user: any) => void;
  userLoggedIn: boolean;
  isEmailUser: boolean;
  isGoogleUser: boolean;
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [isEmailUser, setIsEmailUser] = useState(false);
    const [isGoogleUser, setIsGoogleUser] = useState(false);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe;
    }, [])

    async function initializeUser(user) {
        if (user) {
            // if the user is valid
            setCurrentUser({...user}); // ... will create a new object instead of references to 'user'
            
            // check if provider is email and password login
            const isEmail = user.providerData.some(
                (provider) => provider.providerId === "password"
            );
            setIsEmailUser(isEmail);

            // check if the auth provider is google or not
            const isGoogle = user.providerData.some(
            (provider) => provider.providerId === GoogleAuthProvider.PROVIDER_ID
            );
            setIsGoogleUser(isGoogle);

            setUserLoggedIn(true);
        } else {
            setCurrentUser(null);
            setUserLoggedIn(false);
        }

        setLoading(false);
    }

    const value = {
        userLoggedIn,
        isEmailUser,
        isGoogleUser,
        currentUser,
        setCurrentUser
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )

}
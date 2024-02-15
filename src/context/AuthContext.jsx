/* eslint-disable react/prop-types */
import { useContext, createContext, useState, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup,signOut, onAuthStateChanged} from "firebase/auth";
import {auth} from "../utils/init-firebase.js";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [ googleUser, setUser] = useState({});

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
    };
    const googleLogOut = ()=>{
        signOut(auth)
    };
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=> {
            setUser(currentUser);
        });
        return ()=> {
            unsubscribe();
        };
    },[])
    return (
        <AuthContext.Provider value={{googleSignIn, googleLogOut, googleUser}}>
            {children}
        </AuthContext.Provider>
    )
};

export const UserAuth = () => {
    return useContext(AuthContext)
};
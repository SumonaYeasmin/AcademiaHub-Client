import { createContext,useEffect, useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.init";



export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    // console.log(user);
    const [loading, setLoading] = useState(true);

    // Creat a new user or Registration
    const creatUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

     // Login user
     const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

     // Login with Google
     const provider = new GoogleAuthProvider();

     const loginWithGoogle = () => {
         setLoading(true);
         return signInWithPopup(auth, provider)
     }

      // Log Out User
    const userLogOut = () => {
        setLoading(true);
        return signOut(auth)
    }

       // Update Profile Information
       const updateProfileInfo = (updatedName, updatedPhotoURL) => {
        if (!auth.currentUser) return;
        return updateProfile(auth.currentUser, {
            displayName: updatedName,
            photoURL: updatedPhotoURL,
        }).then(() => {
            // Update context user state
            setUser({ ...auth.currentUser });
        });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            // console.log('current user', currentUser);
            setLoading(false);

        });
        return () => {
            return unsubscribe();
        }
    }, [])

    const authInfo = {
        user,
        loading,
        creatUser,
        loginUser,
        loginWithGoogle,
        userLogOut,
        updateProfileInfo
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
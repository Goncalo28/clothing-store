import { createContext, useEffect, useState } from "react";
import {
  createUserDocFromAuth,
  onAuthStateChangedListener,
} from "../utils/firebase/firebase.utils";

//actual value we want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: (_user: any) => null,
});

export const UserProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState(null);

  const value: any = {
    currentUser,
    setCurrentUser,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user: any) => {
      if (user) {
        createUserDocFromAuth(user);
      }
      setCurrentUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

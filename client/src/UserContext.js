import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axios.get('/profile').then((res) => {
      setUserData(res.data);
      setIsLoggedIn(true);
    })
  }, [])

  return (
    <UserContext.Provider value={{ userData, setUserData, isLoggedIn, setIsLoggedIn }}>
      {children}
    </UserContext.Provider>
  )
}
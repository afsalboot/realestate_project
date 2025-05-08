import { createContext, useEffect, useState } from "react";

// Create context
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("userData")) || null
  );

  const updateUser = (data) => {
    setCurrentUser(data)
  }

  console.log("settttt",currentUser)
  console.log("uppppp",updateUser)

 

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("userData", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("userData");
    }
  }, [currentUser]);


  return (
    
    <AuthContext.Provider value={ { currentUser, updateUser } }>
      {children}
    </AuthContext.Provider>
  );
};

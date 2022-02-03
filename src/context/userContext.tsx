import { createContext, FC, useContext, useState} from "react";

const UserContext = createContext({})

export const useUserContext = () => {
  return useContext(UserContext)
}

export const UserProvicer: FC = ({children}) => {
  const [user, setUser] = useState({username: '123'})

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  )
};

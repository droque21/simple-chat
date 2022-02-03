import { createContext, FC, useContext, useState} from "react";
import { loginUser, registerUser } from "../api/user.api";
import { UserType } from "../types/userTypes";
import { UserContextProps } from "./contextTypes";

const UserContext = createContext<Partial<UserContextProps>>({})

export const useUserContext = () => {
  return useContext(UserContext)
}

export const UserProvicer: FC = ({children}) => {
  const [user, setUser] = useState<UserType|null>(null)

  const registerUserHandler = async (user: UserType) => {
    await registerUser(user)
    loginUserHandler(user)
  }

  const loginUserHandler = async (user: UserType) => {
    const userLogged = await loginUser(user)
    console.log(userLogged.user)
    setUser(userLogged.user)
  }

  return (
    <UserContext.Provider value={{user, registerUserHandler, loginUserHandler }}>
      {children}
    </UserContext.Provider>
  )
};

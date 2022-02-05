import { createContext, FC, useContext} from 'react'
import { loginUser, registerUser } from '../api/user.api'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { UserType } from '../types/types'
import { UserContextProps } from './contextTypes'

const UserContext = createContext<Partial<UserContextProps>>({})

export const useUserContext = () => {
  return useContext(UserContext)
}

export const UserProvicer: FC = ({children}) => {
  const [user, setUser] = useLocalStorage<UserType>('user')

  const registerUserHandler = async (user: UserType) => {
    await registerUser(user)
    loginUserHandler(user)
  }

  const loginUserHandler = async (user: UserType) => {
    const resp = await loginUser(user)
    const {username, token} = resp.data
    setUser({username, token })
  }

  return (
    <UserContext.Provider value={{user, registerUserHandler, loginUserHandler }}>
      {children}
    </UserContext.Provider>
  )
}

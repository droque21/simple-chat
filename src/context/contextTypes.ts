import { UserType } from "../types/userTypes";

export interface UserContextProps {
  user: UserType | null
  registerUserHandler: (user: UserType) => void
  loginUserHandler: (user: UserType) => void
}
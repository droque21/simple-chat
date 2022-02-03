import axios from "axios";
import { beUrl } from "../config";
import { UserType } from "../types/userTypes";

export const registerUser = async (user: UserType) => {
  try {
    const resp = await axios.post(`${beUrl}/user/register`, user)
    return resp.data
  } catch (err) {
    return { message: 'user is duplicated' }
  }
}

export const loginUser = async (user: UserType) => {
  try {
    const resp = await axios.post(`${beUrl}/user/login`, user)
    return resp.data
  } catch (err) {
    return {}
  }
}
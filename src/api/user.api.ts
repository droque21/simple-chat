import axios, { AxiosResponse } from 'axios'
import { beUrl } from '../config'
import { LoginResponse } from '../types/apiResponsesTypes'
import { UserType } from '../types/types'

export const registerUser = async (user: UserType) : Promise<AxiosResponse> => {
  const resp = await axios.post(`${beUrl}/user/register`, user)
  return resp
}

export const loginUser = async (user: UserType) : Promise<AxiosResponse<LoginResponse>> => {
  const resp = await axios.post(`${beUrl}/user/login`, user)
  return resp
}
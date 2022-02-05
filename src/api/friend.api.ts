import axios, { AxiosResponse } from 'axios'
import { beUrl } from '../config'
import {  FriendsGetResponse, NewFriendsPostResponse } from '../types/apiResponsesTypes'
import { FriendType, UserType } from '../types/types'

export const fetchUserFriends = async (user: UserType) : Promise<FriendsGetResponse> => {
  const resp = await axios.get(`${beUrl}/friend`, {headers: {Authorization: `Bearer ${user.token}`} })
  return resp
}

export const addFriend = async (newFriend: FriendType, user: UserType) : Promise<NewFriendsPostResponse> => {
  const resp = await axios.post(`${beUrl}/friend`,newFriend ,{headers: {Authorization: `Bearer ${user.token}`} })
  return resp
}
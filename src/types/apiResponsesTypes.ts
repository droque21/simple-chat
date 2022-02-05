import { AxiosResponse } from 'axios'
import { FriendType } from './types'

export interface LoginResponse extends Message {
  username: string
  token: string
}

export interface NewFriendsPostResponse extends AxiosResponse{
  data: {
    message: MessageFriendResponse
    friend: FriendType
  }
}

export interface FriendsGetResponse extends AxiosResponse{
  data: {friends: [FriendType]}
}

interface Message {
  message: string
}

export enum MessageFriendResponse {
  CANT_ADD_YOURSELF = 'you can\'t add yourself',
  DOESNT_EXISTS = 'user doesn\'t exists',
  YOU_ARE_FRIENDS = 'you are friends already',
}


import { Socket } from 'socket.io-client'
import { ConversationType, FriendType, UserType } from '../types/types'

export interface UserContextProps {
  user: UserType | null
  registerUserHandler: (user: UserType) => void
  loginUserHandler: (user: UserType) => void
}

export interface FriendsContextProps {
  friends: FriendType[]
  addNewFriend: (user: FriendType) => void
}

export interface ConversationsContextProps {
  conversations: ConversationType[]
  selectedConversation: ConversationType
  createConversation: (recipients: string[]) => void
  selectConversationIndex: (i: number) => void
  sendMessage: (recipients: string[], text: string) => void
}

export interface SocketContextProps {
  socket: Socket | null
}
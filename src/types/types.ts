export interface UserType {
  username: string
  password?: string
  token?: string
}

export interface FriendType {
  username: string
  name: string
}

export interface ConversationType {
  recipients:  Array<RecipientType | string>
  messages: MessageType[]
  selected: boolean
}

export interface RecipientType {
  username: string,
  name: string
}

export interface MessageType {
  sender: string
  message: string
  fromMe: boolean
}
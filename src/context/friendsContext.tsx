import { createContext, FC, useContext, useEffect, useState} from 'react'
import { addFriend, fetchUserFriends } from '../api/friend.api'
import { MessageFriendResponse } from '../types/apiResponsesTypes'
import { FriendType } from '../types/types'
import { FriendsContextProps } from './contextTypes'
import { useUserContext } from './userContext'

const FriendsContext = createContext<Partial<FriendsContextProps>>({})

export const useFriendsContext = () => {
  return useContext(FriendsContext)
}

export const FriendsProvicer: FC = ({children}) => {
  const {user} = useUserContext() 
  const [friends, setFriends] = useState<Array<FriendType>>([])

  const addNewFriend = async (newFriend: FriendType) => {
    const {data} = await addFriend(newFriend, user!)

    if(data.message ===  MessageFriendResponse.DOESNT_EXISTS) return 
    if(data.message ===  MessageFriendResponse.CANT_ADD_YOURSELF) return 
    if(data.message ===  MessageFriendResponse.YOU_ARE_FRIENDS) return 
    setFriends(prvF => prvF.concat(data.friend))
  }
  const getUserFriendsHandler = async () => {
    const resp = await fetchUserFriends(user!)
    setFriends(resp.data.friends)
  }

  useEffect(()=> {
    if(user) {
      getUserFriendsHandler()
    }
  },[user])

  return (
    <FriendsContext.Provider value={{addNewFriend, friends}}>
      {children}
    </FriendsContext.Provider>
  )
}

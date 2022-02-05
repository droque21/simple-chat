import { createContext, FC, useContext, useEffect, useState, useCallback} from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { ConversationType, RecipientType } from '../types/types'
import { ConversationsContextProps } from './contextTypes'
import { useFriendsContext } from './friendsContext'
import { useSocketContext } from './socketContext'
import { useUserContext } from './userContext'

interface AddMessageArgs {
  recipients: string[]
  text:string
  sender: string
}

const ConversationsContext = createContext<Partial<ConversationsContextProps>>({})

export const useConversationContext = () => {
  return useContext(ConversationsContext)
}

export const ConversationsProvicer: FC = ({children}) => {
  const {user} = useUserContext()
  const {friends} = useFriendsContext()
  const [conversations, setConversations] = useLocalStorage<ConversationType[]>(`${user?.username}-chats`,[])
  const [selectedConversationIndex, setSelectedConversationIndex] = useState<number>(0)
  const {socket} = useSocketContext()
  const createConversation = (recipients: string[]) => {
    setConversations(prevCon => {
      return [...prevCon!, {recipients: recipients, messages: []} ] as ConversationType[]
    })
  }

  const addMessageToConverstion = useCallback(({recipients, text, sender}:AddMessageArgs ) => {
    setConversations(prevC => {
      let madeChange = false
      const newMessage = { sender, message: text}
      console.log(sender)
      const conversationsUpdated = prevC!.map(c => {
        const cRecipients = c.recipients.map(r=> r.username)
        if(arraysAreEqual(cRecipients, recipients)){
          madeChange = true
          return {
            ...c,
            messages: [...c.messages, newMessage]
          }
        }
        return c
      })

      if(!madeChange){ 
        const recipientsFormatted = recipients.map(r => ({username: r, name: r})) as RecipientType[]
        return [...prevC!, {recipients: recipientsFormatted, messages: [newMessage]}] as ConversationType[]
      }

      return conversationsUpdated as ConversationType[]
    })
  }, [setConversations])

  useEffect(()=>{
    if(socket == null) return
    socket.on('receive-message', addMessageToConverstion)

    return () => {socket.off('receive-message')}
  },[socket, addMessageToConverstion])

  const sendMessage = (recipients: string[], text: string) => {
    socket?.emit('send-message', {recipients, text})
    addMessageToConverstion({recipients, text, sender: user!.username})
  }

  const formattedConversations = conversations!.map((c, i) => {
    const recipients = c.recipients.map(r => {
      const friend = friends!.find(f => f.username === r.username) 
      const name = (friend && friend.name) || r.username
      return {username: r.username, name: name}
    })

    const messages = c.messages.map(m => {
      const friend = friends!.find(f => f.username === m.sender)
      const name = (friend && friend.name) || m.sender

      const fromMe = user?.username === m.sender

      return {...m, sender: name, fromMe}
    })

    const selected = i === selectedConversationIndex
    return {...c, recipients,messages, selected}
  })

  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedConversationIndex],
    selectConversationIndex: setSelectedConversationIndex,
    createConversation,
    sendMessage
  }

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  )
}


function arraysAreEqual (a: string[], b: string[]) {
  if(a.length !== b.length) return false
  a.sort()
  b.sort()

  return a.every((e:string, i:number)=>e === b[i])
}
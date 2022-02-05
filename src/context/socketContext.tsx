import { createContext, FC, useContext, useEffect, useState } from 'react'
import { beUrl } from '../config'
import { useUserContext } from './userContext'
import io, { Socket } from 'socket.io-client'
import { SocketContextProps } from './contextTypes'

const SocketContext = createContext<Partial<SocketContextProps>>({})

export const useSocketContext = () => {
  return useContext(SocketContext)
}

export const SocketProvider: FC = ({children}) => {
  const {user} = useUserContext()
  const [socket, setSocket] = useState<Socket | null>(null)
  
  useEffect(() => {
    const newSocket = io(beUrl, {query: {id: user?.username}})

    setSocket(newSocket)

    return () => {newSocket.close()}
  }, [user])
  
  return (
    <SocketContext.Provider value={{socket}}>
      {children}
    </SocketContext.Provider>
  )
}

import { OpenConversation } from '../components/conversation/OpenConversation'
import { SideBar } from '../components/SideBar'
import { useConversationContext } from '../context/conversationContext'


export const Chat = () => {
  const { selectedConversation } = useConversationContext()
  return (
    <div style={{height: '100vh'}} className='d-flex bg-dark text-white'>
      <SideBar />
      {selectedConversation && <OpenConversation />}
    </div>
  )
}

// @ts-ignore
import { useState } from 'react'
import { Button, Modal, Nav, Tab } from 'react-bootstrap'
import { Conversations } from './conversation/Conversations'
import { Friends } from './friends/Friends'
import { useUserContext } from '../context/userContext'
import { NewConversationModal } from './conversation/NewConversationModal'
import { NewFriendsModal } from './friends/NewFriendsModal'

const CONVERSATION_KEY = 'conversations'
const FRIENDS_KEY = 'friends'

export const SideBar = () => {
  const {user} = useUserContext()
  const [modalOpen, setModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<any>(CONVERSATION_KEY)
  const conversationOpen = activeTab === CONVERSATION_KEY

  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <div style={{width: '250px'}} className='d-flex flex-column'>
      <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
        <Nav variant='tabs' className='justify-content-center border-end'>
          <Nav.Item className='w-50'>
            <Nav.Link eventKey={CONVERSATION_KEY} className={`${conversationOpen ? 'fw-bold border border-bottom-0 border-start-0' : 'border-0'} bg-dark text-white text-center  rounded-0`}>Conversation</Nav.Link>
          </Nav.Item>
          <Nav.Item className='w-50'>
            <Nav.Link eventKey={FRIENDS_KEY} className={` ${!conversationOpen ? 'fw-bold border border-bottom-0 border-end-0' : 'border-0'} bg-dark text-white text-center rounded-0`}>Friends</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className='border-end overflow-auto flex-grow-1'>
          <Tab.Pane eventKey={CONVERSATION_KEY}>
            <Conversations />
          </Tab.Pane>
          <Tab.Pane eventKey={FRIENDS_KEY}>
            <Friends />
          </Tab.Pane>
        </Tab.Content>
        <div className='p-2 border-top border-end small'>
          Your username: <span className='text-muted fw-bold'>{user?.username}</span>
        </div>
        <Button className='rounded-0' onClick={()=>setModalOpen(true)}>
          New {conversationOpen ? 'Conversation' : 'Friends'}
        </Button>

        <Modal show={modalOpen} onHide={closeModal} centered>
          {
            conversationOpen
              ? <NewConversationModal closeModal={closeModal}/>
              : <NewFriendsModal closeModal={closeModal}/>
          }
        </Modal>
      </Tab.Container>  
    </div>
  )
}

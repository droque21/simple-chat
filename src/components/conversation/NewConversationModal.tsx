import { FC, FormEvent, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useFriendsContext } from '../../context/friendsContext'
import { useConversationContext } from '../../context/conversationContext'

interface Props {
  closeModal: ()=> void
}
export const NewConversationModal: FC<Props> = ({closeModal}) => {
  const {friends} = useFriendsContext()
  const { createConversation } = useConversationContext()
  const [selectedFriends, setSelectedFriends] = useState<string[]>([])
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createConversation!(selectedFriends)
    closeModal()
  }
  const handleCheckboxChange = (username: string) => {
    setSelectedFriends(prevSelectedF => {
      if(prevSelectedF.includes(username)){
        return prevSelectedF.filter(prevUsername => username !== prevUsername)
      }
      return prevSelectedF.concat(username)
    })
  }

  return (
    <>
      <Modal.Header closeButton className=''>New Conversation</Modal.Header>
      <Modal.Body className=''>
        <Form onSubmit={handleSubmit}>
          {friends!.map(f =>(
            <Form.Group controlId={f.username} key={f.username}>
              <Form.Check
                type='checkbox'
                value={selectedFriends.includes(f.username)}
                label={f.name}
                onChange={()=> handleCheckboxChange(f.username)}
              />
            </Form.Group>
          ))}
          <Button type='submit'>Add Friend</Button>
        </Form>
      </Modal.Body>
    </>
  )
}

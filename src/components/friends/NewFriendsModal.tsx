import { FC, FormEvent } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useFriendsContext } from '../../context/friendsContext'
import { useInput } from '../../hooks/useInput'
import { FriendType } from '../../types/types'

interface Props {
  closeModal: ()=> void
}
export const NewFriendsModal: FC<Props> = ({closeModal}) => {
  const {addNewFriend} = useFriendsContext()
  const [newFriendInfo, changeHandler] = useInput<FriendType>({username: '', name: ''})
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addNewFriend!(newFriendInfo)
    closeModal()
  }

  return (
    <>
      <Modal.Header closeButton className=''>New Friend</Modal.Header>
      <Modal.Body className=''>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-2'>
            <Form.Label htmlFor='username' className="">Username</Form.Label>
            <Form.Control id='username' type='text' onChange={changeHandler} value={newFriendInfo.username} required/>
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label htmlFor='name' className="">Name</Form.Label>
            <Form.Control id='name' type='text' onChange={changeHandler} value={newFriendInfo.name}/>
          </Form.Group>
          <Button type='submit'>Add Friend</Button>
        </Form>
      </Modal.Body>
    </>
  )
}

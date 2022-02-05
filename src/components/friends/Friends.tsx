import { ListGroup } from 'react-bootstrap'
import { useFriendsContext } from '../../context/friendsContext'

export const Friends = () => {
  const {friends} = useFriendsContext()
  return (
    <ListGroup variant="flush" >
      {
        friends!.map(friend =>(
          <ListGroup.Item className='bg-dark text-white border-white' key={friend.username}>{friend.name || friend.username}</ListGroup.Item>
        ))
      }
    </ListGroup>
  )
}

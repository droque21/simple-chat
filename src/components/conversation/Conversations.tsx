import { ListGroup } from 'react-bootstrap'
import { useConversationContext } from '../../context/conversationContext'
import { RecipientType } from '../../types/types'

export const Conversations = () => {
  const {conversations, selectConversationIndex} = useConversationContext()

  return (
    <ListGroup variant="flush">
      {
        conversations!.map((conversation, i) =>(
          <ListGroup.Item 
            action
            onClick={()=> selectConversationIndex!(i)}
            active={conversation.selected}
            className={`text-white border-white ${conversation.selected ? '' : 'bg-dark' }`} 
            key={i}
          >
            {conversation.recipients.map((r)=> r?.name!).join(', ')}
          </ListGroup.Item>
        ))
      }
    </ListGroup>
  )
}
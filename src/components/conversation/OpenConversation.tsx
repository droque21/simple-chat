import { FormEvent, KeyboardEvent, useCallback, useRef, useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { useConversationContext } from '../../context/conversationContext'

export const OpenConversation = () => {
  const {sendMessage, selectedConversation} = useConversationContext()
  const [text, setText] = useState('')
  const setRef = useCallback((node:HTMLDivElement) => {
    if(node){
      node.scrollIntoView({smoth: true})
    }
  }, [])

  const button = useRef<HTMLButtonElement>(null)
  
  const submitHanlder = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const userNames = selectedConversation?.recipients.map(r => r.username) as string[]
    sendMessage!( userNames, text)
    setText('')
  }

  const handleOnEnterPressed = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if(e.key === 'Enter' && !e.shiftKey){
      e.preventDefault()
      if(button.current !== null) button.current.click()
    }
  }
  

  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">
        <div className='d-flex flex-column align-items-start justify-content-end px-3'>
          {selectedConversation?.messages.map((m, i, array) => (
            <div
              ref={array.length - 1 === i ? setRef : null}
              className={`my-1 d-flex flex-column ${m.fromMe ? 'align-self-end' : ''}`} 
              key={i}
            >
              <div className={`rounded px-2 py-1 ${m.fromMe ? 'bg-primary text-white' : 'bg-success' }`}>{m.message}</div>
              <div className={`text-muted small ${m.fromMe ? 'text-end ' : ''}`}>{m.fromMe ? 'You' : m.sender }</div>
            </div>
          ))}
        </div>
      </div>
      <Form onSubmit={submitHanlder}>
        <Form.Group className='m-2'>
          <InputGroup>
            <Form.Control 
              as='textarea' 
              required 
              value={text}
              onChange={e => setText(e.target.value)}
              style={{height: 60, resize: 'none'}}
              onKeyPress={handleOnEnterPressed}
            />
            <Button type='submit' ref={button}>
              Send
            </Button>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  )
}

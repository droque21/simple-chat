import { FormEvent} from "react"
import { Button, Container, Form } from "react-bootstrap"
import { useUserContext } from "../../context/userContext"
import { useInput } from "../../hooks/useInput"

interface UserType {
  username: string
  password: string
}

export const Login = () => { 
  const {value: userInfo, changeHandler} = useInput<UserType>({username: '', password: ''})
  
  const submitHanlder = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(userInfo)
  }

  const userContext = useUserContext()
  console.log(userContext)
  return (
    <Container fluid className="d-flex align-items-center bg-dark" style={{height: '100vh'}}>
      <Form onSubmit={submitHanlder} className="w-100">
        <Form.Group className='mb-2'>
          <Form.Label htmlFor='username' className="text-white">Enter Your Username</Form.Label>
          <Form.Control id='username' type='text' onChange={changeHandler} value={userInfo.username} required/>
        </Form.Group>
        <Form.Group className='mb-2'>
          <Form.Label htmlFor='password' className="text-white">Enter Your Password</Form.Label>
          <Form.Control id='password' type='text' onChange={changeHandler} value={userInfo.password} required/>
        </Form.Group>
        <Button type='submit' className="me-2">Login</Button>
        <Button variant="secondary">Register</Button>
      </Form>
    </Container>     
  )
}
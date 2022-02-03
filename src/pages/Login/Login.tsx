import { FormEvent} from "react"
import { Button, Container, Form } from "react-bootstrap"
import { useUserContext } from "../../context/userContext"
import { useInput } from "../../hooks/useInput"
import { UserType } from "../../types/userTypes"

export const Login = () => { 
  const {value: userInfo, changeHandler} = useInput<UserType>({username: '', password: ''})
  const userContext = useUserContext()
  
  const submitHanlder = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault() 
    userContext.loginUserHandler!(userInfo)
  }

  const registerHanlder = () => {
    userContext.registerUserHandler!(userInfo)
  }

  

  return (
    <Container fluid className="d-flex align-items-center bg-dark" style={{height: '100vh'}}>
      <p className="text-white">{userContext.user?.username || 'Not Connected'}</p>
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
        <Button variant="secondary" onClick={registerHanlder}>Register</Button>
      </Form>
    </Container>     
  )
}
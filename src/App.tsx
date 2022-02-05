import { Navigate, Route, Routes } from 'react-router-dom'
import { useUserContext } from './context/userContext'
import { Chat, Login } from './pages'

function App() {
  const {user} = useUserContext()
  
  return (
    <Routes>
      <Route path='/' element={
        user ? 
          <Chat />
          :<Login />} />
      <Route path='*' element={ <Navigate to='/' />} />
    </Routes>
  )
}

export default App

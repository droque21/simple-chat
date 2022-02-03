import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from './pages'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />}>
        <Route path='projects' element={<h1>Projects</h1>}/>
      </Route>
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  )
}

export default App

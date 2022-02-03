import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import App from './App'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { UserProvicer } from './context/userContext'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvicer>
        <App />
      </UserProvicer>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

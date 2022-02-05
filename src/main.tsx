import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import App from './App'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { UserProvicer } from './context/userContext'
import { FriendsProvicer } from './context/friendsContext'
import { ConversationsProvicer } from './context/conversationContext'
import { SocketProvider } from './context/socketContext'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvicer>
        <SocketProvider>
          <FriendsProvicer>
            <ConversationsProvicer>
              <App />
            </ConversationsProvicer>
          </FriendsProvicer>
        </SocketProvider>
      </UserProvicer>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

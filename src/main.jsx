import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { insertCoin } from 'playroomkit'


await insertCoin({
  skipLobby: false,
  maxPlayersPerRoom: 4,

}

);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

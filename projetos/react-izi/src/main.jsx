import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx' // componente principal do aplicativo (sempre letra maiúscula)
import './index.css'

// Gambiarra do react para renderizar o app, pois a partir do react 18, o método render foi substituído por createRoot
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

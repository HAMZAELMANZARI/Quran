import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './src/css/style.css'
import App from './src/componants/App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

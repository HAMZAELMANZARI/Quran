import { StrictMode, useState, createContext } from 'react'
import { createRoot } from 'react-dom/client'
import './src/css/tailwind.css'
import AppRouter from './src/router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
)


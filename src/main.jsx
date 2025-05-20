import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import {ResumeProvider } from './context/ResumeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <ResumeProvider>
    <ThemeProvider>
    <App />
    </ThemeProvider>
  </ResumeProvider>
  </StrictMode>,
)

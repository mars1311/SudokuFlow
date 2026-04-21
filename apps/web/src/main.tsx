import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { colors } from '@sudoku/core'

import '../../../packages/firebase/src/firebase.ts'

import './index.css'
import App from './App.tsx'

const root = document.documentElement
Object.entries(colors).forEach(([key, value]) => {
  root.style.setProperty(`--${key}`, value)
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

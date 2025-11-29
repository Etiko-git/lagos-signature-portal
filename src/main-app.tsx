import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { LagosSignaturePortalApp } from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LagosSignaturePortalApp />
  </StrictMode>,
)
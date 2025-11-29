import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import { LagosSignaturePortalApp } from './App.tsx'
import LoginPage from './login.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/app/*" element={<LagosSignaturePortalApp />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  </StrictMode>,
)
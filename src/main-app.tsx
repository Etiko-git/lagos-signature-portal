import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { LagosSignaturePortalApp } from './App.tsx'

// Check if user is authenticated before rendering the app
const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
const userDetails = localStorage.getItem('userDetails');

if (!isAuthenticated || !userDetails) {
  // Redirect to login if not authenticated
  window.location.href = "/index.html";
} else {
  // Render the app if authenticated
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <LagosSignaturePortalApp />
    </StrictMode>,
  )
}
// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
// import './index.css'
// import { LagosSignaturePortalApp } from './App.tsx'
// import LoginPage from './login.tsx'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <Router>
//       <Routes>
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/app" element={<LagosSignaturePortalApp />} />
//         <Route path="/" element={<Navigate to="/login" replace />} />
//       </Routes>
//     </Router>
//   </StrictMode>,
// )



import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { LagosSignaturePortalApp } from './App.tsx'
import LoginPage from './login.tsx'

// Check the current path and render accordingly
function RootComponent() {
  const path = window.location.pathname;
  
  if (path === '/app' || path === '/app.html') {
    return <LagosSignaturePortalApp />;
  } else {
    return <LoginPage />;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootComponent />
  </StrictMode>,
)
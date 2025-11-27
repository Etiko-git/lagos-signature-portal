  import { StrictMode } from 'react'
  import { createRoot } from 'react-dom/client'
  import './index.css'
  import App from './App.tsx'

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )

// src/main.tsx (Updated for Landing as Default, Dashboard After Login)
// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import './index.css';
// import App from './App.tsx'; // Your dashboard (full app with sidebar, routes, etc.)
// import LandingPage from './LandingPage'; // Your public landing page
// import LagosSignaturePortalApp from './login'; // Your login screen

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<LandingPage />} /> {/* Default: Public landing page */}
//         <Route path="/login" element={<LagosSignaturePortalApp />} /> {/* Login screen */}
//         <Route path="/App" element={<App />} /> {/* Post-login: Full dashboard */}
//         {/* Optional: Redirect /app to /dashboard if needed */}
//         <Route path="/app" element={<App />} />
//       </Routes>
//     </BrowserRouter>
//   </StrictMode>,
// );
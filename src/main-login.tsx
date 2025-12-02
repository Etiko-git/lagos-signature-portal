
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import LoginPage from './login.tsx';

const root = createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <LoginPage />
  </StrictMode>
);
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router';
import {MantineProvider  } from '@mantine/core'
import { AuthProvider } from './contexts/authContext/index.js';



createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <MantineProvider > 
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>
  
)

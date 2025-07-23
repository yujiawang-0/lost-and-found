import '@mantine/core/styles.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router';
import {MantineProvider  } from '@mantine/core'



createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <MantineProvider > 
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>
  
)
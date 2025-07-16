import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router';
import {Toaster} from "react-hot-toast"
import {MantineProvider } from '@mantine/core'

createRoot(document.getElementById('root')).render(
  
    <StrictMode>
      <MantineProvider> 
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </MantineProvider>
    </StrictMode>
  
)

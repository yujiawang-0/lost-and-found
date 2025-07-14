import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router';
import {MantineProvider , createTheme } from '@mantine/core'

const theme = createTheme({
  /** Your theme override here */
});

createRoot(document.getElementById('root')).render(
  <MantineProvider theme={theme} > 
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  </MantineProvider>,
)

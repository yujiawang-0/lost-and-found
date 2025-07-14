import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LostPage from './pages/foundPage.jsx';  // change this if needed!
import LostItemForm from './pages/forms/lostItemForm.jsx';
import HomePage from './pages/HomePage.jsx';  // add this if you have a homepage

export default function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/lost-items" element={<LostPage />} />
          <Route path="/create-lost-item" element={<LostItemForm />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

// import './global.css'; // your global styles

import { Routes, Route } from 'react-router';
import HomePage from './pages/HomePage';
import LostPage from './pages/LostPage';
import FoundPage from './pages/FoundPage';
import ItemDetailPage from './pages/ItemDetailPage';
import SettingsPage from './pages/SettingsPage';
import CreatePage from './pages/CreatePage';



export default function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/lost" element={<LostPage />} />
      <Route path="/found" element={<FoundPage />} />
      <Route path="/create" element={<CreatePage />} />
      <Route path="/lost/:id" element={<ItemDetailPage />} />
      <Route path="/found/:id" element={<ItemDetailPage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>

  );

}





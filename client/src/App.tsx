// import './global.css'; // your global styles

import { Routes, Route } from 'react-router';
import LostPage from './pages/LostPage';
import FoundPage from './pages/FoundPage';
import ItemDetailPage from './pages/ItemDetailPage';
import SettingsPage from './pages/SettingsPage';
import CreatePage from './pages/CreatePage';
import MainLayout from './pages/MainLayout';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';




export default function App() {
  
  return (
    <div> 
      <Toaster />
      <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<LostPage />} />
            <Route path="/lost" element={<LostPage />} />
            <Route path="/found" element={<FoundPage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/lost/:id" element={<ItemDetailPage />} />
            <Route path="/found/:id" element={<ItemDetailPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      {/* <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lost" element={<LostPage />} />
        <Route path="/found" element={<FoundPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/lost/:id" element={<ItemDetailPage />} />
        <Route path="/found/:id" element={<ItemDetailPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes> */}
    </div>
  );

}





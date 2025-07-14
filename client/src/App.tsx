// import './global.css'; // your global styles

import { Routes, Route } from 'react-router';
import LostPage from './pages/LostPage';
import FoundPage from './pages/FoundPage';
import ItemDetailPage from './pages/ItemDetailPage';
import SettingsPage from './pages/SettingsPage';


//import { Header } from './components/Header/Header';
import { Navbar } from './components/Navbar/Navbar';
import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';


export default function App() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />
        <div>Logo</div>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        navbar
      </AppShell.Navbar>

      <AppShell.Main>Main</AppShell.Main>
      
      <Routes>
        <Route path="/" element={<LostPage />} />
        <Route path="/lost" element={<LostPage />} />
        <Route path="/found" element={<FoundPage />} />
        <Route path="/lost/:id" element={<ItemDetailPage />} />
        <Route path="/found/:id" element={<ItemDetailPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>

    </AppShell>
  );
}





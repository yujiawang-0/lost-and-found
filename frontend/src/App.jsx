// import { useState } from 'react'
import './App.css'
import {Route, Routes } from "react-router";
import LostPage from "./pages/LostPage"; // lost page is the defacto homepage
import FoundPage from "./pages/FoundPage";
import ItemDetailPage from "./pages/ItemDetailPage"; 
import SettingsPage from "./pages/SettingsPage"; 

// import { Toaster, toast } from "react-hot-toast";



// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import { MantineProvider, AppShell, Burger} from '@mantine/core';
import { Navbar } from './components/NavbarComponent/Navbar'
import { useDisclosure } from '@mantine/hooks';
import { Demo } from './components/TestComponent/Demo';
import { Header } from './components/Header';



export default function App() {

  const [opened, { toggle }] = useDisclosure();

  return (
    <div>
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
          <Header />
        </AppShell.Header>

        <AppShell.Navbar p="md">
          <Navbar />
        </AppShell.Navbar>

        <AppShell.Main>
          <Demo />
        </AppShell.Main>

        <Routes>
          <Route path='/' element={<LostPage />} />
          <Route path='/lost' element={<LostPage />} />
          <Route path='/found' element={<FoundPage />} />
          <Route path='/createLostItem' element={<createLostItem/>} />
          <Route path='/createFoundItem' element={<createFoundItem/>} />
          <Route path='/lost/:id' element={<ItemDetailPage />} />
          <Route path='/found/:id' element={<ItemDetailPage />} />
          <Route path='/settings' element={<SettingsPage />} />
        </Routes>
    </AppShell> 

    </div>
  );
}


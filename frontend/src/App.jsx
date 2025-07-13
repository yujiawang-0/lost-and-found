import { useState } from 'react'
import './App.css'
import {Route, Routes } from "react-router";
import LostPage from "./pages/LostPage"; // lost page is the defacto homepage
import FoundPage from "./pages/FoundPage"; 
import ItemDetailPage from "./pages/ItemDetailPage"; 
import SettingsPage from "./pages/SettingsPage"; 
import { Toaster, toast } from "react-hot-toast";



// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';


export default function App() {


  return <MantineProvider>{
    <div>
      {/* <Toaster position='top-center' />
      <button onClick={() => toast.success("congratulations")}>Click me</button> */}

      <Routes>
        <Route path='/lost' element={<LostPage />} />
        <Route path='/found' element={<FoundPage />} />
        <Route path='/lost/:id' element={<ItemDetailPage />} />
        <Route path='/found/:id' element={<ItemDetailPage />} />
        <Route path='/settings' element={<SettingsPage />} />
      </Routes>


    </div>
    }</MantineProvider>;
}
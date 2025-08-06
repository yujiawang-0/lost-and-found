import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Navigate, Outlet } from 'react-router';

import { useState, useEffect } from 'react';
import { DoubleHeader } from '../components/Header/Header';
import { useAuth } from '../contexts/authContext';

export default function MainLayout() {
  const [opened, { toggle }] = useDisclosure();
  const { userLoggedIn } = useAuth();

  return (

    <div>
      {userLoggedIn && (<Navigate to={'/'} replace={true} />)}
      <AppShell header={{ height: 118 }} padding="md">
        <AppShell.Header>
            {/* <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" /> */}
            <DoubleHeader />
        </AppShell.Header>

        <AppShell.Main>
            <Outlet /> 
        </AppShell.Main>
    </AppShell>
    </div>
  );
}

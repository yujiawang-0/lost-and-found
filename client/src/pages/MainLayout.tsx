import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet } from 'react-router';

import { useState, useEffect } from 'react';
import { DoubleHeader } from '../components/Header/Header';

export default function MainLayout() {
  const [opened, { toggle }] = useDisclosure();

  return (

    <AppShell header={{ height: 118 }} padding="md">
        <AppShell.Header>
            {/* <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" /> */}
            <DoubleHeader />
        </AppShell.Header>

        <AppShell.Main>
            <Outlet /> 
        </AppShell.Main>
    </AppShell>

  );
}

import { AppShell, Burger } from '@mantine/core';
import { Header } from '../components/Header/Header';
import { Navbar } from '../components/Navbar/Navbar';

import { useDisclosure } from '@mantine/hooks';
  

export default function HomePage() {
    const [opened, { toggle }] = useDisclosure();
    return (
    <AppShell
      header={{ height: 56 }}
      navbar={{
        width: 96,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        {/* <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        /> */}
        <Header />
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Navbar />
      </AppShell.Navbar>

      <AppShell.Main>

      </AppShell.Main>

    </AppShell>
    )
};

//export default HomePage;

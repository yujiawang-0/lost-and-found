import { useState } from 'react';
import { Burger, Container, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Aperture } from 'lucide-react'
// import { PiQuestionMarkFill } from "react-icons/pi";
import classes from './HeaderSimple.module.css';

const links = [
  { link: '/lost', label: 'Lost' },
  { link: '/found', label: 'Found' },
  // { link: '/create', label: 'Create' },
];

export function HeaderSimple() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <header className={classes.header}>
      <Container fluid size="md" className={classes.inner}>
        <Group>
            <Aperture size={28} />
            <h2>Lost & Found</h2>
        </Group>
        
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}
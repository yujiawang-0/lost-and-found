import { useState } from 'react';
import {
    Settings ,
    MessageSquareMore,
    CircleUser,
    House,
    Feather 
} from "lucide-react"
import { Center, Stack, Tooltip, UnstyledButton, } from '@mantine/core';
import classes from './Navbar.module.css';

console.log(classes);

function NavbarLink({ icon: Icon, label, active, onClick }) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={classes.link}
        data-active={active || undefined}
      >
        <Icon size={20} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: House, label: 'Home' },
  { icon: MessageSquareMore, label: 'Messages' },
  { icon: CircleUser, label: 'Account' },
  { icon: Settings, label: 'Settings' },
];

export function Navbar() {
  const [active, setActive] = useState(2);

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));


  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>
    </nav>
  );
}

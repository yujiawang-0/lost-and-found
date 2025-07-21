import { useState } from 'react';
import { 
  Search, 
  BadgeQuestionMark,
  Sun, 
  Moon,
  CircleOff,
  ChevronDown,
  Settings,
  MessageSquareMore,
  CircleUser, 
  LogOut,
  Flag,
  Plus

} from "lucide-react"
import cx from 'clsx';
import { 
  Avatar,
  Burger,
  Container,
  Group,
  Menu,
  Tabs,
  Text,
  UnstyledButton,
  useMantineTheme,
  Autocomplete, 
  useMantineColorScheme, 
  useComputedColorScheme, 
  ActionIcon, 
  Button} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import classes from './Header.module.css';
import action from './ActionToggle.module.css';
import tabby from './HeaderTabs.module.css';
import { Link } from 'react-router';

const links = [
  { link: '/lost', label: 'Lost' },
  { link: '/found', label: 'Found' },
  
];

const user = {
  name: 'Jane Spoonfighter',
  email: 'janspoon@fighter.dev',
  image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png',
};

export function Header() {
  const [opened, { toggle }] = useDisclosure(false);
    const theme = useMantineTheme();

  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');
  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
  };

  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      onClick={(event) => event.preventDefault()}
    >
      {link.label}
    </a>
  ));

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
            <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
            <BadgeQuestionMark size={28} />
            <h2>
              Lost & Found
            </h2>
        </Group>
        
        <Group>
          <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
            {items}
          </Group>
          <Autocomplete
            className={classes.search}
            placeholder="Search"
            leftSection={<Search size={16}  />}
            data={['item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'item7']}
            visibleFrom="xs"
          />
        </Group>

      <Container>
        <Group justify="flex-end">
          <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: 'pop-top-right' }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(tabby.user, { [tabby.userActive]: userMenuOpened })}
              >
                <Group gap={7}>
                  <Avatar src={user.image} alt={user.name} radius="xl" size={20} />
                  <Text fw={500} size="sm" lh={1} mr={3}>
                    {user.name}
                  </Text>
                  <ChevronDown size={12} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={<Flag size={16} color={theme.colors.red[6]} />}
              >
                Your noticed
              </Menu.Item>
              <Menu.Item
                leftSection={<MessageSquareMore size={16} color={theme.colors.blue[6]} />}
              >
                Your chats
              </Menu.Item>

              <Menu.Label>Settings</Menu.Label>
              <Menu.Item leftSection={<Settings size={16} />}>
                Account settings
              </Menu.Item>
              <Menu.Item leftSection={<LogOut size={16} />}>Logout</Menu.Item>

              <Menu.Divider />
              <Menu.Item color="red" leftSection={<CircleOff size={16} />}>
                Delete account
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>

          <ActionIcon
            onClick={() => toggleColorScheme()}
            variant="default"
            size="xl"
            radius="md"
            aria-label="Toggle color scheme"
          >
            <Sun className={cx(action.icon, action.light)} />
            <Moon className={cx(action.icon, action.dark)} />
          </ActionIcon>

          <Link to={"/create"}> 
            <Button leftSection={<Plus size="16"/>} >
              Create New
            </Button>
          </Link>
        </Group>
      </Container>
      </div>
    </header>
  );
}
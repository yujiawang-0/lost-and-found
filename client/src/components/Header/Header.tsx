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
import { useState } from 'react';
import { 
    ActionIcon, 
    Anchor, 
    Autocomplete, 
    Avatar, 
    Box, 
    Text,
    Burger, 
    Button, 
    Container, 
    Flex, 
    Group, 
    Menu, 
    UnstyledButton, 
    useComputedColorScheme, 
    useMantineColorScheme, 
    useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import classes from './DoubleHeader.module.css';
import lighting from './ActionToggle.module.css';
import { Link } from "react-router";
import { doSignOut } from "../../firebase/auth";
import { useAuth } from "../../contexts/authContext";


const mainLinks = [
  { link: '/lost', label: 'Lost' },
  { link: '/found', label: 'Found' },
];


export function DoubleHeader() {
    const [opened, { toggle }] = useDisclosure(false);
    const [active, setActive] = useState(0);
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const { currentUser } = useAuth();


    const user = {
    name: currentUser.displayName || 'Jane Spoonfighter',
    email: currentUser.email || 'janspoon@fighter.dev',
    image: currentUser.photoURL || 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png',
    };

    const theme = useMantineTheme();
      const { colorScheme, setColorScheme } = useMantineColorScheme();
      const computedColorScheme = useComputedColorScheme('light');
      const toggleColorScheme = () => {
        setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
    };


  const mainItems = mainLinks.map((item, index) => (
    <Anchor<'a'>
      href={item.link}
      key={item.label}
      className={classes.mainLink}
      data-active={index === active || undefined}
      onClick={(event) => {
        // event.preventDefault();
        setActive(index);
      }}
    >
      {item.label}
    </Anchor>
  ));

  const handleLogOut = async () => {
    try {
        if (!window.confirm("Are you sure you want to logout?")) return; 
        await doSignOut();
        console.log("User signed out");
    } catch (err) {
        console.error('Error in signing out:', err);
    }
  }

  return (
    <header className={classes.header}>
        {/* top row */}
        <Flex className={classes.topRow}>
            <Group>
                <BadgeQuestionMark size={28} />
                <Box visibleFrom="md">
                    <h2>Lost & Found</h2>
                </Box>
            </Group>

            <Group className={classes.mainLinks}>
                {mainItems}
            </Group>
            

            <Group> 
                {/* create button for small screen */}
                <Box hiddenFrom="sm">
                    <Link to={"/create"}> 
                        <Button variant='filled' >
                            <Plus size="16"/>
                        </Button>
                    </Link>
                </Box>

                {/* create button for larger screen */}
                <Box visibleFrom="sm">
                    <Link to={"/create"}> 
                        <Button variant='filled' leftSection={<Plus size="16"/>} >
                            <Text fw={500} size="sm" lh={1} mr={3}>
                                Add Item
                            </Text>
                        </Button>
                    </Link>
                </Box>
                
                <Group visibleFrom="sm">
                <ActionIcon
                    onClick={() => toggleColorScheme()}
                    variant="default"
                    size="xl"
                    radius="md"
                    aria-label="Toggle color scheme"
                >
                    <Sun className={cx(lighting.icon, lighting.light)} />
                    <Moon className={cx(lighting.icon, lighting.dark)} />
                </ActionIcon>
                
                <Button variant="subtle" size="sm" visibleFrom="xs">
                    <MessageSquareMore size={18} />
                </Button>
                
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
                        className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
                    >
                        <Group gap={7}>
                        <Avatar src={user.image} alt={user.name} radius="xl" size={20} />
                        <Text fw={500} size="sm" lh={1} mr={3} visibleFrom="md">
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
                    <Menu.Item leftSection={<LogOut size={16} />} onClick={handleLogOut}>Logout</Menu.Item>

                    <Menu.Divider />
                    <Menu.Item color="red" leftSection={<CircleOff size={16} />}>
                        Delete account
                    </Menu.Item>
                    </Menu.Dropdown>
                </Menu>

            </Group>
            </Group>

            <Burger
                opened={opened}
                onClick={toggle}
                size="sm"
                hiddenFrom="sm"
            />

        </Flex>

        {/* bottom row */}
        <Box className={classes.searchRow}>
        <Container>
          <Autocomplete
            className={classes.search}
            placeholder="Search"
            leftSection={<Search size={16} />}
            data={[
              "item1",
              "item2",
              "item3",
              "item4",
              "item5",
              "item6",
              "item7"
            ]}
          />
        </Container>
      </Box>

    </header>
  );
}
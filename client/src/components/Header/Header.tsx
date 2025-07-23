import { Search, BadgeQuestionMark} from "lucide-react"
import { Autocomplete, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import classes from './Header.module.css';

const links = [
  { link: '/about', label: 'Features' },
  { link: '/pricing', label: 'Pricing' },
  { link: '/learn', label: 'Learn' },
  { link: '/community', label: 'Community' },
];

export function Header() {
  const [opened, { toggle }] = useDisclosure(false);

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
      </div>
    </header>
  );
}
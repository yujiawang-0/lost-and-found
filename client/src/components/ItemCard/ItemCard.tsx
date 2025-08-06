// import { IconHeart } from '@tabler/icons-react';
import { ActionIcon, Badge, Button, Card, Group, Image, Text } from '@mantine/core';
import classes from './BadgeCard.module.css';
import {
    Trash,
    SquarePen,
} from "lucide-react"
import { Link } from 'react-router';

// const mockdata = {
//   image:
//     'https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
//   title: 'Verudela Beach',
//   country: 'Croatia',
//   description:
//     'Completely renovated for the season 2020, Arena Verudela Bech Apartments are fully equipped and modernly furnished 4-star self-service apartments located on the Adriatic coastline by one of the most beautiful beaches in Pula.',
//   badges: [
//     { emoji: '☀️', label: 'Sunny weather' },
//     { emoji: '🦓', label: 'Onsite zoo' },
//     { emoji: '🌊', label: 'Sea' },
//     { emoji: '🌲', label: 'Nature' },
//     { emoji: '🤽', label: 'Water sports' },
//   ],
// };

// future tags feature can be implemented through badges component on mantine.



export function ItemCard({item}) {
//   const { image, title, description, country, badges } = mockdata;
//   const features = badges.map((badge) => (
//     <Badge variant="light" key={badge.label} leftSection={badge.emoji}>
//       {badge.label}
//     </Badge>
//   ));

    const formatDate = (isoString : string) => {
        const date  = new Date(isoString);
        return date.toLocaleDateString(undefined, {year: 'numeric', month: 'long', day: 'numeric'});
    };

    const { image, name, description, createdAt, dateLost } = item;

  return (
    <Link to={`/lost/${item._id}`}> 
        <Card 
            withBorder 
            radius="md" 
            p="md" 
            className={classes.card}
            >
        <Card.Section>
            <Image src={`http://localhost:8080/uploads/${image}`} alt={name} height={180} />
        </Card.Section>

        <Card.Section className={classes.section} mt="md">
            <Group justify="apart">
            <Text fz="lg" fw={500}>
                {name}
            </Text>
            <Badge size="sm" variant="light">
                Lost
            </Badge>
            </Group>
            <Text fz="sm" mt="xs">
            {description}
            </Text>
        </Card.Section>

        {/* <Card.Section className={classes.section}>
            <Text mt="md" className={classes.label} c="dimmed">
            Perfect for you, if you enjoy
            </Text>
            <Group gap={7} mt={5}>
            {features}
            </Group>
        </Card.Section> */}

        <Group mt="xs">
            <Text size= "sm" c="dimmed">
                Lost on: {formatDate(dateLost)}
            </Text>
            <Text size= "sm" c="dimmed">
                Posted on: {formatDate(createdAt)}
            </Text>
            <ActionIcon variant="default" radius="md" size={36}>
                <SquarePen className={classes.like} />
            </ActionIcon>
            <ActionIcon variant="default" radius="md" size={36}>
                <Trash className={classes.like} />
            </ActionIcon>
        </Group>
        </Card>
    </Link>
  );
}



{/* <Card key= {post._id} shadow= "sm" padding="lg" withBorder>
                        {post.image && (
                            <Card.Section mb="sm">
                                <Image src={`/uploads/${post.image}`} alt = {post.name} 
                                // alt is included in case the image cant load 
                                />
                            </Card.Section>
                        )}

                        <Text fw={500}>{post.name}</Text>

                        <Text size= "sm" c="dimmed">
                            Lost on: {formatDate(post.dateLost)}
                        </Text>

                        <Text>
                            Posted on: {formatDate(post.createdAt)}
                        </Text>

                        <Text size="sm">{post.description}</Text>
                    </Card> */}
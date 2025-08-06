// import { IconHeart } from '@tabler/icons-react';
import { ActionIcon, Badge, Button, Card, Group, Image, Text, NavLink } from '@mantine/core';
import classes from './BadgeCard.module.css';
import {
    Trash,
    SquarePen,
} from "lucide-react"
import { Link,  } from 'react-router';
import { formatDate } from '../../lib/utils';
import axiosInstance from '../../lib/axios';
import toast from 'react-hot-toast';

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



export function ItemCard({item, setLostItems}) {
//   const { image, title, description, country, badges } = mockdata;
//   const features = badges.map((badge) => (
//     <Badge variant="light" key={badge.label} leftSection={badge.emoji}>
//       {badge.label}
//     </Badge>
//   ));


    const { image, name, description, createdAt, dateLost } = item;

    const handleDelete = async (e, id) => {
        e.preventDefault(); // get rid of the navigation behaviour of the whole card

        if (!window.confirm("Are you sure you want to delete this item?")) return; 
        // maybe can use mantine modal instead.

        try {
            await axiosInstance.delete(`/lost/${id}`)
            setLostItems((prev) => prev.filter(item => item._id !== id)) 
            // get rid of the deleted one
            toast.success("Item deleted successfully")
        } catch (error) {
            console.log("Error in handleDelete", error);
            toast.error("Failed to delete item")
        }
    }


    return ( 
        <Card 
            component={Link}
            to={`/lost/${item._id}`}
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

        <Group mt="xs" justify='space-between'>
            <Text size= "sm" c="dimmed">
                Lost on: {formatDate(dateLost)}
            </Text>
            {/* <Text size= "sm" c="dimmed">
                Posted on: {formatDate(createdAt)}
            </Text> */}
            <Group justify='flex-end'>
                <ActionIcon variant="default" radius="md" size={36}>
                    <SquarePen className={classes.like} />
                </ActionIcon>
                <ActionIcon 
                    variant="default" 
                    radius="md" 
                    size={36}
                    onClick={(e) => handleDelete(e, item._id)}
                    >
                    <Trash className={classes.like} />
                </ActionIcon>
            </Group>
        </Group>
        </Card>
  );
}




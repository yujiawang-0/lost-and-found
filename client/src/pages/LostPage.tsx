import {Card, Image, Text, Stack} from '@mantine/core';
import React, {useEffect, useState} from 'react';

interface Post {
    _id: string;
    name: string;
    description: string;
    image?: string;
    category: string;
    location: string;
    dateLost: string; 
    createdAt: string;
}

const LostPage = async () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    return (
    <Stack>

    </Stack>)
        
    
};

export default LostPage;

import React, {useEffect, useState} from 'react';
import { Autocomplete, Button, Card, CardSection, Group, Image, Select, SimpleGrid, Text } from '@mantine/core';
import {DateInput} from '@mantine/dates';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useUserStore } from './userStore';
import { useNavigate } from 'react-router';

interface Item {
    _id: string;
    name: string;
    description: string;
    image?: string;
    category: string;
    location: string;
    dateLost?: string;
    dateFound?: string;
    createdAt: string;
    type: 'lost' | 'found';
}

interface LocationResponse {
    success: boolean;
    data : string[]; // an array of possible locations
}

interface ItemResponse {
  success: boolean;
  data: Item[];
} 
// the structure of the item sent from the backend to the frontend 
// after the backend searches for the array of items that match the labels

interface SelectOption {
    value: string;
    label: string;
}
// each string of location responses is converted into a SelectOption object

const MyPostsPage = () => {
    const user = useUserStore((state => state.user)); 
    // extracts the user field from the global state
    const navigate = useNavigate();
    const [items, setItems] = useState<Item[]>([]); // an array of items
    const [locationOptions, setLocationOptions] = useState<SelectOption[]>([]);
    // an array of value label pair objects 
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [loading, setLoading] = useState(true);

    const [filters, setFilters] = useState({
        category: '',
        location: '',
        dateLost: '',
        dateFound: '',
        type: '',
    }) // creates a dynamic object with these fields

    const fetchUserItems = async () => {
        try {
            const params = new URLSearchParams();

            if (!user?.email) return;

            params.append('email', user.email);
            if (filters.category) params.append('category', filters.category);
            if (filters.location) params.append('location', filters.location);
            if (filters.dateLost) params.append('dateLost', filters.dateLost);
            if (filters.dateFound) params.append('dateFound', filters.dateFound);
            if (filters.type) params.append('type', filters.type);

            const res = await axios.get<ItemResponse>(`http://localhost:8080/api/items/user?${params.toString()}`);
            setItems(res.data.data);
        } catch (err: any) {
            if (err.response?.status === 429) {
                setIsRateLimited(true);
            } else {
                toast.error('Failed to load your items');
            }
        } finally {
            setLoading(false);
        }
    }

    const fetchLocations = async () => {
        try {
            const res = await axios.get<LocationResponse>('http://localhost:8080/lost/locations');
            if (res.data.success) {
                const formatted = res.data.data.map((loc) => ({
                    value: loc,
                    label: loc,
                })); 
                // makes every string in the array 
                // an object that has a value and a label 
                setLocationOptions(formatted);
            }
        } catch {
            toast.error('Failed to load locations');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`http://localhost:8080/lost/${id}`);
            toast.success('Item deleted');
            setItems((prev) => prev.filter((item) => item._id !== id)); // remove from the array of items
        } catch {
            toast.error('Failed to delete');
        }
    };

    const formatDate = (iso: string) => 
        new Date(iso).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

    useEffect(() => {
        fetchLocations();
        fetchUserItems();
    }, [user]);

    return (
        <div>
            <Text fw={700} fz="xl" mb="sm">
                My Posts
            </Text>

            <Group>
                <Select
                    label = "Filter by category"
                    placeholder = "Select category"
                    value= {filters.category}
                    onChange= {(value) => 
                        setFilters((prev) => ({...prev, category: value || ''}))
                    }
                    data={[
                        'Electronics',
                        'Wallet',
                        'Identification Documents',
                        'Keys',
                        'Bag',
                        'Stationery',
                        'Clothing',
                        'Jewellery',
                        'Accessories',
                        'Sports Equipment',
                        'Eyewear',
                        'Footwear',
                        'Toys',
                        'Pet Items',
                        'Cash',
                        'Travel Documents',
                        'Household Items',
                        'Others',
                    ]}
                    clearable
                /> 
                
                <Autocomplete 
                    label= "Filter by location"
                    placeholder= "Start typing a location"
                    value= {filters.location}
                    onChange= {(value) => 
                        setFilters((prev) => ({...prev, location: value || ''}))
                    }
                    data ={locationOptions} // will autocomplete from this data given 
                    clearable
                />

                <Select 
                    label = "Filter by type"
                    placeholder= "Lost or Found"
                    value= {filters.type}
                    onChange= {(value) =>
                        setFilters((prev) => ({...prev, type: value || ''}))
                    }
                    data={['lost', 'found']}
                    clearable
                /> 

                <DateInput 
                    label = "Filter by date"
                    placeholder= "Pick date"
                    value= {filters.dateLost ? new Date(filters.dateLost) :
                            filters.dateFound ? new Date(filters.dateFound) : null}
                    onChange={(date) => 
                        setFilters((prev) => ({
                            ...prev,
                            dateLost: date ? new Date(date).toISOString().split('T')[0] : '',
                            dateFound: date ? new Date(date).toISOString().split('T')[0] : '',
                        }))
                    }
                    clearable
                />

                <Button onClick={fetchUserItems} variant="light" mt="sm">
                    Apply Filters
                </Button>
            </Group>

            <SimpleGrid>
                {items.map((item) => (
                    <Card key={item._id} withBorder shadow="sm">
                        {item.image && (
                            <CardSection>
                                <Image src= {`/uploads/${item.image}`} alt={item.name} height={180}/>
                            </CardSection>
                        )}
                        <Text fw={600}>{item.name}</Text>
                        <Text size="sm" c="dimmed">
                            {item.description}
                        </Text>
                        <Text size="sm" c="dimmed">
                            Posted on: {formatDate(item.createdAt)}
                        </Text>
                        <Text size="sm" c="dimmed">
                            {item.type === 'lost'
                                ? (item.dateLost && `Lost on: ${formatDate(item.dateLost)}`)
                                : (item.dateFound && `Found on: ${formatDate(item.dateFound)}`)}
                        </Text>

                        <Group>
                            <Button
                                variant="light"
                                onClick= {() => navigate(`/`)} // temporary, will have a page they can edit
                            >
                                Edit
                            </Button>
                            <Button
                                variant="light"
                                color="red"
                                onClick={() => handleDelete(item._id)}
                            >
                                Delete
                            </Button>
                        </Group>
                    </Card>
                ))}
            </SimpleGrid>
        </div>
    )
};

export default MyPostsPage;
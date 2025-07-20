import {Card, Image, Text, Stack, Autocomplete, Select,Button} from '@mantine/core';
import { DateInput } from '@mantine/dates';
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
    // create an array of Posts
    const [posts, setPosts] = useState<Post[]>([]);
    const [filters, setFilters] = useState({
        category: '', 
        location: '',
        dateLost: ''
    }); // creates an object with three fields

    const [locationOptions, setLocationOptions] = useState<string[]>([]);
    // creates an array of string to store the locations

    const fetchPosts = async (activeFilters: { category?: string; location?: string; dateLost?: string } = {}) => {
        const params = new URLSearchParams();

        if (activeFilters['category']) params.append('category', activeFilters.category); // access the value stored in category key 
        if (activeFilters['location']) params.append('location', activeFilters.location);
        if (activeFilters['dateLost']) params.append('dataLost', activeFilters.dateLost);

        const query = params.toString()? `?${params.toString()}` : ''; //arrange all of the queries 

        const response = await fetch(`/lost/filter${query}`); //registered as req.query 
        const json = await response.json();

        if (json.success) {
            setPosts(json.data); // both the appearance and internal state 
            // stores the array os posts fetched 
        }
    };

    const fetchLocations = async () => {
        const response = await fetch(`/lost/locations`);
        const json = await response.json();

        if (json.success) {
            setLocationOptions(json.data); // stores all the locations at that page
        }
    }; 

    useEffect( () => {
        fetchPosts();
        fetchLocations();
    }, []);

    const formatDate = (isoString : string) => {
        const date  = new Date(isoString);
        return date.toLocaleDateString(undefined, {year: 'numeric', month: 'long', day: 'numeric'});
    };

    return (
        <div style={{maxWidth: 600, margin: '0 auto', padding: '1rem'}}>
            <Select 
                label= "Filter by category"
                placeholder= "Select category"
                value= {filters.category} // binds value of input to filters.category state
                onChange= {(value) => setFilters((prev) => ({...prev, category:value ||''}))}
                // React automatically passes the current value of filters state as arguemnt to the callback 
                data= {[
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
                    'Others'
                ]}
                clearable // give them the option to  not have any category filters
                mb= "sm"
            /> 
            <Autocomplete 
                label= "Filter by location"
                placeholder= "Start typing a location"
                value= {filters.location}
                onChange={(value) => setFilters((prev) => ({...prev, locatoin: value}))}
                data= {locationOptions} // dynamic options locaded from bakend
                clearable
                mb = "sm"
            />

            <DateInput
                label= "Filter by date lost"
                placeholder = "Pick date"
                value= {filters.dateLost ? new Date(filters.dateLost): null}
                onChange= {(date) =>
                    setFilters((prev) => ({
                        ...prev, 
                        dateLost: date ? new Date(date).toISOString().split('T')[0] : ''
                    }))
                }
                clearable
                mb="sm"
            />

            <Button 
                fullWidth variant= "light" 
                onClick={() => fetchPosts(filters)}
                // updated filters state will be passed to the fetchPosts 
                // to get relevant posts
                // once the button is clicked 
                mb="md">
                Apply Filters
            </Button>

            <Stack gap="md">
                {posts.map((post) => (
                    <Card key= {post._id} shadow= "sm" padding="lg" withBorder>
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
                    </Card>
                ))}
            </Stack>
        </div>
    )
  
};

export default LostPage;

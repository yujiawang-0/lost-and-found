import {Card, Image, Text, Stack, Autocomplete, Select, Button, Group, SimpleGrid} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import RateLimitedUI from '../components/RateLimitedPage/RateLimitedUI';
import { ItemCard } from '../components/ItemCard/ItemCard';


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

const LostPage = () => {
    // create an array of Posts
    const [posts, setPosts] = useState<Post[]>([]);
    const [filters, setFilters] = useState({
        category: '', 
        location: '',
        dateLost: ''
    }); // creates an object with three fields

    const [locationOptions, setLocationOptions] = useState<string[]>([]);
    
    // creates an array of string to store the locations

    const [isRateLimited, setIsRateLimited] = useState(false)
    const [lostItems, setLostItems] = useState([]);
    const [loading, setLoading] = useState(true);

    
    const fetchPosts = async (activeFilters: { category?: string; location?: string; dateLost?: string } = {}) => {
        try {
            const params = new URLSearchParams();

            if (activeFilters.category) params.append('category', activeFilters.category);
            if (activeFilters.location) params.append('location', activeFilters.location);
            if (activeFilters.dateLost) params.append('dateLost', activeFilters.dateLost);

            const query = params.toString() ? `?${params.toString()}` : '';
            const response = await axios.get(`http://localhost:8080/lost/filter${query}`);

            console.log("Fetched /lost/filter result:", response.data);

            if (response.data.success) {
            setPosts(response.data.data);
            } else {
            toast.error('Failed to fetch filtered posts');
            }
        } catch (error: any) {
            console.error('Error fetching posts:', error);
            if (error.response?.status === 429) {
            setIsRateLimited(true);
            } else {
            toast.error('Failed to load lost items...');
            }
        } finally {
            setLoading(false);
        }
    };


    const fetchLocations = async () => {
        try {
            const response = await axios.get('http://localhost:8080/lost/locations');
            if (response.data.success) {
            const formatted = response.data.data.map((loc: string) => ({
                value: loc,
                label: loc,
            }));
            setLocationOptions(formatted); // ← now it has .value and .label
            } else {
            toast.error('Failed to fetch locations');
            }
        } catch (error) {
            console.error('Error fetching locations:', error);
            toast.error('Failed to load locations');
        }
    };


    useEffect(() => {
        fetchPosts();
        fetchLocations();
        }, []);


    return (
        <div >
            {isRateLimited && <RateLimitedUI />}
            <Group justify='space-between'>
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
                onChange={(value) => setFilters((prev) => ({...prev, location: value}))}
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
                variant= "light" 
                onClick={() => fetchPosts(filters)}
                // updated filters state will be passed to the fetchPosts 
                // to get relevant posts
                // once the button is clicked 
                mb="sm">
                Apply Filters
            </Button>
            </Group>
            
            <SimpleGrid 
            cols={{ base: 1, sm: 2, lg: 3 }}
            spacing={{ base: 10, sm: 'xl' }}
            verticalSpacing={{ base: 'md', sm: 'xl' }}  
            >
                {posts.map((post) => (
                    <ItemCard key={post._id} item={post} />
                ))}
            </SimpleGrid>
        </div>
    )
  
};

export default LostPage;



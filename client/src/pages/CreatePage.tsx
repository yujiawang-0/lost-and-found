import React from 'react'; 
import { useState } from 'react';
import { useForm } from '@mantine/form';
import {TextInput, Button, Group, Select, FileInput} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import AddressInput from './addressInput';
import { useNavigate } from 'react-router';


function CreatePage() {
    const form = useForm({
        mode: 'uncontrolled', 
        initialValues: {
            name: "", 
            description: "", 
            image: "", 
            category: "", 
            location: "",
            dateLost: "",
            status: "lost"
        }
    });

    const navigate = useNavigate();
    
    const handleLocationSelect = (loc) => {
        form.setFieldValue('location', loc.address);
    }

    const handleSubmit = async (values) => { 
        try {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('description', values.description);
            formData.append('category', values.category);
            formData.append('location', values.location);
            formData.append('dateLost', values.dateLost);
            formData.append('status', values.status);

            if (values.image) { // if image is provided
                formData.append('image', values.image);
            }
            // chat told me that to include images the user uploaded
            // we cannot use body: JSON.stringify(values) like usual

            const response = await fetch('/lost', {
                method: 'POST',
                body: formData
            })

            const result = await response.json();

            if (response.ok) {
                navigate('/lost-items'); 
            } else {
                console.error('Failed');
                // i was thinking of adding a toast here 
                // to tell the user she/he cannot submit item
            }
        } catch (err) {
            console.error('error:', err);
        }
        
    };


    return (
       <div>
        <TextInput 
            label = "Name of Item"
            placeholder = "Name"
            key={form.key('name')}
            {...form.getInputProps('name')}
        />
        <TextInput 
            mt="md"
            label = "Description"
            key={form.key('description')}
            {...form.getInputProps('description')}
        />
        <FileInput
            label="Upload photo"
            placeholder="Choose an image"
            accept="image/*"
            capture="environment"
            {...form.getInputProps('image')}
            clearable
        />
        <Select
            mt="md"
            label="Category"
            placeholder="Pick a category"
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
                'Others'
            ]}
            {...form.getInputProps('category')}
        /> 
        <AddressInput onSelect={handleLocationSelect}/>
        <DateInput
            mt="md"
            label="Date Lost"
            placeholder="Select date"
            value={form.values.dateLost ? new Date(form.values.dateLost) : null}
            onChange={(date) =>
                form.setFieldValue(
                'dateLost',
                date ? date.toString().slice(0, 10) : ''
                )
            } 
            // only the date field needs an onChange unlike the others
            // where the form from mantine is already inbuilt 
            valueFormat="YYYY-MM-DD"
        />

        <Group justify = "center" mt="xl"> 
            <Button
                onClick= {() => handleSubmit}>
                    Submit
            </Button>
        </Group>
       </div>
    );
}


export default CreatePage;

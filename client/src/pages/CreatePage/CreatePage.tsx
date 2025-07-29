//import React from 'react';
//import { useState } from 'react';
import { useForm, Form } from '@mantine/form';
import { TextInput, Button, Group, Select, FileInput, Image, Card, SimpleGrid, Grid } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import AddressInput from '../AddressInput';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useState } from 'react';
import classes from './ContainedInput.module.css';
import { ClockAlert } from "lucide-react"

interface FormValues {
  name: string;
  description: string;
  image: File | null;
  category: string;
  location: string;
  dateLost: string;
  status: string;
} // define the shape of the data 

interface Location {
  lat: number;
  lng: number;
  address: string;
}

function CreatePage() {
  const form = useForm<FormValues>({ // actual instance of FormValues
    mode: 'uncontrolled',
    initialValues: {
      name: "",
      description: "",
      image: null,
      category: "",
      location: "",
      dateLost: "",
      status: "lost",
    },
    validate: {
      // any validation for the future that we want to do for the form
      name: (value) => (value.trim() === '' ? 'Name is required' : null),
      description: (value) => (value.trim() === '' ? 'Description is required' : null),
      category: (value) => (value === '' ? 'Category is required' : null),
      // location: (value) => (value === '' ? 'Location is required' : null),
      // dateLost: (value) => (value === '' ? 'Date is required' : null),
    }

  });
  // form is the in-memory representations of the fields
  // Internal fields in each input/component track both UI appearance and 
  // the underlying data that you eventually send to the backend.

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleLocationSelect = (loc: Location) => {
    form.setFieldValue('location', loc.address); // setFieldValue is provided by useForm
  }; // updates the state 

  const handleSubmit = async (values: FormValues) => { // passes an interface object 
    setLoading(true);
    try {
      const formData = new FormData();
      // FormData is a new empty notebook to store key value pairs 
      formData.append('name', values.name);
      formData.append('description', values.description);
      formData.append('category', values.category);

      if (values.location) {
        formData.append('location', values.location);
      }

      if (values.dateLost){
        formData.append('dateLost', values.dateLost);
      }
      
      formData.append('status', values.status);

      if (values.image) { // if image is provided
        formData.append('image', values.image);
      }
      // chat told me that to include images the user uploaded
      // we cannot use body: JSON.stringify(values) like usual

      const response = await axios.post('http://localhost:8080/lost', formData, 
        {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      );

    if (response.status === 201) { 
      // item has been successfully created
      toast.success("New item has been created successfully");
      navigate('/lost');
    } else { // only catches 2xx statuses
      console.error('Upload failed:', response.data);
      toast.error('New item has probably NOT been added');
    }
  } catch (err: any) { // catching any errors that axios throws and other errors
    if (err.response.status === 429) {
      toast.error("Slow down! You are creating items too fast!",{
        duration: 4000,
        icon: ClockAlert
      });

    }
    console.error('Upload error:', err);
    toast.error('Something went wrong during submission');
  } finally {
    setLoading(false);
  }
};


  //     const response = await fetch('/lost', {
  //       method: 'POST', 
  //       body: formData
  //     });

  //     const result = await response.json();

  //     if (response.ok) {
  //       navigate('/lost');
  //     } else {
  //       console.error('Failed');
  //       toast.error('Failed to add a new item');
  //       // i was thinking of adding a toast here 
  //       // to tell the user she/he cannot submit item
  //     }
  //   } catch (err) {
  //     console.error('error:', err);
  //   }
  // };

  return (
    <div>
      <Card>
        <Grid>
          <Grid.Col span={{ base: 12, md: 6}}>
            <FileInput
              label="Upload photo"
              placeholder="Choose an image"
              accept="image/*" // limits the file type that can be selected 
              capture="environment"
              // capture provides a hint to the mobile browswer to 
              // directly open device camera when selecting a file
              {...form.getInputProps('image')}
              clearable //  X icon that allows the user to use a 
            />
            {form.values.image && (
              <Image
                  src={URL.createObjectURL(form.values.image)} // presents the image URL as the actual image
                  alt="Preview"
                  radius="md"
                  fit="cover"
                  mt="md"
                  fallbackSrc='' //TODO: insert a placeholder image if the image file fails to load.
              />
            )}
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6}}>
            <TextInput
              label="Name of Item"
              placeholder="Name"
              classNames={classes}
              key={form.key('name')}
              {...form.getInputProps('name')}
              // updates the form state 
            />

            <TextInput
              mt="md"
              label="Description"
              placeholder= "Describe the object"
              classNames={classes}
              key={form.key('description')}
              {...form.getInputProps('description')}
            />
            
            <Select
              mt="md"
              label="Category"
              placeholder="Pick a category"
              classNames={classes}
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

            <AddressInput onSelect={handleLocationSelect} 
            // onSelect takes in a function as its argument 
            /> 

            <DateInput
              mt="md"
              label="Date Lost"
              placeholder="Select date"
              classNames={classes}
              value={form.values.dateLost ? new Date(form.values.dateLost) : null}
              onChange={(date) =>
                form.setFieldValue(
                  'dateLost',
                  date ? date.toString().slice(0, 10) : ''
                )
              } // updates the appearance of the page
              // only the date field needs an onChange unlike the others
              // where the form from mantine is already inbuilt 
              valueFormat="YYYY-MM-DD"
            />

          </Grid.Col>
        </Grid>
      
      <Group justify="flex-end" mt="xl">
        <Button
          onClick={() => {
            const isValid = form.validate();
            if (isValid.hasErrors) {
              toast.error("Please fill in the required fields");
              return;
            }
            handleSubmit(form.values)}}
            disabled={loading}
            >
          {loading ? "Creating..." : "Create New"}
        </Button>
      </Group>

    </Card>
    </div>
  );
}

export default CreatePage;

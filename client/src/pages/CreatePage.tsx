//import React from 'react';
//import { useState } from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Button, Group, Select, FileInput, Image } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import AddressInput from './AddressInput';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import axios from 'axios';

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
      status: "lost"
    }
  });
  // form is the in-memory representations of the fields
  // Internal fields in each input/component track both UI appearance and 
  // the underlying data that you eventually send to the backend.

  const navigate = useNavigate();

  const handleLocationSelect = (loc: Location) => {
    form.setFieldValue('location', loc.address); // setFieldValue is provided by useForm
  }; // updates the state 

  const handleSubmit = async (values: FormValues) => { // passes an interface object 
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
      //   {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // }
      );

    if (response.status === 201) {
      navigate('/lost');
    } else {
      console.error('Upload failed:', response.data);
      toast.error('Failed to add a new item');
    }
  } catch (err: any) {
    console.error('Upload error:', err);
    toast.error('Something went wrong during submission');
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
      <TextInput
        label="Name of Item"
        placeholder="Name"
        key={form.key('name')}
        {...form.getInputProps('name')}
        // updates the form state 
      />
      <TextInput
        mt="md"
        label="Description"
        placeholder= "Describe the object"
        key={form.key('description')}
        {...form.getInputProps('description')}
      />
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
            width={150}
            height={150}
            radius="md"
            fit="cover"
            mt="md"
        />
    )}
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
      <AddressInput onSelect={handleLocationSelect} 
      // onSelect takes in a function as its argument 
      /> 
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
        } // updates the appearance of the page
        // only the date field needs an onChange unlike the others
        // where the form from mantine is already inbuilt 
        valueFormat="YYYY-MM-DD"
      />

      <Group justify="center" mt="xl">
        <Button
          onClick={() => handleSubmit(form.values)}>
          Submit
        </Button>
      </Group>
    </div>
  );
}

export default CreatePage;

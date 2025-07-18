import React, { useState, useEffect } from 'react';
import { TextInput } from '@mantine/core';
import usePlacesAutoComplete, {
  getGeocode, // takes in address string and give back geocode
  getLatLng  // extract coordinates from geocode
} from 'use-places-autocomplete'; // npm i --save use-places-autocomplete 

// Define the type for the onSelect prop
interface AddressInputProps {
  onSelect: (location: {
    lat: number;
    lng: number;
    address: string;
  }) => void;
}

// Define type for currentLocation state
interface CurrentLocation {
  label: string;
  address: string;
  lat: number;
  lng: number;
  isCurrentLocation: boolean;
}

// onSelect is a function passed to AddressInput
function AddressInput({ onSelect }: AddressInputProps) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions
  } = usePlacesAutoComplete(); // state + helper function provider for autocomplete 
  // fields are empty at the beginning

  const [currentLocation, setCurrentLocation] = useState<CurrentLocation | null>(null);

  // detect current location 
  // useEffect(effectFunction, dependencyArray);
  // useEffect runs on mount 
  useEffect(() => {
    if ("geolocation" in navigator) { // if permission is given to the browser 
      navigator.geolocation.getCurrentPosition(
        // position is the object provided by the browser when geolocation succeeds 
        async (position) => {
          const { latitude, longitude } = position.coords;

          const results = await getGeocode({ location: { lat: latitude, lng: longitude } });
          const address = results[0]?.formatted_address || ''; // format geocode as string address

          setCurrentLocation({
            label: `${address}`, address,
            lat: latitude,
            lng: longitude,
            isCurrentLocation: true
          }); // keys you have chosen and created for ur object 
        },
      );
    }
  }, []);

  const handleSelect = async (suggestion: any) => { // the option that the user selected, 
    // one of the objects from combinedSuggestions list 
    if (suggestion.isCurrentLocation) {
      setValue(suggestion.address, false);
      onSelect({
        lat: suggestion.lat,
        lng: suggestion.lng,
        address: suggestion.address // throw it to the createPage 
      });
    } else {
      setValue(suggestion.description, false);
      const results = await getGeocode({ placeId: suggestion.place_id });
      // place_id comes directly from google's places autocomplete api response 
      const { lat, lng } = getLatLng(results[0]);
      onSelect({
        lat, lng, address: suggestion.description
      });
      clearSuggestions();
    }
  };

  const combinedSuggestions = [
    ...(currentLocation ? [currentLocation] : []),
    ...data
  ]; // adds the current location in front of the generated suggestions list 

  return (
    // user starts typing in input 
    <div>
      <TextInput // wrapped it inside a TextInput so it will all look the same
        label= "Address"
        placeholder= "Enter an address"
        value={value} // ensure that the input always displays the current value from your component state 
        onChange={(e) => setValue(e.target.value)} // contents in blank changes dynamically 
        disabled={!ready}
      />
      {status === 'OK' && (
        <ul>
          {combinedSuggestions.map((s, idx) => (
            <li 
                key={idx} 
                style={{ cursor: 'pointer', padding:'4px 8px'}}
                onClick={() => handleSelect(s)}>
              {s.isCurrentLocation ? s.label : s.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
  // iterates through every suggestion returned by ggl 
  // description is inbuilt in each suggestion
}

export default AddressInput;

import React, {useState, useEffect} from 'react';
import usePlacesAutoComplete, {
    getGeocode, // takes in address string and give back geocode
    getLatLng // extract coordinates from geocode 
} from 'use-places-autcomplete';

// onSelect is a function passed to AddressInput
function AddressInput ({onSelect}) {
    const {
        ready, 
        value, 
        suggestions: {status, data}, 
        setValue, 
        clearSuggestions
    } = usePlacesAutoComplete(); // state + helper function provider for autocomplete 
    // fields are empty at the beginning

    // detect current location 
    // useEffect(effectFunction, dependencyArray);
    // dependencyArray tells React when to run the function
    // useEffect runs on mount 
    useEffect(()=> {
        if("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                // position is the object provided by the browser when geolocation succeeds 
                async (position) => {
                    const {latitude, logitude} = position.coords;

                    const results = await getGeocode({location: {lat: latitude, lng: longitude}});
                    const address = results[0]?.formatted_address || ''; // format geocode as string address

                    setValue(address, false);

                    onSelect({lat: latitude, lng: longitude, address}); // passing an object containing 3 keys back to the parent
                }, 
            );
        }
    }, [onSelect]); // tracks reference identity, if block wont run again until new function gets passed

    const handleSelect = async (address) => {
        setValue(address, false); // set to be false so it does not trigger new API request to google
        //setValue updates the address shown in the <input> box
        clearSuggestions();

        const results = await getGeocode({address});
        const {lat, lng} = await getLatLng(results[0]);
        onSelect({lat, lng, address});
        // send up to the parent component so parent can store it and send it to backend
    }

    return (
        // user starts typing in input 
        <div>
            <input 
                value={value} // ensrue that the input always displays the current value from your component state 
                onChange= {(e) => setValue(e.target.value)}
                disabled= {!ready}
                placeholder = 'Enter an address'
            />
            {status === "OK" &&
                data.map(({ place_id, description }) => (
                <div key={place_id} onClick={() => handleSelect(description)}>
                    {description}
                </div>
            ))}
        </div>
  );
  // iterates through every suggestion returned by ggl 
  // for each suggestion obefct it creates an <div> element with a key and a description 
  // description is a property provided by google places api 
}

export default AddressInput;
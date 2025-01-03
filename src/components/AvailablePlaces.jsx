import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import ErrorMessage from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailableData } from '../http.js';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isLoading, setIsLoading] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() =>{
    const fetchedPlaces = async () =>{
      setIsLoading(true);
      try{
        const places = await fetchAvailableData();

        navigator.geolocation.getCurrentPosition((position) =>{
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);
          setIsLoading(false);
        });

      }
      catch(error){
          setError({message: error.message || "Could Not Fetch Data, Please Try Again Later"});
      }
      setIsLoading(false);
    }
    fetchedPlaces();
  },[]);

  if(error){
    return <ErrorMessage title="An Error Occured" message={error.message} />
  }
  

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isLoading}
      loadingText="Fetching Data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}

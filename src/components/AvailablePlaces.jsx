import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import ErrorMessage from './Error.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isLoading, setIsLoading] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() =>{
    const fetchedPlaces = async () =>{
      setIsLoading(true);
      try{
        const response = await fetch("http://localhost:3000/placesss");
        const resData = await response.json();

        if(!response.ok){
          throw new Error("Failed to Fetch Data");
        }

        setAvailablePlaces(resData.places);
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

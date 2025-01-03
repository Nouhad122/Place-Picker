export const fetchAvailableData = async () =>{
    const response = await fetch("http://localhost:3000/places");
        const resData = await response.json();

        if(!response.ok){
          throw new Error("Failed to Fetch Data");
        }
    return resData.places;
}

export const updateUserPlace = async (places) =>{
    const response = await fetch("http://localhost:3000/user-places",{
        method: "PUT",
        body: JSON.stringify({places}),
        headers: {
            'Content-Type': "application/json"
        }
    });

    const resData = await response.json();

    if(!response.ok){
        throw new Error("Failed to fetch Data");
    }
    return resData.message;
}
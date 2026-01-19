const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const registerUser = async (userData:Object) => {
    try{
        //make the call to the backend, variable found in .env
        const response = await fetch(`${BASE_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData),
        });

        if(!response.ok){
            const errorData = await response.json();
            throw new Error(errorData.message || 'Signup failed');
        }

        return await response.json();
    }catch(err){
        console.error("Network Error:", err);
        throw err;
    }
}
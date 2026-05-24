export const checkAvailability = async (username:string, email:string) => {
    const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
    console.log(BASE_URL);
    try {
        const response = await fetch(`${BASE_URL}/api/signupUnique`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({Username: username, Email: email}),
        });
        const res = await response.json();
        return res;
    } catch (err) {
        console.error("Network Error:", err);
        throw err;
    }
}

export const registerUser = async (userData:Object) => {
    const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
    console.log(BASE_URL);
    try{
        //make the call to the backend, variable found in .env
        const response = await fetch(`${BASE_URL}/api/signup`, {
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
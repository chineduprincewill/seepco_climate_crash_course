import axios from "./baseUrl";

export const login = async ( data, setSuccess, setError, setLoggingin ) => {

    setLoggingin(true);

    try{
        const response  = await axios.post('login',
            data,
            {
                headers: { 'Accept' : 'application/json' }
            }
        );    

        console.log(response.data);
        setSuccess(response.data);
    }
    catch (err) {
        if (!err?.response) {
            setError('No Response from Server');
        } else {
            console.log(err.response.data);
            setError(err.response.data);
        }
    }

    setLoggingin(false);
}
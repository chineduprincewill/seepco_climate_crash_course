import axios from "./baseUrl";

export const fetchAuthTutorials = async ( token, data, setTutorials, setError, setFetching ) => {

    setFetching(true);

    try{
        const response  = await axios.post('topic-tutorials',
            data,
            {
                headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
            }
        );    

        console.log(response.data);
        setTutorials(response.data);
    }
    catch (err) {
        if (!err?.response) {
            setError('No Response from Server');
        } else {
            console.log(err.response.data);
            setError(err.response.data);
        }
    }

    setFetching(false);
}


export const createTutorial = async ( token, data, setSuccess, setError, setCreating ) => {

    setCreating(true);

    try{
        const response  = await axios.post('create-tutorial',
            data,
            {
                headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
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

    setCreating(false);
}


export const tutorialActivationAction = async ( token, data, setSuccess, setError, setActivating ) => {

    setActivating(true);

    try{
        const response  = await axios.put('tutorial-activation',
            data,
            {
                headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
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

    setActivating(false);
}


export const updateTutorial = async ( token, data, setSuccess, setError, setUpdating ) => {

    setUpdating(true);

    try{
        const response  = await axios.put('update-tutorial',
            data,
            {
                headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
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

    setUpdating(false);
}
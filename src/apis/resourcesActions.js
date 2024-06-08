import axios from "./baseUrl";

export const fetchTutorialResources = async ( token, data, setResources, setError, setFetching ) => {

    setFetching(true);

    try{
        const response  = await axios.post('tutorial-resources',
            data,
            {
                headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
            }
        );    

        console.log(response.data);
        setResources(response.data?.tutorial_resources);
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


export const fetchPublicTutorialResources = async ( data, setResources, setError, setFetching ) => {

    setFetching(true);

    try{
        const response  = await axios.post('public-tutorial-resources',
            data,
            {
                headers: { 'Accept' : 'application/json' }
            }
        );    

        console.log(response.data);
        setResources(response.data?.tutorial_resources);
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


export const createTutorialResources = async ( token, data, setSuccess, setError, setAdding ) => {

    setAdding(true);

    try{
        const response  = await axios.post('create-tutorial-resource',
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

    setAdding(false);
}


export const resourceActivationAction = async ( token, data, setSuccess, setError, setActivating ) => {

    setActivating(true);

    try{
        const response  = await axios.put('tutorial-resource-activation',
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

import axios from "./baseUrl";

export const fetchAuthCategories = async ( token, setCategories, setError, setFetching ) => {

    setFetching(true);

    try{
        const response  = await axios.get('categories',
            {
                headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
            }
        );    

        console.log(response.data);
        setCategories(response.data);
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


export const createCategory = async ( token, data, setSuccess, setError, setCreating ) => {

    setCreating(true);

    try{
        const response  = await axios.post('create-category',
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


export const categoryActivationAction = async ( token, data, setSuccess, setError, setActivating ) => {

    setActivating(true);

    try{
        const response  = await axios.put('category-activation',
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


export const updateCategory = async ( token, data, setSuccess, setError, setUpdating ) => {

    setUpdating(true);

    try{
        const response  = await axios.put('update-category',
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


export const updateCategoryOrder = async ( token, data, setSuccess, setError, setUpdating ) => {

    setUpdating(true);

    try{
        const response  = await axios.post('update-category-order',
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
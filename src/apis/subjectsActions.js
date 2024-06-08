import axios from "./baseUrl";

export const fetchAuthSubjects = async ( token, data, setSubjects, setError, setFetching ) => {

    setFetching(true);

    try{
        const response  = await axios.post('category-subjects',
            data,
            {
                headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
            }
        );    

        console.log(response.data);
        setSubjects(response.data);
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


export const createSubject = async ( token, data, setSuccess, setError, setCreating ) => {

    setCreating(true);

    try{
        const response  = await axios.post('create-subject',
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


export const subjectActivationAction = async ( token, data, setSuccess, setError, setActivating ) => {

    setActivating(true);

    try{
        const response  = await axios.put('subject-activation',
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


export const updateSubject = async ( token, data, setSuccess, setError, setUpdating ) => {

    setUpdating(true);

    try{
        const response  = await axios.put('update-subject',
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
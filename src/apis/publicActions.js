import axios from "./baseUrl";

export const fetchCategories = async ( setCategories, setError, setFetching ) => {

    setFetching(true);

    try{
        const response  = await axios.get('public-categories',
            {
                headers: { 'Accept' : 'application/json' }
            }
        );    

        console.log(response.data);
        setCategories(response.data?.categories);
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


export const fetchSubjects = async ( data, setSubjects, setError, setFetching ) => {

    setFetching(true);

    try{
        const response  = await axios.post('public-category-subjects',
            data,
            {
                headers: { 'Accept' : 'application/json' }
            }
        );    

        console.log(response.data);
        setSubjects(response.data?.subjects);
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


export const fetchTopics = async ( data, setTopics, setError, setFetching ) => {

    setFetching(true);

    try{
        const response  = await axios.post('public-subject-topics',
            data,
            {
                headers: { 'Accept' : 'application/json' }
            }
        );    

        console.log(response.data);
        setTopics(response.data?.topics);
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


export const fetchTutorials = async ( data, setTutorials, setError, setFetching ) => {

    setFetching(true);

    try{
        const response  = await axios.post('public-topic-tutorials',
            data,
            {
                headers: { 'Accept' : 'application/json' }
            }
        );    

        console.log(response.data);
        setTutorials(response.data?.tutorials);
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
import React, { useContext, useEffect, useState } from 'react'
import { fetchCategories } from '../../apis/publicActions';
import { ToastContainer, toast } from 'react-toastify';
import PublicLoader from '../../common/PublicLoader';
import { AuthContext } from '../../context/AuthContext';
import CategoryFilter from './public-category/CategoryFilter';

const PublicCategory = () => {

    const { updatePublicCategory, updatePublicSubject, updatePublicTopic } = useContext(AuthContext);

    const [categories, setCategories] = useState(null);
    const [error, setError] = useState(null);
    const [fetching, setFetching] = useState(false);

    if(error !== null){
        toast.error(JSON.stringify(error));
        setError(null);
    }

    useEffect(() => {
        updatePublicCategory(null);
        updatePublicSubject(null);
        updatePublicTopic(null);
    }, [])

    useEffect(() => {
        fetchCategories(setCategories, setError, setFetching)
    }, [])

    return (
        <div className='w-full p-4'>
            <span className='text-2xl font-extralight'>
                Categories
            </span>
            <p className='text-green-400 my-2 font-extralight'>Select from the list of categories</p>
            <ToastContainer />
            {
                categories === null ? <PublicLoader />
                    :
                    <CategoryFilter categories={categories} />
            }
        </div>
    )
}

export default PublicCategory
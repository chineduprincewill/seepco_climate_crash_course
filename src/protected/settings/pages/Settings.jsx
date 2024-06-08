import React, { useContext, useEffect, useState } from 'react'
import { FiSettings } from 'react-icons/fi'
import { formatPagetitle, tokenExpired } from '../../../apis/functions'
import { AuthContext } from '../../../context/AuthContext'
import { ToastContainer, toast } from 'react-toastify'
import PageLoader from '../../../common/PageLoader'
import ReoderCategoryComponent from '../components/ReoderCategoryComponent'
import { fetchCategories } from '../../../apis/publicActions'

const Settings = () => {

    const { token, logout } = useContext(AuthContext);

    const [categories, setCategories] = useState(null);
    const [error, setError] = useState(null);
    const [fetching, setFetching] = useState(false);

    if(tokenExpired(categories)){
        toast.error('Your session has expired! Please Login again');
        logout();
    }

    if(error !== null){
        toast.error(JSON.stringify(error));
        setError(null);
    }

    console.log(categories);

    useEffect(() => {
        fetchCategories(setCategories, setError, setFetching);
    }, [])

    return (
        <div className='w-full'>
            <div className='w-full flex justify-between items-center py-4'>
                <div className='flex items-center space-x-2'>
                    <FiSettings size={25} className='text-[#fe9e2d]' />
                    <span className='text-2xl text-orange-950 font-semibold capitalize'>
                        {formatPagetitle()}
                    </span>
                </div>
            </div>
            <ToastContainer />
            <div className='w-full bg-white rounded-xl p-4 mt-4'>
                <div className='w-full md:w-1/3 rounded-md bg-gray-50 p-2'>
                    <h1 className='my-2 text-lg pb-1 border-b border-gray-200'>Reorder Categories</h1>
                    <div className='w-full'>
                    {
                        (fetching || categories === null) ? <PageLoader /> : <ReoderCategoryComponent categdata={categories} />
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings
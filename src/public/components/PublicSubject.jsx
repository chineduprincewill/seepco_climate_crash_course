import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import FilterComponent from '../../common/FilterComponent';
import { fetchSubjects } from '../../apis/publicActions';
import { ToastContainer, toast } from 'react-toastify';
import PublicLoader from '../../common/PublicLoader';
import SubjectComponent from './public-subject/SubjectComponent';
import { MdArrowBack } from 'react-icons/md';
import SubjectFilter from './public-subject/SubjectFilter';

const PublicSubject = () => {

    const { updateProgress, publicCategoryObj, updatePublicSubject, updatePublicTopic } = useContext(AuthContext);

    const [subjects, setSubjects] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
    const [error, setError] = useState(null);
    const [fetching, setFetching] = useState(false);

    const data = {
        category_id: publicCategoryObj?.id
    }

    if(error !== null){
        toast.error(JSON.stringify(error));
        setError(null);
    }

    useEffect(() => {
        updatePublicSubject(null);
        updatePublicTopic(null);
    }, [])

    useEffect(() => {
        fetchSubjects(data, setSubjects, setError, setFetching);
    }, [])

    return (
        <div className='w-full p-4'>
            <div className='flex items-center space-x-3'>
                <MdArrowBack 
                    size={25} 
                    className='mt-1 cursor-pointer'
                    onClick={() => updateProgress('category')}
                />
                <span className='text-2xl font-extralight'>
                    {publicCategoryObj?.category} Subjects
                </span>
            </div>
            
            <p className='text-green-400 my-2 font-extralight'>Select from the list of subjects</p>
            <ToastContainer />
            {
                subjects === null ? <PublicLoader />
                    :
                    <SubjectFilter subjects={subjects} />
            }
        </div>
    )
}

export default PublicSubject
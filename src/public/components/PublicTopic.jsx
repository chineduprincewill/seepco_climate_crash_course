import React, { useContext, useEffect, useState } from 'react'
import FilterComponent from '../../common/FilterComponent'
import { AuthContext } from '../../context/AuthContext';
import { ToastContainer } from 'react-toastify';
import PublicLoader from '../../common/PublicLoader';
import TopicComponent from './public-topic/TopicComponent';
import { MdArrowBack } from 'react-icons/md';
import { fetchTopics } from '../../apis/publicActions';
import TopicFilter from './public-topic/TopicFilter';

const PublicTopic = () => {

    const { updateProgress, publicSubjectObj, updatePublicTopic } = useContext(AuthContext);

    const [topics, setTopics] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
    const [error, setError] = useState(null);
    const [fetching, setFetching] = useState(false);

    const data = {
        subject_id: publicSubjectObj?.id
    }

    useEffect(() => {
        updatePublicTopic(null);
    }, [])

    useEffect(() => {
        fetchTopics(data, setTopics, setError, setFetching)
    }, [])

    return (
        <div className='w-full p-4'>
            <div className='flex items-center space-x-3'>
                <MdArrowBack 
                    size={25} 
                    className='mt-1 cursor-pointer'
                    onClick={() => updateProgress('subject')}
                />
                <span className='text-2xl font-extralight'>
                    {publicSubjectObj?.subject} Topics
                </span>
            </div>
            <p className='text-green-400 my-2 font-extralight'>Select from the list of topics</p>
            <ToastContainer />
            {
                topics === null ? <PublicLoader />
                    :
                    <TopicFilter topics={topics} />
            }
        </div>
    )
}

export default PublicTopic
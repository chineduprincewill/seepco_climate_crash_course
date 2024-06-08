import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { MdArrowBack } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import PublicLoader from '../../common/PublicLoader';
import { fetchTutorials } from '../../apis/publicActions';
import TutorialFilter from './public-tutorial/TutorialFilter';

const PublicTutorial = () => {

    const { updateProgress, publicTopicObj, updatePublicTopic } = useContext(AuthContext);

    const [tutorials, setTutorials] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
    const [error, setError] = useState(null);
    const [fetching, setFetching] = useState(false);

    const data = {
        topic_id: publicTopicObj?.id
    }

    if(error !== null){
        toast.error(JSON.stringify(error));
        setError(null);
    }

    useEffect(() => {
        fetchTutorials(data, setTutorials, setError, setFetching)
    }, [])

    return (
        <div className='w-full p-4'>
            <div className='grid md:flex md:items-center md:space-x-3'>
                <MdArrowBack 
                    size={25} 
                    className='mt-1 cursor-pointer'
                    onClick={() => updateProgress('topic')}
                />
                <span className='text-2xl font-extralight'>
                    <span>{publicTopicObj?.topic}</span>
                </span>
            </div>
            <p className='text-green-400 my-2 font-extralight'>Click on the list of Tutorials</p>
            <ToastContainer />
            {
                tutorials === null ? <PublicLoader />
                    :
                    <TutorialFilter tutorials={tutorials} />
            }
        </div>
    )
}

export default PublicTutorial
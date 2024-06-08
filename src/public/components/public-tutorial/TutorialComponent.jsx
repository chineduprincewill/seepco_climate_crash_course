import React, { useEffect, useState } from 'react'
import { HiMinus, HiPlus } from 'react-icons/hi';
import { fetchPublicTutorialResources } from '../../../apis/resourcesActions';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const TutorialComponent = ({ tutorial }) => {

    const [openAnswer, setOpenAnswer] = useState(false);
    const [resources, setResources] = useState(null);
    const [error, setError] = useState(null);
    const [fetching, setFetching] = useState(null);

    const data = {
        tutorial_id : tutorial?.id
    }

    const toggleOpenAnswer = () => {
        setOpenAnswer(!openAnswer);
    }

    if(error !== null){
        toast.error(JSON.stringify(error));
        setError(null);
    }

    useEffect(() => {
        fetchPublicTutorialResources(data, setResources, setError, setFetching)
    }, [])

    return (
        <div className='w-full'>
            <div 
                className='w-full flex justify-between items-center p-3 rounded-t-lg border border-gray-700 bg-gradient-to-b from-[#202a3b] to-gray-700'
                onClick={() => toggleOpenAnswer()}
            >
                <span>{tutorial?.question}</span>
            {
                openAnswer ? 
                    <HiMinus size={17} className='cursor-pointer' /> : <HiPlus size={17} className='cursor-pointer' />
            }
            </div>
            <ToastContainer />
            <div
                className={`${openAnswer ? 'block' : 'hidden'} w-full p-3 rounded-b-lg border border-gray-700 text-[#ff9e29]`}
            >
                {tutorial?.answer}
                {
                    fetching ? 
                        <div className='text-green-400 mt-4'><i>loading resources...</i></div>
                        :
                        <div>
                        {
                            (resources !== null && resources.length > 0) && 
                                <h1 className='mt-4 text-lg text-gray-400 italic'>Additional resources</h1>
                        }
                            
                        {
                            (resources !== null && resources.length > 0) && resources.map(res => {
                                return <div><Link key={res?.id} to={res?.link} target='_blank' className='text-blue-400 text-sm'>{res?.label}</Link></div>
                            })
                        }
                        </div>
                }
            </div>
        </div>
    )
}

export default TutorialComponent
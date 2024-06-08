import React, { useContext, useState } from 'react'
import ButtonLoader from '../../../common/ButtonLoader'
import { AuthContext } from '../../../context/AuthContext';

const TopicComponent = ({ topic }) => {

    const { updateProgress, updatePublicTopic } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const proceedToNextStep = () => {
        setLoading(true)
        updatePublicTopic(topic);
        setTimeout(() => updateProgress('tutorial'), 1000);
    }

    return (
        <div 
            className='w-full md:w-[90%] flex justify-between items-center h-24 border hover:border-4 border-gray-700 rounded-md p-4 shadow-2xl my-4 cursor-pointer'
            onClick={() => proceedToNextStep()}
        >
                <span>{topic?.topic}</span>
            {
                loading && <ButtonLoader />
            }
        </div>
    )
}

export default TopicComponent
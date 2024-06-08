import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { HiOutlineHome } from 'react-icons/hi';
import { PiArrowElbowDownRight } from 'react-icons/pi'

const PublicNavlinks = () => {

    const { updateProgress, publicCategoryObj, updatePublicCategory, publicSubjectObj, updatePublicSubject, publicTopicObj } = useContext(AuthContext);

    const navigateToCategorySubjects = () => {
        updatePublicCategory(publicCategoryObj);
        updateProgress('subject');
    }

    const navigateToSubjecTopics = () => {
        updatePublicSubject(publicSubjectObj);
        updateProgress('topic')
    }

    return (
        <ul className='w-full py-4 text-white'>
            <li 
                className='pb-2 flex items-center space-x-1 cursor-pointer hover:text-[#ff9e2e] border-b border-gray-700' 
                onClick={() => window.location.reload()}
            >
                <HiOutlineHome size={16} />
                <span>Home</span>
            </li>
        {
            publicCategoryObj !== null && 
                <li className='py-2'><span className='cursor-pointer hover:text-[#ff9e29]' onClick={() => navigateToCategorySubjects()}>{ publicCategoryObj?.category }</span>
                    <ul>
                    {
                        publicSubjectObj !== null &&
                            <li className='py-2'>
                                <div className='flex items-center space-x-1 cursor-pointer hover:text-[#ff9e29]' onClick={() => navigateToSubjecTopics()}>
                                    <PiArrowElbowDownRight size={17} className='text-gray-400' />
                                    <span>{ publicSubjectObj?.subject }</span>
                                </div>
                                <ul>
                                {
                                    publicTopicObj !== null && 
                                        <li className='py-2 pl-4'>
                                            <div className='flex space-x-1 cursor-pointer hover:text-[#ff9e29]'>
                                                <PiArrowElbowDownRight size={21} className='text-gray-400' />
                                                <span>{ publicTopicObj?.topic }</span>
                                            </div>
                                        </li>
                                }
                                </ul>
                            </li>
                    }
                    </ul>
                </li>
        }
        </ul>
    )
}

export default PublicNavlinks
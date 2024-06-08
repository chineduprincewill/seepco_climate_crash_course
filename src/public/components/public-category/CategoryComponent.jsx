import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import ButtonLoader from '../../../common/ButtonLoader';

const CategoryComponent = ({ category }) => {

    const { updateProgress, updatePublicCategory } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const proceedToNextStep = () => {
        setLoading(true)
        updatePublicCategory(category);
        setTimeout(() => updateProgress('subject'), 1000);
    }

    return (
        <div 
            className='w-full md:w-[90%] flex justify-between items-center h-24 border hover:border-4 border-gray-700 rounded-md p-4 shadow-2xl my-4 cursor-pointer'
            onClick={() => proceedToNextStep()}
        >
            <span>{category?.category}</span>
        {
            loading && <ButtonLoader />
        }
        </div>
    )
}

export default CategoryComponent
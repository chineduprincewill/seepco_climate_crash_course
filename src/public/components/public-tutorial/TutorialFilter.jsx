import React, { useState } from 'react'
import FilterComponent from '../../../common/FilterComponent';
import TutorialComponent from './TutorialComponent';

const TutorialFilter = ({ tutorials }) => {

    const [filteredData, setFilteredData] = useState(null);

    return (
        <div className='w-full'>
            <div className='w-full flex justify-end mt-4'>
                <FilterComponent data={tutorials} setFilteredData={setFilteredData} />
            </div>
            <div className='w-full mt-4 space-y-6'>
            {
                filteredData !== null && filteredData.length > 0 ? 
                    filteredData.map(tut => {
                        return <TutorialComponent key={tut?.id} tutorial={tut} />
                    })    
                    : <span className='text-red-500'>Sorry! No record was found</span>
            }
            </div>
        </div>
    )
}

export default TutorialFilter
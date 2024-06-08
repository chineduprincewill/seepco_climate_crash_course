import React, { useState } from 'react'
import FilterComponent from '../../../common/FilterComponent'
import TopicComponent from './TopicComponent';

const TopicFilter = ({ topics }) => {

    const [filteredData, setFilteredData] = useState(null);

    return (
        <div className='w-full'>
            <div className='w-full flex justify-end mt-4'>
                <FilterComponent data={topics} setFilteredData={setFilteredData} />
            </div>
            <div className='w-full grid md:grid-cols-2 lg:grid-cols-3 mt-4'>
            {
                filteredData !== null && filteredData.length > 0 ? 
                    filteredData.map(top => {
                        return <TopicComponent key={top?.id} topic={top} />
                    })    
                    : <span className='text-red-500'>Sorry! No record was found</span>
            }
            </div>
        </div>
    )
}

export default TopicFilter
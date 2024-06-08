import React, { useState } from 'react'
import FilterComponent from '../../../common/FilterComponent'
import SubjectComponent from './SubjectComponent'

const SubjectFilter = ({ subjects }) => {

    const [filteredData, setFilteredData] = useState(null);

    return (
        <div className='w-full'>
            <div className='w-full flex justify-end mt-4'>
                <FilterComponent data={subjects} setFilteredData={setFilteredData} />
            </div>
            <div className='w-full grid md:grid-cols-2 lg:grid-cols-3 mt-4'>
            {
                (filteredData !== null && filteredData.length > 0) ? 
                    filteredData.map(sub => {
                        return <SubjectComponent key={sub?.id} subject={sub} />
                    })    
                    : <span className='text-red-500'>Sorry! No record was found</span>
            }
            </div>
        </div>
    )
}

export default SubjectFilter
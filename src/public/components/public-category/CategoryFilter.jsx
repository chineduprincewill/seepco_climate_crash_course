import React, { useState } from 'react'
import FilterComponent from '../../../common/FilterComponent'
import CategoryComponent from './CategoryComponent'

const CategoryFilter = ({ categories }) => {

    const [filteredData, setFilteredData] = useState(null);

    return (
        <div className='w-full'>
            <div className='w-full flex justify-end mt-4'>
                <FilterComponent data={categories} setFilteredData={setFilteredData} />
            </div>
            <div className='w-full grid md:grid-cols-2 lg:grid-cols-3 mt-4'>
            {
                filteredData !== null && filteredData.length > 0 ? 
                    filteredData.map(cat => {
                        return <CategoryComponent key={cat?.id} category={cat} />
                    })
                    : <span className='text-red-500'>Sorry! No record was found</span>
            }
            </div>
        </div>
    )
}

export default CategoryFilter
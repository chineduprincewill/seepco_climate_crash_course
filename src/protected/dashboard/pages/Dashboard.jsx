import React from 'react'
import { MdOutlineDashboard } from 'react-icons/md'
import { formatPagetitle } from '../../../apis/functions'

const Dashboard = () => {
    return (
        <div className='w-full'>
            <div className='w-full flex justify-between items-center py-4'>
                <div className='flex items-center space-x-2'>
                    <MdOutlineDashboard size={25} className='text-[#fe9e2d]' />
                    <span className='text-2xl text-orange-950 font-semibold capitalize'>
                        {formatPagetitle()}
                    </span>
                </div>
            </div>
            <div className='w-full bg-white rounded-xl p-4 mt-4 h-24'></div>
        </div>
    )
}

export default Dashboard
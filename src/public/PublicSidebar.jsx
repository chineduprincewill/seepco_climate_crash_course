import React, { Fragment, useContext } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { AuthContext } from '../context/AuthContext'
import { FiAlertCircle } from 'react-icons/fi'
import PublicNavlinks from './PublicNavlinks'

const PublicSidebar = ({ toggleSidebar, navOpen }) => {

    const { publicCategoryObj } = useContext(AuthContext);

    return (
        <Fragment>
            <div 
                className={navOpen ? 'fixed inset-0 z-50 mt-0 bg-black bg-opacity-50 transition-opacity md:hidden' : ''}
                onClick={toggleSidebar}
            ></div>
            <div className={`absolute left-0 top-0 z-50 ${navOpen ? 'block w-[250px]' : 'hidden'} md:block md:w-[250px] h-screen bg-[#202a3b] overflow-y-hidden duration-300 ease-linear shadow-2xl`}>
                <div className='flex justify-between items-center mt-3 px-4'>
                    <div className='text-white md:ml-4'>Climate Crash Course</div>
                    <AiOutlineClose size={17} className='text-red-500 cursor-pointer md:hidden ' onClick={toggleSidebar} />
                </div>
                <div className='w-full mt-8 p-4'>
                    <div className='shadow-2xl border border-gray-700 rounded-md p-2 text-gray-300 text-sm font-extralight'>
                        Your selections appear below. You can navigate through your selections from here
                    </div>
                </div>

                <div className='w-full p-4'>
                {
                    publicCategoryObj === null ? 
                        <div className='flex items-center space-x-2 text-[#ff9e29] font-extralight'>
                            <FiAlertCircle size={25} />
                            <span className='text-sm'>You currently have not made any selection</span>
                        </div>
                        :
                        <PublicNavlinks />
                }
                </div>
            </div>
        </Fragment>
    )
}

export default PublicSidebar
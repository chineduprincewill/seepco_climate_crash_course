import React, { Fragment, useContext } from 'react'
import Logo from '/assets/logo.jpg'
import { AiOutlineClose } from 'react-icons/ai'
import Navlinks from './Navlinks'
import { FaUserCircle } from 'react-icons/fa'
import { AuthContext } from '../context/AuthContext'

const Sidebar = ({ toggleSidebar, navOpen }) => {

    const { user } = useContext(AuthContext);

    return (
        <Fragment>
            <div 
                className={navOpen ? 'fixed inset-0 z-50 mt-0 bg-black bg-opacity-50 transition-opacity md:hidden' : ''}
                onClick={toggleSidebar}
            ></div>
            <div className={`absolute left-0 top-0 z-50 ${navOpen ? 'block w-[230px]' : 'hidden'} md:block md:w-[230px] h-screen bg-white overflow-y-hidden duration-300 ease-linear`}>
                <div className='flex justify-end mt-4 md:hidden px-6'>
                    <AiOutlineClose size={25} className='text-orange-950 cursor-pointer' onClick={toggleSidebar} />
                </div>
                {/**<div className='w-full flex justify-center px-6 mt-1 mb-8'>
                    <div>
                        <img src={Logo} alt='logo' width='100px' />
                    </div>
                </div>*/}

                <div className='w-full px-6 py-6 mb-8 md:mt-8 border-b border-orange-200'>
                    <div className='w-full flex justify-center'>
                        <FaUserCircle size={35} className='cursor-pointer text-orange-950' />
                    </div>
                    <div className='w-full flex justify-center'>
                        <span className='text-green-600 text-xs'>{user && user?.email}</span>
                    </div>
                </div>
                <div className='w-full flex justify-start px-3'>
                    <Navlinks />
                </div>
            </div>
        </Fragment>
    )
}

export default Sidebar

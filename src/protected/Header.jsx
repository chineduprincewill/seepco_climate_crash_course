import React, { useContext, useEffect } from 'react'
import { RxHamburgerMenu } from 'react-icons/rx'
import { MdOutlineLogout } from 'react-icons/md'
import { FaUserCircle } from 'react-icons/fa'
import { useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Header = ({ toggleSidebar }) => {

    const { user, logout } = useContext(AuthContext);
    const locatn = useLocation();
    //const pageTitle = locatn.pathname.replace('/', '').replace('-', ' ');

    useEffect(() => {
        localStorage.getItem('isLoggedIn') && JSON.parse(localStorage.getItem('isLoggedIn'));
    }, [])

    return (
        <header className='sticky w-full top-0 z-40 bg-white'>
            <div className='flex flex-grow items-center justify-between p-2 md:px-3 2xl:px-11'>
                <div className='flex items-center space-x-3'>   
                    <RxHamburgerMenu size={25} className='text-orange-950 cursor-pointer' onClick={toggleSidebar} />
                    <div className='text-xl font-bold hidden md:block md:pl-[180px] capitalize'>{}</div>
                </div>
                <div className='flex  items-center space-x-4 md:space-x-8'>
                    <div className='flex items-center space-x-2'>
                        <div className='grid text-end text-gray-600'>
                            <span>
                                {user !== null ? 'Welcome '+user?.username+'!': (
                                    localStorage.getItem('isLoggedIn') && 'Welcome '+JSON.parse(localStorage.getItem('isLoggedIn'))?.username+'!'
                                )}
                            </span>
                        </div>
                    </div>
                    <button 
                        className='flex justify-between items-center space-x-2 pt-1.5 pb-2 px-4 rounded-full border border-red-500 text-red-500'
                        onClick={() => logout()}
                    >
                        <MdOutlineLogout size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header
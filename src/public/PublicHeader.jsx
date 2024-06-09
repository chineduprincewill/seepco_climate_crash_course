import React from 'react'
import { RxHamburgerMenu } from 'react-icons/rx'
import { Link, useLocation } from 'react-router-dom'

const PublicHeader = ({ toggleSidebar }) => {

    const loc = useLocation();

    return (
        <div className='w-full flex justify-between items-center fixed top-0 inset-0 z-10 py-4 px-6 text-white h-12 bg-[#202a3b] shadow-xl'>
            <div className='flex space-x-4 items-center'>
                <RxHamburgerMenu size={20} className='text-white cursor-pointer md:hidden' onClick={toggleSidebar} />
                <div>Climate Crash Course</div>
            </div>
            
            <div className='flex items-center space-x-3 text-sm'>
                <a href='https://www.stoilmgt.com/' className='hover:text-[#ff9e29]' target="_blank" rel="noopener noreferrer">
                    <span className='hidden md:block'>SEEPCO</span>
                    <img src='/assets/logo-only.png' alt='header-logo' width='30px' className='block md:hidden' />
                </a>
                {
                    loc.pathname !== '/' && <Link to='/' className='hover:text-[#ff9e29]'>Home</Link>
                }
                <Link to='/login' className='hover:text-[#ff9e29]'>Login</Link>
            </div> 
        </div>
    )
}

export default PublicHeader
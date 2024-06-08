import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const DefaultLayout = () => {
    const [navOpen, setNavOpen] = useState(false);

    const toggleSidebar = () => {
        setNavOpen(!navOpen);
    }

    return (
        <div>
            <div className='flex h-screen overflow-hidden bg-white'>
                <Sidebar toggleSidebar={toggleSidebar} navOpen={navOpen} />
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-gray-100">
                    <Header toggleSidebar={toggleSidebar} />
                    <main>
                        <div className="ml-0 md:ml-[230px] max-w-screen-2xl p-4 2xl:px-10">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default DefaultLayout
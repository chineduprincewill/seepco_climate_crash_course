import React, { useContext } from 'react'
import { HiOutlineAcademicCap  } from 'react-icons/hi';
import { MdOutlineDashboard, MdOutlineLogout } from 'react-icons/md';
import { FiSettings } from 'react-icons/fi'
import { Link, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';

const Navlinks = () => {

    const { logout } = useContext(AuthContext);

    const locatn = useLocation();

    const navlinks = [
        {
            id: 1,
            title: "Dashboard",
            url: "/dashboard",
            icon: <MdOutlineDashboard size={17} />
        },
        {
            id: 2,
            title: "Manage Tutorials",
            url: "/manage-tutorials",
            icon: <HiOutlineAcademicCap size={17} />
        },
        {
            id: 3,
            title: "Settings",
            url: "/settings",
            icon: <FiSettings size={17} />
        }
    ]

    return (
        <ul className='w-full space-y-2'>
            {
                navlinks !== null && navlinks.map(nav => {
                    return (
                        <li key={nav.id} className={`${locatn.pathname === nav.url || locatn.pathname.includes(nav.url.replace("/",'')) ? 'bg-orange-950 text-gray-100 font-semibold' : 'text-orange-950'} px-3 py-2 rounded-md `}>
                            <Link to={nav.url} key={nav.id} className='flex justify-start items-center space-x-3 my-1'>
                                {nav.icon}
                                <span>{nav.title}</span>
                            </Link>
                        </li>
                    )
                })
            }
            <li className='text-orange-950 px-3 py-2'>
                <div className='flex justify-start items-center space-x-3 my-1 cursor-pointer'
                    onClick={() => logout()}
                >
                    <MdOutlineLogout size={17} />
                    <span>Logout</span>
                </div>
            </li>
        </ul>
    )
}

export default Navlinks

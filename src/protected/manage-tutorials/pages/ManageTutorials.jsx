import React, { useContext, useEffect, useState } from 'react'
import { formatPagetitle } from '../../../apis/functions'
import { HiOutlineAcademicCap } from 'react-icons/hi'
import { AuthContext } from '../../../context/AuthContext'
import Categories from '../components/categories/Categories'
import Subjects from '../components/subjects/Subjects'
import Topics from '../components/topics/Topics'
import Tutorials from '../components/tutorials/Tutorials'
import { GoAlert } from 'react-icons/go'

const ManageTutorials = () => {

    const { currentstep, resourceid, resourcename } = useContext(AuthContext);

    const [title, setTitle] = useState('');

    let step;

    if(currentstep === 'categories'){
        step = <Categories />
    }
    else if(currentstep === 'subjects'){
        step = <Subjects resourceid={resourceid} resourcename={resourcename} />
    }
    else if(currentstep === 'topics'){
        step = <Topics resourceid={resourceid} resourcename={resourcename} />
    }
    else if(currentstep === 'tutorials'){
        step = <Tutorials resourceid={resourceid} resourcename={resourcename} />
    }
    else{
        step = <Categories />
    }


    return (
        <div className='w-full'>
            <div className='w-full flex justify-between items-center py-4'>
                <div className='flex items-center space-x-2'>
                    <HiOutlineAcademicCap size={25} className='text-[#fe9e2d]' />
                    <span className='text-2xl text-orange-950 font-semibold capitalize'>
                        {formatPagetitle()}
                    </span>
                </div>
            </div>
            <div className='w-full md:flex md:items-center md:space-x-2 bg-gray-200 border border-blue-600 rounded-md text-blue-700 p-3'>
                <GoAlert size={15} className="text-blue-600" />
                <span className='text-sm'>Hover on the icons at the right of table rows to see the detail or action to be executed by each icon on click.</span>
            </div>
            <div className='w-full bg-white rounded-xl p-4 mt-4'>
                {step}
            </div>
        </div>
    )
}

export default ManageTutorials
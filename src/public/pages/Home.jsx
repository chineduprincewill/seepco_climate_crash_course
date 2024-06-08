import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate();

  return (
    <div className='w-full m-0'>
        <div className="w-full h-screen bg-[url('/assets/landing.jpg')] bg-cover">
          <div className="w-full h-full flex justify-center items-center bg-black bg-opacity-70">
            <div className='w-5/6 md:w-2/3 md:py-8'>
              <img src='/assets/logo-only.png' alt='home-logo' width='70px' />
              <span className="text-white text-5xl md:text-6xl lg:text-8xl text-center">Smart Climate Education</span>
              <div className='w-full text-white md:text-lg my-4'>
                <p>The aim of Climate Smart Education for Primary and Secondary Schools is to empower students with the knowledge, skills, and attitudes necessary to understand, address, and adapt to climate change, fostering environmental literacy, critical thinking, stewardship, resilience, and global citizenship.</p> 
                <p className='mt-3'>
                This interdisciplinary approach integrates the knowledge of climate change across various subjects enabling them to apply this knowledge to real-world challenges, advocate for climate action, and contribute to a more sustainable and resilient future for themselves and their communities.
                </p>
              </div>
              <div className='my-6'>
                <Link 
                  to='/tutorials'
                  className='w-[170px] md:w-[190px] flex justify-center z-20 hover:bg-orange-500 bg-[#ff9e29] shadow-xl rounded-md p-2 md:p-3 cursor-pointer'
                >
                  Continue learning
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full flex justify-end fixed top-0 inset-0 z-10 py-4 px-6 text-white space-x-6 text-sm h-12'>
          <Link to='https://ecogreenafrica.org' className='hover:text-[#ff9e29]'>Ecogreen Africa</Link>
          <Link to='/login' className='hover:text-[#ff9e29]'>Login</Link>
        </div>
    </div>
  )
}

export default Home
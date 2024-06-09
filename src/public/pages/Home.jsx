import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate();

  return (
    <div className='w-full m-0'>
        <div className="w-full h-screen bg-[url('/assets/landing.jpg')] bg-cover">
          <div className="w-full h-full flex justify-center items-center bg-black bg-opacity-80">
            <div className='w-5/6 md:w-2/3 md:py-8'>
              <img src='/assets/logo-only.png' alt='home-logo' width='100px' />
              <span className="text-white text-2xl md:text-3xl lg:text-6xl text-center">SEEPCO Professional Development Program in Climate and Environmental Sustainability</span>
              <div className='w-full text-white md:text-lg my-6'>
                <p className='mt-3'></p>
              </div>
              <div className='my-6'>
                <Link 
                  to='/tutorials'
                  className='w-[170px] md:w-[190px] flex justify-center z-20 bg-[#283890] hover:bg-[#252e61] text-white shadow-xl rounded-md p-2 md:p-3 cursor-pointer'
                >
                  Continue learning
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full flex justify-end fixed top-0 inset-0 z-10 py-4 px-6 text-white space-x-6 text-sm h-12'>
          <Link to='https://www.stoilmgt.com/' className='hover:text-[#ff9e29]'>SEEPCO</Link>
          <Link to='/login' className='hover:text-[#ff9e29]'>Login</Link>
        </div>
    </div>
  )
}

export default Home
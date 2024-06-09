import React, { useState } from 'react'
import { CiUnlock } from 'react-icons/ci'
import { ToastContainer, toast } from 'react-toastify';
import { login } from '../../apis/authActions';
import { Link, useNavigate } from 'react-router-dom';
import ButtonLoader from '../../common/ButtonLoader';
import { GoHome } from 'react-icons/go';

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [loggingin, setLoggingin] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();

        const data = {
            email, password
        }

        login(data, setSuccess, setError, setLoggingin);
    }

    if(error !== null){
        toast.error(error?.error);
        setError(null);
    }

    if (success !== null) {
        localStorage.setItem('isLoggedIn', JSON.stringify(success));
        navigate('/dashboard');
        location.reload();
    }

    return (
        <div className='w-full m-0 flex bg-white'>
            <div className='w-full md:w-1/2 h-screen hidden md:flex justify-center items-center bg-[url("/assets/banner3.jpg")] bg-cover'>
            </div>
            <div className='w-full md:w-1/2 h-screen flex  justify-center items-center p-4 md:p-0'>
                <div className='w-full md:w-3/4'>
                    <div className='w-full flex justify-center'>
                        <img src='/assets/logo.png' alt='logo' width="100px" />
                    </div>
                    <div className='w-full flex justify-center my-4'>  
                        <span className='text-xl md:text-3xl text-orange-950'>Climate Crash Course</span>
                    </div>
                    <div className='w-full p-4'>
                        <ToastContainer />
                        <form onSubmit={handleLogin} className='w-full space-y-6'>
                            <div className='w-full space-y-2'>
                                <input 
                                    type='text' 
                                    className='w-full p-3 border border-gray-400 rounded-md' 
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder='Email'
                                />
                            </div>
                            <div className='w-full space-y-2'>
                                <input 
                                    type='password' 
                                    className='w-full p-3 border border-gray-400 rounded-md' 
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder='Password'
                                />
                            </div>
                            <div>
                                {
                                    loggingin ? 
                                        <button
                                            className='w-full flex justify-center px-4 py-3 rounded-md mt-3 bg-[#252e61] text-white'
                                            disabled
                                        >
                                            <ButtonLoader />
                                        </button>
                                        :
                                        <button className='w-full p-3 rounded-md bg-[#283890] hover:bg-[#252e61] text-white'>
                                            Login
                                        </button>
                                }
                            </div>
                        </form>
                        <div className='w-full flex justify-center items-center space-x-1 text-sm p-1 text-gray-600 my-1'>
                            <Link to='/'><GoHome size={13} /></Link>
                            <Link to='/'>Home</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
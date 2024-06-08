import React, { useContext, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify'
import ButtonLoader from '../../../../common/ButtonLoader'
import { AuthContext } from '../../../../context/AuthContext'
import { createCategory } from '../../../../apis/categoriesActions'

const AddModal = ({ setShowaddform }) => {

    const { token, refreshRecord } = useContext(AuthContext);

    const [category, setCategory] = useState();
    const [creating, setCreating] = useState(false);
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            category
        }

        createCategory(token, data, setSuccess, setError, setCreating);
    }

    if(error !== null){
        toast.error(JSON.stringify(error));
        setError(null);
    }

    if(success !== null){
        toast.success(success?.success);
        refreshRecord(Date.now());
        setSuccess(null);
        setTimeout(() => setShowaddform(false), 2000);
        //setShowaddform(false);
    }

    return (
        <div>
            <div className='fixed inset-0 z-50 bg-black bg-opacity-75 transition-opacity'></div>
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex mt-16 md:mt-0 md:min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
                    <div className='w-full md:w-[550px] bg-white border border-gray-400 dark:text-gray-700 rounded-md px-6 py-1'>
                        <div className='flex justify-between items-center border-b border-gray-200 py-2 text-red-500'>
                            <span className='text-lg text-gray-700 uppercase font-bold'>
                                New Category
                            </span>
                            <span
                                className='cursor-pointer'
                                onClick={() => setShowaddform(false)}
                            >    
                                <AiOutlineCloseCircle size={20} />
                            </span>
                        </div>

                        <div className='py-4'>
                            <ToastContainer />
                            <form onSubmit={handleSubmit} className='space-y-4 text-gray-700'>
                                
                                <div className='w-full grid space-y-2'>
                                    <label>Category</label>
                                    <input 
                                        type='text'
                                        className='w-full border border-gray-400 rounded-md p-2 bg-transparent'
                                        onChange={(e) => setCategory(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className='w-full flex justify-between md:justify-end items-center md:space-x-3 pt-2'>
                                    <button 
                                        className='w-[150px] p-2.5 hover:bg-gray-100 border border-[#232a2f] text-[#232a2f] rounded-md'
                                        onClick={() => setShowaddform(false)}
                                    >
                                        Cancel
                                    </button>
                                    {
                                        creating ? 
                                        <button className='w-[150px] flex justify-center p-3 bg-orange-950 hover:bg-orange-900 text-white rounded-md'>
                                            <ButtonLoader />
                                        </button>
                                        :
                                        <button className='w-[150px] p-3 bg-orange-950 hover:bg-orange-900 text-white rounded-md'>
                                            Create
                                        </button>
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        
        </div>
    )
}

export default AddModal
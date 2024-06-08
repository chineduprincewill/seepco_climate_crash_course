import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify'
import ButtonLoader from '../../../../common/ButtonLoader'
import { AuthContext } from '../../../../context/AuthContext'
import { createTutorialResources, fetchTutorialResources, resourceActivationAction } from '../../../../apis/resourcesActions'
import RecordsTable from '../../../../common/RecordsTable'
import PageLoader from '../../../../common/PageLoader'
import { MdOutlineCancel } from 'react-icons/md';
import { FaRegCircleCheck } from 'react-icons/fa6';

const ResourceModal = ({ setShowaddresource, objtoupdate }) => {

    const { token, record, refreshRecord } = useContext(AuthContext);
    
    const [type, setType] = useState();
    const [label, setLabel] = useState();
    const [link, setLink] = useState();
    const [adding, setAdding] = useState(false);
    const [resources, setResources] = useState(null);
    const [error, setError] = useState(null);
    const [fetching, setFetching] = useState(false);
    const [success, setSuccess] = useState(null);
    const [activating, setActivating] = useState(false);

    const columns = [
        {
          name: "Type",
          selector: (row) => row?.type,
          filterable: true,
          sortable: true,
          cell: (row) => (
            <div className="py-2">{row?.type}</div>
          )
        },
        {
          name: "Label",
          selector: (row) => row?.label,
          filterable: true,
          sortable: true,
          cell: (row) => (
            <div className="py-2">{row?.label}</div>
          )
        },
        {
          name: "Link",
          selector: (row) => row?.link,
          sortable: true,
          cell: (row) => (
            <div className="py-2">{row?.link}</div>
          )
        },
        {
          name: "Status",
          selector: (row) => row?.status,
          sortable: true,
          cell: (row) => (
            <div className="hover:break-normal">{row?.status === '1' ? <span className='text-green-600'>active</span> : <span className='text-red-600'>disabled</span>}</div>
          )
        },
        {
          name: "",
          button: true,
          cell: (row) => (
            <div className='flex space-x-1 items-center'>
            {
                row?.status === '1' ?
                    <button
                        className={`p-1 border-none`}
                        onClick={() => resourceActivation(row?.id)}
                    >
                        <MdOutlineCancel size={17} className='text-red-600' title='deactivate' />
                    </button>
                    :
                    <button
                        className={`p-1 border-none`}
                        onClick={() => resourceActivation(row?.id)}
                    >
                        <FaRegCircleCheck  size={16} className='text-green-600' title='activate' />
                    </button>
            }
                
            </div>
          ),
        },
    ];

    const data = {
        tutorial_id : objtoupdate?.id
    }

    const resourceActivation = (rowid) => {
        const data = {
            id:rowid
        }

        if(window.confirm('Are you sure you want to proceed with this action?')){
            resourceActivationAction(token, data, setSuccess, setError, setActivating);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            tutorial_id : objtoupdate?.id,
            type,
            label,
            link
        }

        createTutorialResources(token, data, setSuccess, setError, setAdding);
    }

    if(error !== null){
        toast.error(JSON.stringify(error));
        setError(null);
    }

    if(success !== null){
        //toast.success(success?.success);
        alert(success?.success);
        setSuccess(null)
        refreshRecord(Date.now());
    }


    useEffect(() => {
        fetchTutorialResources(token, data, setResources, setError, setFetching)
    }, [record])

    return (
        <div>
            <div className='fixed inset-0 z-50 bg-black bg-opacity-75 transition-opacity'></div>
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex mt-16 md:mt-0 md:min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
                    <div className='w-full md:w-[850px] bg-white border border-gray-400 dark:text-gray-700 rounded-md px-6 py-1'>
                        <div className='flex justify-between items-center border-b border-gray-200 py-2 text-red-500'>
                            <span className='text-lg text-gray-700 uppercase font-bold'>
                                {objtoupdate?.question} Resources
                            </span>
                            <span
                                className='cursor-pointer'
                                onClick={() => setShowaddresource(false)}
                            >    
                                <AiOutlineCloseCircle size={20} />
                            </span>
                        </div>

                        <div className='py-4'>
                            <ToastContainer />
                            <form onSubmit={handleSubmit} className='space-y-4 text-gray-700'>
                                <div className='flex justify-between items-center'>
                                    <input 
                                        type='text'
                                        className='w-full border border-gray-400 rounded-md p-2 mx-2 bg-transparent'
                                        onChange={(e) => setLabel(e.target.value)}
                                        placeholder='Enter link label or title'
                                        required
                                    />
                                    <select
                                        className='w-full md:w-[210px] border border-gray-400 rounded-md p-2 mx-2 bg-transparent'
                                        onChange={(e) => setType(e.target.value)}
                                        required
                                    >
                                        <option value=''>resource type</option>
                                        <option value='Website link'>Website link</option>
                                        <option value='Video link'>Video link</option>
                                        <option value='Image link'>Image link</option>
                                        <option value='Audio link'>Audio link</option>
                                    </select>
                                </div>
                                
                                <div className='flex justify-between items-center'>
                                    <input 
                                        type='text'
                                        className='w-full border border-gray-400 rounded-md p-2 ml-2 mr-4 bg-transparent'
                                        onChange={(e) => setLink(e.target.value)}
                                        placeholder='Paste link'
                                        required
                                    />
                                    {
                                        adding ? 
                                        <button className='w-[220px] flex justify-center p-2 bg-orange-950 hover:bg-orange-900 text-white rounded-md'>
                                            <ButtonLoader />
                                        </button>
                                        :
                                        <button className='w-[220px] p-2 bg-orange-950 hover:bg-orange-900 text-white rounded-md'>
                                            Add
                                        </button>
                                    }
                                </div>
                            </form>

                            <div className='my-4 overflow-x-hidden overflow-scroll h-96'>
                            {
                                fetching ? <PageLoader /> : <RecordsTable columns={columns} data={resources} />
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        </div>
    )
}

export default ResourceModal
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../../context/AuthContext'
import { categoryActivationAction, fetchAuthCategories } from '../../../../apis/categoriesActions';
import { AiOutlineEdit } from 'react-icons/ai';
import { FaRegCircleCheck  } from 'react-icons/fa6';
import PageLoader from '../../../../common/PageLoader';
import RecordsTable from '../../../../common/RecordsTable';
import { tokenExpired } from '../../../../apis/functions';
import AddModal from './AddModal';
import { MdOutlineCancel } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import EditModal from './EditModal';
import { HiPlus } from 'react-icons/hi';

const Categories = () => {

    const { token, logout, record, refreshRecord, updateCurrentstep } = useContext(AuthContext);

    const [categories, setCategories] = useState(null);
    const [error, setError] = useState(null);
    const [fetching, setFetching] = useState(false);
    const [showaddform, setShowaddform] = useState(false);
    const [showeditform, setShoweditform] = useState(false);
    const [success, setSuccess] = useState(null);
    const [activating, setActivating] = useState(false);
    const [objtoedit, setObjtoedit] = useState(null);

    const columns = [
        {
          name: "Category",
          selector: (row) => row?.category,
          filterable: true,
          sortable: true,
          cell: (row) => (
            <div className="hover:break-normal">{row?.category}</div>
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
                <button 
                    className="p-1 border-none font-medium"
                    onClick={() => updateCurrentstep('subjects', row?.id, row?.category)}
                >
                    <HiPlus size={17} className='text-blue-700' title='Add subjects' />
                </button>
                <button 
                    className="p-1 border-none font-medium"
                    onClick={() => editCategory(row)}
                >
                    <AiOutlineEdit size={17} className='text-gray-700' title='Edit category' />
                </button>
                {
                    row?.status === '1' ?
                        <button
                            className={`p-1 border-none`}
                            onClick={() => categoryActivation(row?.id)}
                        >
                            <MdOutlineCancel size={17} className='text-red-600' title='deactivate' />
                        </button>
                        :
                        <button
                            className={`p-1 border-none`}
                            onClick={() => categoryActivation(row?.id)}
                        >
                            <FaRegCircleCheck  size={16} className='text-green-600' title='activate' />
                        </button>
                }
                
            </div>
          ),
        },
    ];

    if(tokenExpired(categories)){
        toast.error('Your session has expired! Please Login again');
        logout();
    }

    const categoryActivation = (rowid) => {
        const data = {
            id:rowid
        }

        if(window.confirm('Are you sure you want to proceed with this action?')){
            categoryActivationAction(token, data, setSuccess, setError, setActivating);
        }
    }

    const editCategory = (catObj) => {
        setShoweditform(true);
        setObjtoedit(catObj);
    }

    if(error !== null){
        toast.error(JSON.stringify(error));
        setError(null);
    }

    if(success !== null){
        toast.success(success?.success);
        refreshRecord(Date.now());
        setSuccess(null);
    }

    useEffect(() => {
        fetchAuthCategories(token, setCategories, setError, setFetching)
    }, [record])

    useEffect(() => {
        if(localStorage.getItem('previd')){
            localStorage.removeItem('previd');
            localStorage.removeItem('prevname');
            localStorage.removeItem('prev2id');
            localStorage.removeItem('prev2name');
        } 
    }, [])

    return (
        <div className='w-full'>
            <div className='w-full flex'>
                <button 
                    className='px-6 py-2 bg-green-800 hover:bg-green-900 text-white rounded-md text-sm'
                    onClick={() => setShowaddform(true)}
                >
                    New Category
                </button>
            </div>
            <ToastContainer />
            <div className='w-full'>
                {
                    fetching ? <PageLoader /> : <RecordsTable columns={columns} data={categories?.categories} />
                }
            </div>

            { showaddform && <AddModal setShowaddform={setShowaddform} />}
            { (showeditform && objtoedit !== null) && <EditModal setShoweditform={setShoweditform} objtoedit={objtoedit} /> }
        </div>
    )
}

export default Categories
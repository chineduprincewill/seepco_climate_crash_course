import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../../context/AuthContext'
import { tokenExpired } from '../../../../apis/functions';
import { ToastContainer, toast } from 'react-toastify';
import { fetchAuthTutorials, tutorialActivationAction } from '../../../../apis/tutorialsActions';
import PageLoader from '../../../../common/PageLoader';
import RecordsTable from '../../../../common/RecordsTable';
import AddModal from './AddModal';
import EditModal from './EditModal';
import { AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai';
import { MdOutlineCancel, MdOutlineKeyboardArrowRight, MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';
import { FaRegCircleCheck } from 'react-icons/fa6';
import ResourceModal from '../resources/ResourceModal';

const Tutorials = ({ resourceid, resourcename }) => {

    const { token, logout, record, refreshRecord, updateCurrentstep } = useContext(AuthContext);

    const [tutorials, setTutorials] = useState(null);
    const [error, setError] = useState(null);
    const [fetching, setFetching] = useState(false);
    const [showaddform, setShowaddform] = useState(false);
    const [showeditform, setShoweditform] = useState(false);
    const [showaddresource, setShowaddresource] = useState(false);
    const [success, setSuccess] = useState(null);
    const [activating, setActivating] = useState(false);
    const [objtoedit, setObjtoedit] = useState(null);
    const [objtoupdate, setObjtoupdate] = useState(null);

    const data = {
        topic_id:resourceid
    }

    const columns = [
        {
          name: "Question",
          selector: (row) => row?.question,
          filterable: true,
          sortable: true,
          cell: (row) => (
            <div className="hover:break-normal py-2">{row?.question}</div>
          )
        },
        {
          name: "Answer",
          selector: (row) => row?.answer,
          filterable: true,
          sortable: true,
          cell: (row) => (
            <div className="hover:break-normal py-2">{row?.answer}</div>
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
                    className='p-1 border-none font-medium'
                    onClick={() => addResource(row)}
                >
                    <AiOutlinePlus size={17} className='text-blue-700' title="Add resource" />
                </button>
                <button 
                    className="p-1 border-none font-medium"
                    onClick={() => editTutorial(row)}
                >
                    <AiOutlineEdit size={17} className='text-gray-700' title='Edit tutorial' />
                </button>
                {
                    row?.status === '1' ?
                        <button
                            className={`p-1 border-none`}
                            onClick={() => tutorialActivation(row?.id)}
                        >
                            <MdOutlineCancel size={17} className='text-red-600' title='deactivate' />
                        </button>
                        :
                        <button
                            className={`p-1 border-none`}
                            onClick={() => tutorialActivation(row?.id)}
                        >
                            <FaRegCircleCheck  size={16} className='text-green-600' title='activate' />
                        </button>
                }
                
            </div>
          ),
        },
    ];

    if(tokenExpired(tutorials)){
        toast.error('Your session has expired! Please Login again');
        logout();
    }


    const tutorialActivation = (rowid) => {
        const data = {
            id:rowid
        }

        if(window.confirm('Are you sure you want to proceed with this action?')){
            tutorialActivationAction(token, data, setSuccess, setError, setActivating);
        }
    }

    const editTutorial = (tpObj) => {
        setShoweditform(true);
        setObjtoedit(tpObj);
    }

    const addResource = (tutObj) => {
        setShowaddresource(true);
        setObjtoupdate(tutObj);
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

    const goBack = () => {
        updateCurrentstep('topics');
    }

    useEffect(() => {
        fetchAuthTutorials(token, data, setTutorials, setError, setFetching);
    }, [record])

    return (
        <div className='w-full'>
            <div className='grid text-sm md:text-[16px] md:flex md:space-x-1 items-center mb-3 p-2 bg-orange-50 font-semibold text-gray-500'>
                <div className='flex space-x-1 items-center'>
                    <span>{localStorage.getItem('prevname')}</span>
                    <MdOutlineKeyboardDoubleArrowRight size={18} className='hidden md:block mt-1 text-gray-400' />
                </div>
                <div className='flex space-x-1 items-center'>  
                    <MdOutlineKeyboardArrowRight size={18} className='md:hidden' />
                    <span>{localStorage.getItem('prev2name')}</span>
                    <MdOutlineKeyboardDoubleArrowRight size={18} className='hidden md:block mt-1 text-gray-400' />
                </div>
                <div className='flex space-x-1 items-center'>
                    <MdOutlineKeyboardArrowRight size={18} className='md:hidden' />
                    <div>{resourcename}</div>
                </div>
            </div>

            <div className='w-full flex justify-between items-center'>
                <button 
                    className='px-6 py-2 bg-green-800 hover:bg-green-900 text-white rounded-md text-sm'
                    onClick={() => setShowaddform(true)}
                >
                    New Tutorial
                </button>
                <button className='py-2 px-6 bg-red-700 hover:bg-red-800 text-white rounded-full'
                    onClick={() => goBack()}
                >
                    Back
                </button>
            </div>

            <ToastContainer />
            <div className='w-full'>
                {
                    fetching ? <PageLoader /> : <RecordsTable columns={columns} data={tutorials?.tutorials} />
                }
            </div>
            { showaddform && <AddModal setShowaddform={setShowaddform} topic_id={resourceid} />}
            { (showeditform && objtoedit !== null) && <EditModal setShoweditform={setShoweditform} objtoedit={objtoedit} /> }
            { (showaddresource && objtoupdate !== null) && <ResourceModal setShowaddresource={setShowaddresource} objtoupdate={objtoupdate} />}
        </div>
    )
}

export default Tutorials
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../../context/AuthContext'
import { generatePagetitle, tokenExpired } from '../../../../apis/functions';
import { ToastContainer, toast } from 'react-toastify';
import { fetchAuthSubjects, subjectActivationAction } from '../../../../apis/subjectsActions';
import PageLoader from '../../../../common/PageLoader';
import RecordsTable from '../../../../common/RecordsTable';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineCancel } from 'react-icons/md';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { HiPlus } from 'react-icons/hi';
import AddModal from './AddModal';
import EditModal from './EditModal';

const Subjects = ({ resourceid, resourcename }) => {

    const { token, logout, record, refreshRecord, updateCurrentstep } = useContext(AuthContext);

    const [subjects, setSubjects] = useState(null);
    const [error, setError] = useState(null);
    const [fetching, setFetching] = useState(false);
    const [showaddform, setShowaddform] = useState(false);
    const [showeditform, setShoweditform] = useState(false);
    const [success, setSuccess] = useState(null);
    const [activating, setActivating] = useState(false);
    const [objtoedit, setObjtoedit] = useState(null);

    const data = {
        category_id: resourceid ? resourceid : localStorage.getItem('previd')
    }

    const columns = [
        {
          name: "Subject",
          selector: (row) => row?.subject,
          filterable: true,
          sortable: true,
          cell: (row) => (
            <div className="hover:break-normal">{row?.subject}</div>
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
                    onClick={() => addchildren('topics', row?.id, row?.subject)}
                >
                    <HiPlus size={17} className='text-blue-700' title='Add topics' />
                </button>
                <button 
                    className="p-1 border-none font-medium"
                    onClick={() => editSubject(row)}
                >
                    <AiOutlineEdit size={17} className='text-gray-700' title='Edit subject' />
                </button>
                {
                    row?.status === '1' ?
                        <button
                            className={`p-1 border-none`}
                            onClick={() => subjectActivation(row?.id)}
                        >
                            <MdOutlineCancel size={17} className='text-red-600' title='deactivate' />
                        </button>
                        :
                        <button
                            className={`p-1 border-none`}
                            onClick={() => subjectActivation(row?.id)}
                        >
                            <FaRegCircleCheck  size={16} className='text-green-600' title='activate' />
                        </button>
                }
                
            </div>
          ),
        },
    ];

    if(tokenExpired(subjects)){
        toast.error('Your session has expired! Please Login again');
        logout();
    }

    const subjectActivation = (rowid) => {
        const data = {
            id:rowid
        }

        if(window.confirm('Are you sure you want to proceed with this action?')){
            subjectActivationAction(token, data, setSuccess, setError, setActivating);
        }
    }

    const addchildren = (stepname, resid, resname) => {
        updateCurrentstep(stepname, resid, resname);
        localStorage.setItem('previd', resourceid ? resourceid : localStorage.getItem('previd'));
        localStorage.setItem('prevname', resourcename ? resourcename : localStorage.getItem('prevname'));
    }

    const editSubject = (subObj) => {
        setShoweditform(true);
        setObjtoedit(subObj);
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
        fetchAuthSubjects(token, data, setSubjects, setError, setFetching);
    }, [record])

    return (
        <div className='w-full'>
            <h1 className='text-lg mb-3 p-2 bg-orange-50 font-semibold text-orange-950'>{resourcename ? resourcename : localStorage.getItem('prevname')}</h1>

            <div className='w-full flex justify-between items-center'>
                <button 
                    className='px-6 py-2 bg-green-800 hover:bg-green-900 text-white rounded-md text-sm'
                    onClick={() => setShowaddform(true)}
                >
                    New Subject
                </button>
                <button className='py-2 px-6 bg-red-700 hover:bg-red-800 text-white rounded-full'
                    onClick={() => updateCurrentstep('categories')}
                >
                    Back
                </button>
            </div>

            <ToastContainer />
            <div className='w-full'>
                {
                    fetching ? <PageLoader /> : <RecordsTable columns={columns} data={subjects?.subjects} />
                }
            </div>
            { showaddform && <AddModal setShowaddform={setShowaddform} category_id={resourceid} />}
            { (showeditform && objtoedit !== null) && <EditModal setShoweditform={setShoweditform} objtoedit={objtoedit} /> }
        </div>
    )
}

export default Subjects
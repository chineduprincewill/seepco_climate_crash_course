import React, { useContext, useRef, useState } from 'react'
import { FaRegSave } from 'react-icons/fa';
import { updateCategoryOrder } from '../../../apis/categoriesActions';
import { AuthContext } from '../../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';

const ReoderCategoryComponent = ({ categdata }) => {

    //console.log(categdata);

    const { token, refreshRecord } = useContext(AuthContext);

    const [categs, setCategs] = useState(categdata);
    const [orderArr, setOrderArr] = useState([]);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [updating, setUpdating] = useState(false);

    const dragCategory = useRef(0);
    const draggedOverCategory = useRef(0);

    const handleSort = () => {
        const categoryClone = [...categs];
        const temp = categoryClone[dragCategory.current];
        categoryClone[dragCategory.current] = categoryClone[draggedOverCategory.current];
        categoryClone[draggedOverCategory.current] = temp;
        setCategs(categoryClone);
    }

    
    let orderArray = [];

    const updateOrder = () => {
        categs.map((cats, index) => {
            orderArray.push({
                order_id : index, 
                category_id : cats?.id
            })
        })
        setOrderArr(orderArray);
    }

    //console.log(orderArr);
    if(orderArr.length > 0){
        const data = {
            orderArray : JSON.stringify(orderArr)
        }

        updateCategoryOrder(token, data, setSuccess, setError, setUpdating);
        setOrderArr([]);
    }

    if(error !== null){
        toast.error(JSON.stringify(error));
        setError(null);
    }

    if(success !== null){
        toast.success(success?.success);
        setSuccess(null);
    }


    return (
        <div className='w-full h-[500px] overflow-x-hidden overflow-scroll space-y-3'>
            <div className='w-full flex justify-end items-center py-1'>
                
                <div className='flex space-x-1 items-center'>
                    {
                        updating ? 
                            <span className='text-orange-600 text-xs'>updating order...</span>
                            :
                            <span className='text-xs text-gray-300'>update order</span>
                    }
                    <FaRegSave 
                        size={20} 
                        className='text-green-600 cursor-pointer' 
                        onClick={() => updateOrder()}
                    />
                </div>
            </div>
            <ToastContainer />
            
        {
            categs.map((dataitem, index) => {
                return <div 
                            key={dataitem?.id} 
                            className='w-full p-2 rounded-md bg-orange-100 cursor-grab'
                            draggable
                            onDragStart={() => (dragCategory.current = index)}
                            onDragEnter={() => (draggedOverCategory.current = index)}
                            onDragEnd={handleSort}
                            onDragOver={(e) => e.preventDefault()}
                        >
                            {dataitem?.category}
                        </div>
            })
        }
        </div>
    )
}

export default ReoderCategoryComponent
import { useContext } from "react";
import { useLocation } from "react-router-dom";

export const formatPagetitle = () => {
    const loc = useLocation();
    return loc.pathname.replace('/', '').replace('-', ' ');
}

export const tableCustomStyles = {
    headCells: {
      style: {
          fontSize: '13px',
          fontWeight: 'bold',
          padding: '0 15px',
          justifyContent: 'left',
          backgroundColor: '#eeeeee',
          textTransform: 'uppercase'
      },
      rows: {
        style: {
            fontWeight: 'bold', 
            color: 'red'
        },
    },
    },
  }


export const tokenExpired = (response) => {
    if(response !== null && response?.status === 'Token is Expired'){
        return true;
    }
    else{
        return false
    }
}


export const generatePagetitle = (resourcename) => {

    //resourcename && 
    var exisiting = localStorage.getItem('pagetitle') ? localStorage.getItem('pagetitle') : localStorage.setItem('pagetitle', resourcename);

    var data = exisiting && resourcename ? exisiting + ' - ' + resourcename : exisiting; 
    localStorage.setItem('pagetitle', data);
}
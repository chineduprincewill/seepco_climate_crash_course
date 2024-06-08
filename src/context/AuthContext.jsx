import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {

    const userData = JSON.parse(localStorage.getItem('isLoggedIn'));
    
    const [token, setToken] = useState(userData ? userData?.token : '');
    const [user, setUser] = useState(userData ? userData?.user : null);
    const [record, setRecord] = useState(null);
    const [currentstep, setCurrentstep] = useState('categories');
    const [resourceid, setResourceid] = useState();
    const [resourcename, setResourcename] = useState();
    const [progress, setProgress] = useState('');
    const [publicCategoryObj, setPublicCategoryObj] = useState(null);
    const [publicSubjectObj, setPublicSubjectObj] = useState(null);
    const [publicTopicObj, setPublicTopicObj] = useState(null);

    const logout = () => {
        setToken('');
        setUser(null);
        localStorage.removeItem('isLoggedIn');
        window.location.reload();
    }

    useEffect(() => {
        
        if(localStorage.getItem('isLoggedIn')){
            
            setToken(userData?.token);
            setUser(userData?.user);
        }
    }, [])

    const refreshRecord = (val) => {
        setRecord(val);
    }

    const updateCurrentstep = (step, val, name) => {
        setCurrentstep(step);
        setResourceid(val);
        setResourcename(name);
    }

    const updateProgress = (str) => {
        setProgress(str);
    }

    const updatePublicCategory = (obj) => {
        setPublicCategoryObj(obj);
    }

    const updatePublicSubject = (obj) => {
        setPublicSubjectObj(obj);
    }

    const updatePublicTopic = (obj) => {
        setPublicTopicObj(obj);
    }

    return(
        <AuthContext.Provider value={
            { 
                token, 
                user, 
                logout, 
                record, 
                refreshRecord, 
                currentstep, 
                updateCurrentstep, 
                resourceid, 
                resourcename,
                progress,
                updateProgress,
                publicCategoryObj,
                updatePublicCategory,
                publicSubjectObj,
                updatePublicSubject,
                publicTopicObj,
                updatePublicTopic
            }
        }>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
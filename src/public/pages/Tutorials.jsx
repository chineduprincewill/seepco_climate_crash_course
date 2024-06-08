import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import PublicSidebar from '../PublicSidebar';
import PublicHeader from '../PublicHeader';
import PublicCategory from '../components/PublicCategory';
import PublicSubject from '../components/PublicSubject';
import PublicTopic from '../components/PublicTopic';
import PublicTutorial from '../components/PublicTutorial';
import { AuthContext } from '../../context/AuthContext';

const Tutorials = () => {

    const { progress, updateProgress } = useContext(AuthContext);

    const [navOpen, setNavOpen] = useState(false);

    const toggleSidebar = () => {
        setNavOpen(!navOpen);
    }

    let progressComponent;

    if(progress === 'category'){
        progressComponent = <PublicCategory updateProgress={updateProgress} />
    }
    else if(progress === 'subject'){
        progressComponent = <PublicSubject updateProgress={updateProgress} />
    }
    else if(progress === 'topic'){
        progressComponent = <PublicTopic updateProgress={updateProgress} />
    }
    else if(progress === 'tutorial'){
        progressComponent = <PublicTutorial updateProgress={updateProgress} />
    }
    else{
        progressComponent = <PublicCategory updateProgress={updateProgress} />
    }

    return (
        <div className='w-full flex m-0 bg-[#202a3b]'>
            <PublicSidebar toggleSidebar={toggleSidebar} navOpen={navOpen} />
            <PublicHeader toggleSidebar={toggleSidebar} />
            <main className='flex-grow'>
                <div className="ml-0 md:ml-[250px] max-w-screen-2xl p-4 2xl:px-10 mt-12 text-white">
                    {progressComponent}
                </div>
            </main>
        </div>
    )
}

export default Tutorials
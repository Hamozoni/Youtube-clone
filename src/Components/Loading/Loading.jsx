import { useContext } from 'react';
import './Loading.scss';
import { statesContext } from '../../Contexts/statesContext';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { language } from '../../Utils/language';

const Loading = ()=> {

    const {theme,lang} = useContext(statesContext)
    return (
        
        <div className="loading">
            <div className={`${theme} logo`}> 
                  
                <div className='logo-cont' >
                    <div className={`${theme} icon`}>
                        <div className="background"></div> 
                        <PlayArrowIcon />
                    </div>
                    <h1>
                        <span>M</span>
                        <span>y</span>
                        <span>h</span>
                    </h1>
                </div>  
            </div>
        </div>
    );
};

export default Loading;
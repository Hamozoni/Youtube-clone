import CloseIcon from '@mui/icons-material/Close';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import "./SearchRecorder.scss";
import { useContext } from 'react';
import { statesContext } from '../../Contexts/statesContext';

const SearchRecorder = () => {

    const {setIsRecording,theme} = useContext(statesContext);
  return (
    <section 
        className='search-recorder' 
        onClick={(e)=> {
            if(e.target.classList.contains('search-recorder')){
                setIsRecording(false)
            }
        }}
        >
         <div className={`${theme} recorder-container`}>
            <header className="recorder-header">
                <div className="cancel">
                    <span onClick={()=> setIsRecording(false)}><CloseIcon /></span>
                </div>
                <h3 className="listing">
                    listing...
                </h3>
            </header>
            <div className="recorder-box">
                <div className="rec-mike">
                    <span><KeyboardVoiceIcon /></span>
                </div>
            </div>
         </div>
    </section>
  )
}

export default SearchRecorder
import CloseIcon from '@mui/icons-material/Close';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';

import "./SearchRecorder.scss";

const SearchRecorder = () => {
  return (
    <section className='search-recorder'>
         <div className="recorder-container">
            <header className="recorder-header">
                <div className="cancel">
                    <span><CloseIcon /></span>
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
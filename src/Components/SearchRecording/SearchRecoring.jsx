import CloseIcon from '@mui/icons-material/Close';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';

const SearchRecoring = () => {
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
                <div className="isliting">
                    <p>listing ...</p>

                </div>
                <div className="mic-box">
                    <KeyboardVoiceIcon />
                </div>
            </div>
         </div>
    </section>
  )
}

export default SearchRecoring
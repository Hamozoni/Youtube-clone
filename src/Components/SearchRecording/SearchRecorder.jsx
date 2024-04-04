import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CloseIcon from '@mui/icons-material/Close';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';

import "./SearchRecorder.scss";
import { statesContext } from '../../Contexts/statesContext';
import { language } from '../../Utils/language';

const SearchRecorder = () => {

    const {setIsRecording,theme,lang} = useContext(statesContext);
 
    const recorderInput = useRef(null)
    const recorder = useRef(null);

    const [isRecordingEnd,setIsRecordingEnd,] = useState(false);
    const [isRecordingStart,setIsRecordingStart] = useState(false);
    const [transcript,setTranscript] = useState('');

    useEffect(()=>{
        return ()=> {
            if(recorder.current && isRecordingEnd) {
                recorder.current.stop();
                recorder.current.onend = ()=> {
                    setIsRecordingEnd(true);
                    setIsRecordingStart(false);
                }
            }
        }
    },[recorder,isRecordingEnd]);


    const startRecording = ()=> {
        setIsRecordingStart(true);
        setIsRecordingEnd(false)
        if('webkitSpeechRecognition' in window) {
            recorder.current = new window.webkitSpeechRecognition();

            recorder.current.continuous = true;
            recorder.current.lang = lang;
            recorder.current.interimResults = true;
    
            recorder.current.onresult = (e)=> {
                const {transcript} =  e.results[e.results.length - 1][0];
                const {isFinal} = e.results[e.results.length - 1];
                recorderInput.current.focus();
                setTranscript(transcript);
                if(isFinal === true && transcript){
                    handleNavingTosearch(transcript)
                }
            }
            recorder.current.start();
        }
    }

    const stopRecording = ()=> {
        if(recorder.current) {
            recorder.current.stop();
        }
        setIsRecording(false);
        setIsRecordingEnd(true);
        setIsRecordingStart(false);
    }

    const handleTogleRecording= ()=> {
        setIsRecordingStart(!isRecordingStart);

        if(!isRecordingStart) {
            startRecording()
        }else {
            stopRecording()
        }

    };
    const  navigate = useNavigate();

    const handleNavingTosearch = (query)=> {
        stopRecording()
        navigate(`search?query=${query}`);
    };

    const closeRecorder = (e)=> {
        if(e.target.classList.contains('close')){
            stopRecording();
        }
    }

  return (
    <section 
        className={`b-g-t-${theme} search-recorder  close`} 
        onClick={e => closeRecorder(e)}
        >
         <div className={`back-color-${theme} recorder-container`}>
            <header className="recorder-header">
                <div className={`t-color-${theme}-4 cancel`}>
                    <span> 
                        <CloseIcon  className='close' onClick={e => closeRecorder(e)} />
                    </span>
                </div>
                <h3 className={`t-color-${theme}-3 listing`}>
                    {
                      isRecordingStart ? language[lang].listening  :   language[lang].startRecord
                    }
                   
                </h3>
            </header>
            <div className="recorder-box">
                <div 
                    onClick={handleTogleRecording} 
                    className={isRecordingStart  && !isRecordingEnd ? `active mike-container back-color-${theme}-1 ` :"mike-container"}
                    >
                    <div className={`${isRecordingStart && !isRecordingEnd ? 'active' :''} border-c-${theme}-1 t-color-${theme}-3 back-hov-c-${theme}-2 back-color-${theme}-1 rec-mike`}>
                        <KeyboardVoiceIcon />
                    </div>
                </div>
            </div>
            <div className='recorder-input-box'>
                <input 
                    ref={recorderInput} 
                    className={`border-c-${theme}-1 recorder-inp`} 
                    type="text" 
                    value={transcript}
                     />
            </div>
         </div>
    </section>
  )
}

export default SearchRecorder
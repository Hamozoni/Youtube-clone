import CloseIcon from '@mui/icons-material/Close';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import "./SearchRecorder.scss";
import { useContext, useEffect, useRef, useState } from 'react';
import { statesContext } from '../../Contexts/statesContext';
import { Link, Navigate, useNavigate } from 'react-router-dom';



const SearchRecorder = () => {

    const {setIsRecording,theme,lang} = useContext(statesContext);
 
    const recorder = useRef(null);
    const [isRecordingEnd,setIsRecordingEnd,] = useState(false);
    const [isRecordingStart,setIsRecordingStart] = useState(false);
    const [transcript,setTranscript] = useState('');

    const recorderInput = useRef(null)

    useEffect(()=>{
        return ()=> {
            if(recorder.current && isRecordingEnd) {
                recorder.current.stop();
                setIsRecordingEnd(false)
            }
        }
    },[]);


    const startRecording = ()=> {
        setIsRecordingStart(true);
        if('webkitSpeechRecognition' in window) {
            recorder.current = new window.webkitSpeechRecognition();

            recorder.current.continuous = true;
            recorder.current.lang = lang;
            recorder.current.interimResults = true;
    
            console.log(new window.webkitSpeechRecognition())
    
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
            setIsRecordingEnd(true);
        }
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
      recorder.current.stop();
      navigate(`search?query=${query}`);

      setIsRecording(false);
    };

    const closeRecorder = (e)=> {
        if(e.target.classList.contains('close')){
            stopRecording();
            setIsRecording(false);
        }
    }

  return (
    <section 
        className='search-recorder  close' 
        onClick={e => closeRecorder(e)}
        >
         <div className={`${theme} recorder-container`}>
            <header className="recorder-header">
                <div className={`${theme} cancel`}>
                    <span><CloseIcon  className='close' onClick={e => closeRecorder(e)} /></span>
                </div>
                <h3 className={`${theme} listing`}>
                    {
                      isRecordingStart ? ' listing...'  :   'start by bressing mic icon'
                    }
                   
                </h3>
            </header>
            <div className="recorder-box">
                <div onClick={handleTogleRecording} className={isRecordingStart ? 'active mike-container' :"mike-container"}>
                    <div className={isRecordingStart ? 'active rec-mike' :"rec-mike"}>
                        <KeyboardVoiceIcon />
                    </div>
                </div>
            </div>
            <div className="recorder-input-box">
                <input ref={recorderInput} className='recorder-inp' type="text" value={transcript} />
            </div>
         </div>
    </section>
  )
}

export default SearchRecorder
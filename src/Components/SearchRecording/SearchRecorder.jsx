import CloseIcon from '@mui/icons-material/Close';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import "./SearchRecorder.scss";
import { useContext, useEffect, useRef, useState } from 'react';
import { statesContext } from '../../Contexts/statesContext';



const SearchRecorder = () => {

    const {setIsRecording,theme,lang} = useContext(statesContext);
 
    const recorder = useRef(null);
    const [isRecordingEnd,setIsRecordingEnd,] = useState(false);
    const [isRecordingStart,setIsRecordingStart] = useState(false);
    const [transcript,setTranscript] = useState('');

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
                console.log(e)
                setTranscript(transcript);
            }
            recorder.current.start();

        }
    }

    const stopRecording = ()=> {
        if(recorder.current) {
            recorder.current.stop()
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

    }

  return (
    <section 
        className='search-recorder' 
        onClick={(e)=> {
            if(e.target.classList.contains('search-recorder')){
                setIsRecording(false);
            }
        }}
        >
         <div className={`${theme} recorder-container`}>
            <header className="recorder-header">
                <div className="cancel">
                    <span onClick={()=> {
                        setIsRecording(false);
                        }}><CloseIcon /></span>
                </div>
                <h3 className="listing">
                    {
                        transcript ? transcript :' listing...' 
                    }
                   
                </h3>
            </header>
            <div className="recorder-box">
                <div onClick={handleTogleRecording} className={isRecordingStart ? 'active mike-container' :"mike-container"}>
                    <div className='rec-mike' >
                        <KeyboardVoiceIcon />
                    </div>
                </div>
            </div>
         </div>
    </section>
  )
}

export default SearchRecorder
import CloseIcon from '@mui/icons-material/Close';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import "./SearchRecorder.scss";
import { useContext, useEffect, useRef, useState } from 'react';
import { statesContext } from '../../Contexts/statesContext';



const SearchRecorder = () => {

    const {setIsRecording,theme} = useContext(statesContext);

    const recorder = useRef(null);
    const [isRecordingEnd,setIsRecordingEnd,] = useState(false);
    const [isRecordingStart,setIsRecordingStart] = useState(false);
    const [transcript,setTranscript] = useState('');

    useEffect(()=>{
        return ()=> {
            if(recorder.current) {
                recorder.current.stop()
            }
        }
    },[]);


    const startRecording = ()=> {
        setIsRecordingStart(true);
        if('webKitSpeechRecognition' in window) {
            recorder.current = new window.webKitSpeechRecognition();
            recorder.current.continuous = true;
            recorder.current.interimResults = true;
    
            // console.log(new webKitSpeechRecognition())
    
            recorder.current.onresult = (e)=> {
                const {transcript} =  e.results[e.results.length - 1][0];
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
        // console.log(window.SpeechRecognition())

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
                    listing...
                </h3>
            </header>
            <div className="recorder-box">
                <div onClick={handleTogleRecording} className={isRecordingStart ? 'active mike-container' :"mike-container"}>
                    <div className='rec-mike' >
                        <KeyboardVoiceIcon />
                    </div>
                </div>
            </div>
            <div className="tra">
                {
                    transcript
                }
            </div>
         </div>
    </section>
  )
}

export default SearchRecorder
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

    const handleNavingTosearch = ()=> {
      recorder.current.stop();
      navigate(`search?query=${transcript}`);

      setIsRecording(false);
    };

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
            <div className="search-nav">
                    <input type="text" value={transcript} onChange={(e)=> setTranscript(e.target.value)}/>
                    {
                        transcript && 
                       <button onClick={handleNavingTosearch} type="button">go</button>
                    }
            </div>
         </div>
    </section>
  )
}

export default SearchRecorder
import CloseIcon from '@mui/icons-material/Close';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import "./SearchRecorder.scss";
import { useContext, useEffect, useRef, useState } from 'react';
import { statesContext } from '../../Contexts/statesContext';

const SearchRecorder = () => {

    const {setIsRecording,theme} = useContext(statesContext);

    const recorder = useRef(null);
    const [canRecord,setCanRecord] = useState(false);
    const [isRecordingSatrt,setIsRecordingSatrt] = useState(false);
    const [audioURL,setAudioURL] = useState(null);


    useEffect(()=>{
        if(window.navigator.mediaDevices && window.navigator.mediaDevices.getUserMedia){
            window.navigator.mediaDevices.getUserMedia({audio: true})
            .then((stream)=> {
                    recorder.current = new MediaRecorder(stream);
                    let chunks = []
                    console.log(recorder.current);

                    recorder.current.ondataavailable = (e)=> {
                        chunks.push(e.data)
                    }

                    recorder.current.stop = e => {
                            const blob = new Blob(chunks,{type: "audio/ogg; codecs=opus"})

                            chunks = [];
                            setAudioURL(window.URL.createObjectURL(blob));

                    }
                    setCanRecord(true);
                }
            )
            .catch((er)=>{
                console.error(er)
            })
        }
    },[isRecordingSatrt])

    const togleMic = ()=> {
          if(!canRecord) return;
          setIsRecordingSatrt(!isRecordingSatrt);

          if(isRecordingSatrt) {
            recorder.current.start();
            console.log('start')
          }else {
            recorder.current.stop();
            console.log('stop')
          }

          console.log(audioURL)
    };

  return (
    <section 
        className='search-recorder' 
        onClick={(e)=> {
            if(e.target.classList.contains('search-recorder')){
                setIsRecording(false);
                recorder.current.stop();
            }
        }}
        >
         <div className={`${theme} recorder-container`}>
            <header className="recorder-header">
                <div className="cancel">
                    <span onClick={()=> {
                        setIsRecording(false);
                        recorder.current.stop();
                        }}><CloseIcon /></span>
                </div>
                <h3 className="listing">
                    listing...
                </h3>
            </header>
            <div className="recorder-box">
                <div className={isRecordingSatrt ? 'active mike-container' :"mike-container"}>
                    <div className='rec-mike' onClick={togleMic}>
                        <KeyboardVoiceIcon />
                    </div>
                </div>
            </div>
            {
                audioURL && 

                    <audio src={audioURL} controls></audio>
                
            }
         </div>
    </section>
  )
}

export default SearchRecorder
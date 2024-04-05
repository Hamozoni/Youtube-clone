import './VideoPlayer.scss';
import { useContext, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

import  ReactPlayer from 'react-player';
import MainChannelCard from '../MainChannelCard/MainChannelCard';

import WatchButtons from './WatchButtons';
import VideoDescribtion from '../Watch/VideoDescribtion';
import { statesContext } from '../../Contexts/statesContext';
import Comments from "../../Components/Comments/Comments";
import { fetchChannelApi } from '../../Utils/FetchApi';
import Error from '../Error/Error';


const VideoPlayer = ({setKeywords})=> {

    const {id} = useParams();
    const { theme,lang} = useContext(statesContext);

    const [videoDetail,setVideoDetail] = useState(null);
    const [error,setError] = useState(null);
    const [isPending,setIsPending] = useState(true);

    useEffect(()=> {
        setError(null);
        setIsPending(true)
        fetchChannelApi(`video/info?id=${id}&extend=1&lang=${lang}`)
        .then((data)=> {
            setVideoDetail(data);
            setKeywords(data?.keywords);
            console.log(data)
        })
        .catch((error)=> {
            setError(error)
        })
        .finally(()=> {
            setIsPending(false)
        })
    },[id,lang,setKeywords])


    return (
        
            error ? <Error error={error}/> :  isPending ? '' :
            <div  className='video'>
                <ReactPlayer 
                        url={`hppts://www.youtube.com/watch?v=${id}?autoplay=1&mute=0?`}
                        className='video-player'
                        controls
                        playing
                    />
                <div className='video-desc' >
                    <h3 className={`${theme} video-title`} >
                        { videoDetail?.title }
                    </h3>
                        <div className='left'>
                            <MainChannelCard data={ videoDetail } renderFrom="watch"/> 
                        <div className='links-btns'>
                            <WatchButtons videoDetail={ videoDetail } />
                        </div>
                    </div>
                    <VideoDescribtion videoDetail={ videoDetail }  />
                    <Comments id={id} fetchQuery='comments' renderedFrom='watch' />
                </div>
            </div>
        
    );
};

export default VideoPlayer;
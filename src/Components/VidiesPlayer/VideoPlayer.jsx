import './VideoPlayer.scss';
import { useContext, useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';

import  ReactPlayer from 'react-player';

import WatchButtons from './WatchButtons';
import VideoDescribtion from '../Watch/VideoDescribtion';
import { statesContext } from '../../Contexts/statesContext';
import Comments from "../../Components/Comments/Comments";
import { fetchChannelApi } from '../../Utils/FetchApi';
import Error from '../Error/Error';
import WatchLoading from '../Loading/WatchLoading/WatchLoading';


const VideoPlayer = ({setKeywords})=> {

    const {id} = useParams();
    const { theme,lang} = useContext(statesContext);

    const [videoDetail,setVideoDetail] = useState(null);
    const [error,setError] = useState(null);
    const [isPending,setIsPending] = useState(true);

    useEffect(()=> {
        setError(null);
        setIsPending(true)
        fetchChannelApi(`video/info?id=${id}&extend=+1&lang=${lang}`)
        .then((data)=> {
            setVideoDetail(data);
            setKeywords(data?.keywords);
            document.title = data.title;
            console.log(data);
        })
        .catch((error)=> {
            setError(error)
        })
        .finally(()=> {
            setIsPending(false)
        })
    },[id,lang,setKeywords])


    return (
        
            error ? <Error error={error}/> :  isPending ? <WatchLoading /> :
            <div  className='video'>
                <ReactPlayer 
                        url={`hppts://www.youtube.com/watch?v=${id}?autoplay=1&mute=0?`}
                        className='video-player'
                        controls
                        playing
                    />
                <div className='video-desc' >
                    <h3 className={`t-color-${theme} video-title`} >
                        { videoDetail?.title }
                    </h3>
                    <div className='left'>
                        <div className="channel-card">
                            <Link to='' className="ch-img">
                                <img 
                                    src={videoDetail?.channelThumbnail[0]?.url} 
                                    alt="channel image"
                                    />
                            </Link>
                            <div className="ch-info">
                                <div className="ch-det">
                                    <Link to='' className={`t-color-${theme} ch-name`}>
                                        {videoDetail?.channelTitle}
                                    </Link>
                                    <p className={`t-color-${theme}-3 ch-subs-cout`}>
                                        {videoDetail?.subscriberCountText}
                                    </p>
                                </div>
                                <div className="ch-subs-btn">

                                </div>

                            </div>
                        </div>
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
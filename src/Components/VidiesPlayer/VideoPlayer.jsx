import './VideoPlayer.scss';
import { useContext, useEffect} from 'react';
import { useParams } from 'react-router-dom';

import  ReactPlayer from 'react-player';
import MainChannelCard from '../MainChannelCard/MainChannelCard';

import WatchButtons from './WatchButtons';
import VideoDescribtion from '../Watch/VideoDescribtion';
import { statesContext } from '../../Contexts/statesContext';
import Comments from "../../Components/Comments/Comments";
import { videoDetailsContext } from '../../Pages/Watch/Watch';

const VideoPlayer = ()=> {

    const {id} = useParams();
    const { theme } = useContext(statesContext);
    const { videoDetail } = useContext(videoDetailsContext);

    return (
         <div  className='video'>
           <ReactPlayer 
                url={`hppts://www.youtube.com/watch?v=${id}?autoplay=1&mute=0?`}
                className='player'
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
                    <WatchButtons />
                </div>
            </div>
             <VideoDescribtion  />
             <Comments id={id} fetchQuery='comments' renderedFrom='watch' />
        </div>
       </div>
    
    );
};

export default VideoPlayer;
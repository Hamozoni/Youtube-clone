import './VideoPlayer.scss';
import { useContext} from 'react';

import  ReactPlayer from 'react-player';
import MainChannelCard from '../MainChannelCard/MainChannelCard';

import WatchButtons from './WatchButtons';
import VideoDescribtion from '../Watch/VideoDescribtion';
import { statesContext } from '../../Contexts/statesContext';
import Comments from "../../Components/Comments/Comments";

const VideoPlayer = ({videoDetail,id})=> {

    const { theme } = useContext(statesContext);

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
                    <WatchButtons like={videoDetail?.likeCount} video={videoDetail} />
                </div>
            </div>
             <VideoDescribtion videoDetail={videoDetail} />
             <Comments id={id} fetchQuery='comments' renderedFrom='watch' />
        </div>
       </div>
    
    );
};

export default VideoPlayer;
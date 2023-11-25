import './VideoPlayer.scss';
import { useContext} from 'react';

import  ReactPlayer from 'react-player';
import MainChannelCard from '../MainChannelCard/MainChannelCard';

import WatchButtons from './WatchButtons';
import VideoDescribtion from '../Watch/VideoDescribtion';
import VideoComments from '../Watch/VideoComments';
import { statesContext } from '../../Contexts/statesContext';

const VideoPlayer = ({videoDetail,id})=> {

    const { theme } = useContext(statesContext);

    return (
         <div  className={`${theme} video`}>
           <ReactPlayer 
                url={`hppts://www.youtube.com/watch?v=${id}?autoplay=1&mute=0?`}
                className='player'
                controls
                playing
            />
           <div className={`${theme} video-desc`} >
               <h3 className={`${theme} video-title`} >
                  { videoDetail?.title }
               </h3>
            <div className={`${theme} left`}>
                <MainChannelCard data={ videoDetail } renderFrom="watch"/> 
                <div className={`${theme} links-btns`}>
                    <WatchButtons like={videoDetail?.likeCount} />
                </div>
            </div>
             <VideoDescribtion videoDetail={videoDetail} />
             <VideoComments id={id} videoDetail={videoDetail} />
        </div>
       </div>
    
    );
};

export default VideoPlayer;
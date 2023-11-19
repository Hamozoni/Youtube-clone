import './VideoPlayer.scss';
import { useContext} from 'react';

import  ReactPlayer from 'react-player';
// import { fetchChannelApi } from '../../Utils/FetchApi';
import MainChannelCard from '../MainChannelCard/MainChannelCard';

import Loading from '../Loading/Loading';
import WatchButtons from './WatchButtons';
import VideoDescribtion from '../Watch/VideoDescribtion';
import VideoComments from '../Watch/VideoComments';
import { Theme } from '../../Utils/Colors';
import { isThemeDark } from '../../Contexts/Theme';

const VideoPlayer = ({videoDetail,id})=> {

    const { isDark } = useContext(isThemeDark);
    // const [videoDetail,setVideoDetail] = useState();
    // const [isLoading,setIsLoading] = useState(true);

    // useEffect(()=>{
    //         window.scrollTo(0, 0);
    //         setIsLoading(true) ;         
    //         fetchChannelApi(`video/info?id=${id}&extend=+1`)
    //         .then((data)=> {
    //             setVideoDetail(data);
    //            console.log(data)
    //            setIsLoading(false) ;         

    //         });

    // },[id])

    return (
         <div  className="video">
           <ReactPlayer 
                url={`hppts://www.youtube.com/watch?v=${id}?autoplay=1&mute=0?`}
                className='player'
                controls
                playing
            />
           <div className="video-desc" >
               <h3 className="video-title" style={{color: Theme[isDark].primaryColor}}>
                  { videoDetail?.title }
               </h3>
            <div className="left">
                <MainChannelCard data={ videoDetail } renderFrom="watch"/> 
                <div className="links-btns">
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
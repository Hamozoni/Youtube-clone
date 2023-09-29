
import { useNavigate, Link } from 'react-router-dom';
import './Videos.scss';
import {ternViewsTo} from '../../Utils/Constans';
import MainChannelCard from '../MainChannelCard/MainChannelCard';
import Playlist from '../PlayListCard/PlayList';

import { Theme } from '../../Utils/Colors';
import { lang } from '../../Utils/language';
import { isThemeDark } from '../../Contexts/Theme';
import { useContext, useRef, useState } from 'react';
import { fetchApi } from '../../Utils/FetchApi';

const Videos = ({ videos })=> {
    const navgate = useNavigate();
    const {isDark,isEng} = useContext(isThemeDark);
    // const [isloading,setIsloading] = useState(false);

    const vidContainer = useRef();
   

    // const id = videos.length - 1;
    // console.log(videos[id]?.videoId)

    return (
        <div className="videos" ref={vidContainer} >
            {videos?.map((video)=>(
              video.type === 'video' || video.viewCount ?
                <div key={video?.videoId} className="video-card" >
                    <div className="video-img" onClick={()=> navgate(video?.videoId && `/video/${video?.videoId}`)}>
                         <img src={video?.thumbnail[1]?.url || video?.thumbnail[0]?.url} alt={video?.channelTitle} /> 
                        <span>{video?.lengthText}</span>
                    </div>
                    <div className="content">
                        <div className="wrapper">
                            {video.authorThumbnail?.length ? 
                                <Link to={video?.channelId && `/channels/${video?.channelId}`} className='img' >
                                    <img src={video?.authorThumbnail[0]?.url } alt="" />
                                </Link>: ''
                            }
                            {video.channelThumbnail?.length ?
                                <Link to={video?.channelId &&`/channels/${video?.channelId}`} className='img' >
                                    <img src={video?.channelThumbnail[0]?.url } alt="" />
                                </Link>: ''
                            }
                            <div className="titles">
                                <Link to={video?.videoId &&`/video/${video?.videoId}`}>
                                    <h4 className="video-title" style={{color: Theme[isDark].primaryColor}}>
                                        {video?.title?.length > 53 ? video?.title.slice(0,53) + '...' :  video?.title}
                                    </h4>
                                </Link>
                    
                                <Link to={`/channels/${video?.channelId}`}>
                                    {video?.channelTitle?.length ?
                                     <h5 className="chanel-title" style={{color: Theme[isDark].blueColor}}>
                                        {video?.channelTitle?.length > 20 ?
                                         `${video?.channelTitle?.slice(0,20)}...` :
                                          video?.channelTitle }
                                    </h5>: ''}
                                 </Link> 
                                <div className="stats">
                                   <span className="views-count moment"style={{color: Theme[isDark].lightBlColor}}>
                                     {ternViewsTo(video?.viewCount)} {lang[isEng].views}
                                    </span>
                                   <h5 className='moment'style={{color: Theme[isDark].lightBlColor}}>
                                      {video?.publishedTimeText ||  video?.publishedText }
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>:
              video.type === 'channel' ? <MainChannelCard id={video.channelId} direction={'column'} />
              :  video.type === 'playlist'  &&  <Playlist playlist={video} /> 
            ))}
        </div>
       
    );
};

export default Videos;
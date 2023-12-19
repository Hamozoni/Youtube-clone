
import {useNavigate, Link } from 'react-router-dom';
import './VideoCard.scss';
import {ternViewsTo} from '../../Utils/Constans';
import { language } from '../../Utils/language';
import { statesContext } from '../../Contexts/statesContext';
import { useContext} from 'react';

import SensorsRoundedIcon from '@mui/icons-material/SensorsRounded';
import ReactPlayer from 'react-player';

const Videos = ({ data : video, renderFrom})=> {
    
    const navgate = useNavigate();
    const {theme,lang,playingVideoId, setPlayingVideoId,dispatch} = useContext(statesContext);

    const handleClick = ()=>{
        dispatch({type: 'add-to-history', payload: video});
        navgate(video?.videoId && `/watch/${video?.videoId}`)
    }

    return (
            <div 
                className={`${renderFrom} video-card`} 
                onMouseOver={()=> setPlayingVideoId(video.videoId)}
                onMouseLeave={()=> setPlayingVideoId('')}
                onTouchEnd={()=> setPlayingVideoId(video.videoId)}
                >
                <div 
                    onClick={handleClick} 
                    className="video-img" >
                   { playingVideoId === video.videoId ?
                    <>
                    <ReactPlayer
                        url={`hppts://www.youtube.com/watch?v=${video?.videoId}?autoPlay=1`} 
                        playing
                        muted
                        className='player absolute'
                    /> 

                    <span
                        className="nav-watch absolute"
                        onClick={handleClick}
                     >
                    </span>
                    </>
                    : 
                    <span 
                        style={lang  === "en" ? { right : "5px"} : {left: "5px"}}
                        className={ video?.lengthText === ""  || video?.lengthText?.toLowerCase() === "live" ? "live" :""}
                        >  
                        { video?.lengthText === ""  || video?.lengthText?.toLowerCase()  === "live"  ?
                        <div className='live'>  {language[lang]?.live} < SensorsRoundedIcon /> </div> : video?.lengthText } 
                    </span>
                    }
                    <>
                        <img 
                            src={video?.thumbnail[0]?.url}  
                            alt={video?.channelTitle}
                            onClick={handleClick}
                        /> 
                    </>
                </div>
                <div className="content">
                    <div className="wrapper">
                        {video.authorThumbnail?.length ? 
                            <Link to={video?.channelId && `/channels/${video?.channelId}/home`} className='img' >
                                <img src={video?.authorThumbnail[0]?.url } alt="" />
                            </Link>: ''
                        }
                        { video.channelThumbnail?.length ?
                            <Link to={video?.channelId &&`/channels/${video?.channelId}/home`} className='img' >
                                <img src={video?.channelThumbnail[0]?.url } alt="" />
                            </Link>: ''
                        }
                        <div className={`${theme} titles`}>
                            <Link to={video?.videoId &&`/watch/${video?.videoId}`}>
                                <h4 className={`${theme} video-title`} >
                                 {renderFrom ===  "search" ? video?.title :  `  ${video?.title?.length > 53 ? video?.title.slice(0,53) + '...' :  video?.title}`}
                                </h4>
                            </Link>
                
                            <Link to={`/channels/${video?.channelId}/home`}>
                                {video?.channelTitle?.length ?
                                    <h5 className={`${theme} chanel-title`} >
                                       {video?.channelTitle?.length > 20 ?
                                        `${video?.channelTitle?.slice(0,20)}...` :
                                        video?.channelTitle }
                                    </h5>: ''}
                                </Link> 
                            <div className={`${theme} stats`} >
                                <span className={`${theme} views-count moment`}>
                                    {ternViewsTo(video?.viewCount)} {language[lang].views}
                                </span>
                                <h5 className={`${theme} moment`}>
                                    {video?.publishedTimeText ||  video?.publishedText }
                                </h5>
                            </div>
                            { renderFrom === "search" && 
                                <div className={`${theme} video-desc`}>
                                    <p className={`${theme} desc-content`}>
                                        {video?.description}
                                    </p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
       
    );
};

export default Videos;
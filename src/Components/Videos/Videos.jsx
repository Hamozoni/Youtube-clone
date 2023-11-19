
import {useNavigate, Link } from 'react-router-dom';
import './Videos.scss';
import {ternViewsTo} from '../../Utils/Constans';
import { Theme } from '../../Utils/Colors';
import { language } from '../../Utils/language';
import { isThemeDark } from '../../Contexts/Theme';
import { useContext} from 'react';
import img from "./Images/videos-loader.png"

import SensorsRoundedIcon from '@mui/icons-material/SensorsRounded';
import ReactPlayer from 'react-player';

const Videos = ({ data : video, renderFrom,playingVideoId, setPlayingVideoId})=> {
    
    const navgate = useNavigate();
    const {isDark,lang} = useContext(isThemeDark);

    const handleClick = ()=>{
        navgate(video?.videoId && `/video/${video?.videoId}`)
    }

    return (
            <div 
                className={`${renderFrom} video-card`} 
                onMouseOver={()=> setPlayingVideoId(video.videoId)}
                onMouseLeave={()=> setPlayingVideoId('')}
                onTouchStart={()=> setPlayingVideoId(video.videoId)}
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
                        className='player'
                    /> 

                    <span
                      className='nav-watch'
                      onClick={handleClick}
                     >
                    </span>
                    </>
                    : 
                    <span 
                        style={lang  === "eng" ? { right : "5px"} : {left: "5px"}}
                        className={ video?.lengthText === ""  || video?.lengthText?.toLowerCase() === "live" ? "live" :""}
                        >  
                        { video?.lengthText === ""  || video?.lengthText?.toLowerCase()  === "live"  ?
                        <div className='live'>  {language[lang]?.live} < SensorsRoundedIcon /> </div> : video?.lengthText } 
                    </span>
                    }
                    <>
                        <img 
                            src={video?.thumbnail[0]?.url ? video?.thumbnail[0]?.url : img }  
                            alt={video?.channelTitle}
                            onClick={handleClick}
                        /> 
                    </>
                </div>
                <div className="content">
                    <div className="wrapper">
                        {video.authorThumbnail?.length ? 
                            <Link to={video?.channelId && `/channels/${video?.channelId}`} className='img' >
                                <img src={video?.authorThumbnail[0]?.url } alt="" />
                            </Link>: ''
                        }
                        { video.channelThumbnail?.length ?
                            <Link to={video?.channelId &&`/channels/${video?.channelId}`} className='img' >
                                <img src={video?.channelThumbnail[0]?.url } alt="" />
                            </Link>: ''
                        }
                        <div className="titles">
                            <Link to={video?.videoId &&`/video/${video?.videoId}`}>
                                <h4 className="video-title" style={{color: Theme[isDark].primaryColor}}>
                                 {renderFrom ===  "search" ? video?.title :  `  ${video?.title?.length > 53 ? video?.title.slice(0,53) + '...' :  video?.title}`}
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
                            <div className="stats" style={{color: Theme[isDark].lightBlColor}}>
                                <span className="views-count moment">
                                    {ternViewsTo(video?.viewCount)} {language[lang].views}
                                </span>
                                <h5 className='moment'>
                                    {video?.publishedTimeText ||  video?.publishedText }
                                </h5>
                            </div>
                            { renderFrom === "search" && 
                                <div className="video-desc" style={{color: Theme[isDark].lightBlColor}}>
                                    <p className="desc-content" >
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
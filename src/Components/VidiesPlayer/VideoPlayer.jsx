import './VideoPlayer.scss';
import { useContext, useEffect, useState } from 'react';

import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import moment from 'moment';
import { ternViewsTo } from '../../Utils/Constans';

import  ReactPlayer from 'react-player';

import { fetchApi, fetchApiB, fetchChannelApi } from '../../Utils/FetchApi';
import Comments from '../Comments/Comments';
import MainChannelCard from '../MainChannelCard/MainChannelCard';
import { Theme } from '../../Utils/Colors';
import { isThemeDark } from '../../Contexts/Theme';
import { lang } from '../../Utils/language';

const VideoPlayer = ({id})=> {

    const { isDark, isEng } = useContext(isThemeDark);

    const showDesc = ()=> {
        setComm(true);
        setDesc(!isDesc);   
    };

    const showComment = ()=> {
        setDesc(true);
        setComm(!isComm);
    };


    const [videoDetail,setVideoDetail] = useState();
    const [comments,setCommrnts] = useState([]);
    const [commentCount,setCommrtCount] = useState();
    const [isDesc,setDesc] = useState(true);
    const [isComm,setComm] = useState(true);
    const [likeCount,setLikeCout] = useState(null);
    const [isLoading,setIsLoading] = useState(true);

    const [dl,setDl] =useState(null)


    useEffect(()=>{
            window.scrollTo(0, 0);
            setIsLoading(true)
            
            fetchApiB(`videos?part=snippet,statistics&id=${id}`)
            .then((data)=>{
                setLikeCout(data?.items[0])
            })

            fetchApi(`video?id=${id}`)
            .then((data)=> {
                setVideoDetail(data)
                setIsLoading(false)
                
            });
            fetchApi(`comments?id=${id}`)
            .then((data)=>{
                setCommrtCount(data)
                setCommrnts(data?.data);
            })
            fetchChannelApi(`dl?id=${id}`)
            .then((data)=>{
                setDl(data?.adaptiveFormats[0]?.url)
            })

    },[id])


    return (

        

        isLoading ?  ''   :   <div  className="video">
           <ReactPlayer  url={`hppts://www.youtube.com/watch?v=${id}?autoplay=1&mute=0?`} className='player'controls playing/>
           <div className="video-desc" >
               <h3 className="video-title" style={{color: Theme[isDark].primaryColor}}>
                  {videoDetail?.title.length > 37?
                 `${videoDetail?.title.slice(0,37)}... `
                 :videoDetail?.title
                 }
               </h3>
            <div className="views-desc">
                <div className="desc-head" style={{color: Theme[isDark].blueColor}}>
                  <p className="views">{ternViewsTo(videoDetail?.viewCount) } {lang[isEng].views}</p>
                  <span className='time'>{moment(videoDetail?.publishDate).fromNow()}</span>
                  <span className='show-more' onClick={showDesc}>{isDesc ?lang[isEng].showMore : lang[isEng].showLess}</span>
                </div>
                <div className={isDesc?"desc-content active":"desc-content"}>
                    <h4 className="video-title" style={{color: Theme[isDark].blueColor}} >
                        {videoDetail?.title}
                    </h4>
                    <p className="desc">
                        {videoDetail?.description}
                    </p>
                </div>
            </div>
            <div className="left">
               {videoDetail.channelId && <MainChannelCard id={videoDetail?.channelId}/>}
                <div className="links-like">
                    <div className="links-wrapper">
                        <div className="likes" style={{backgroundColor: Theme[isDark].whiteColor, color: Theme[isDark].lightBlColor}}>
                            <button className='like like-btn'>
                                <ThumbUpOutlinedIcon />{likeCount && ternViewsTo(likeCount?.statistics?.likeCount)}
                            </button>
                            <button className='like dec-btn' >
                                <ThumbDownOffAltOutlinedIcon />
                            </button>
                        </div>
                        <button className='like' style={{backgroundColor: Theme[isDark].whiteColor,color: Theme[isDark].lightBlColor}} >
                            <ShareOutlinedIcon /> {lang[isEng].share}
                        </button>
                        <a download rel='nofolow' href={dl} >
                             <button className='like' style={{backgroundColor: Theme[isDark].whiteColor,color: Theme[isDark].lightBlColor}} >
                                <FileDownloadOutlinedIcon />  {lang[isEng].download}
                            </button>
                        </a>
                        <button className='like' style={{backgroundColor: Theme[isDark].whiteColor,color: Theme[isDark].lightBlColor}}>
                            <LibraryAddOutlinedIcon /> {lang[isEng].save}
                        </button>
                        <button className='like' style={{backgroundColor: Theme[isDark].whiteColor,color: Theme[isDark].lightBlColor}}>
                            <FlagOutlinedIcon /> {lang[isEng].report}
                            </button>
                    </div>
                </div>
            </div>
            <div className={!isComm ? "active comments": "comments"}>
                <div className="comment-head"  onClick={showComment}
                     style={{backgroundColor: Theme[isDark].whiteColor, color: Theme[isDark].lightPrColor}}>
                    <h5 className='comm-title'>
                        {ternViewsTo(commentCount?.commentsCount)} {lang[isEng].comments}
                    </h5>
                    <span className='comm-arrows' >
                        {isComm ?<ExpandMoreIcon/> : <ClearIcon />}
                    </span>
                </div>
                <div className={isComm?"wrapper active":"wrapper"} style={{backgroundColor: Theme[isDark].whiteColor}}>
                   <Comments comments={comments} />
                </div>
            </div>
        </div>
       </div>
    
    );
};

export default VideoPlayer;
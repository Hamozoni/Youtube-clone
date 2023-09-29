import './ShortsVideos.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import  ReactPlayer from 'react-player';
import {fetchChannelApi, fetchApi} from '../../Utils/FetchApi';

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import Loading from '../../Components/Loading/Loading';
import ClearIcon from '@mui/icons-material/Clear';

import { Theme } from '../../Utils/Colors';
import { isThemeDark } from '../../Contexts/Theme';
import { lang } from '../../Utils/language';

import Comments from '../../Components/Comments/Comments';

const ShortsVideos = ()=> {
    const { isDark, isEng } = useContext(isThemeDark)

    const {id} = useParams();
    const navgate = useNavigate();
    const [shortVideo,setShortVideo] = useState(null);
    const [isLoading,setLoading] = useState(true);
    const [videoId] = useState([id]);
    const [videoIndex,setVideoIndex] = useState(0);

    useEffect(()=>{
        setLoading(true)
        fetchChannelApi(`shorts/info?id=${id}`)
        .then((data)=> {
            setShortVideo(data)
            console.log(data)
            setLoading(false)
        })
    },[videoIndex,id]);

    useEffect(()=>{
        if(videoId.length < 10 || videoId.length === videoIndex -1 ){
            fetchChannelApi(`shorts/sequence?id=${id}&lang=ar`)
            .then((data)=>{
                data?.data?.map((vidId)=> videoId.push(vidId?.videoId));
                videoId = [...new Set(videoId)];
               
            })
        }
        console.log(videoId)

    },[id]);


    const nextShort = ()=> {
         if(videoIndex < videoId.length ){
            setVideoIndex(videoIndex + 1)
            navgate(`/short/${videoId[videoIndex]}`)
         }
        
    }

    const prevShort = ()=> {
        if(videoIndex !== 0){
            setVideoIndex(videoIndex - 1)
            navgate(`/short/${videoId[videoIndex]}`)      
        }
   }

   const [isCommets,setIsComments] = useState(false);
   const [isComLoading,setIsComLoading] = useState(true);
   const [commets,setComments] = useState();

   const commentsHandler = ()=> {
        setIsComLoading(true)
        setIsComments(true);
        fetchApi(`comments?id=${id}`)
        .then((data)=> {
            setComments(data?.data)
            setIsComLoading(false)
        })
   }


    return (
        isLoading ? <Loading /> :
       <div className="short-videos">
            <div className="short-v-container"  >
                <div className="short-v-player" >
                    <div className="short-video" >
                        <h4 className="sh-v-title">{shortVideo?.title?.length > 30 ? `${shortVideo?.title?.slice(0,30)}...`: shortVideo?.title} </h4>
                        <ReactPlayer  url={`hppts://www.youtube.com/watch?v=${id}?autoPlay=1`} className='short-player'playing/>
                    </div>
                    <ul className="sh-links-comment" style={{color: Theme[isDark].lightPrColor}}>
                        <li><ThumbUpIcon /> <h5>{shortVideo?.likeCountText}</h5></li>
                        <li><ThumbDownIcon /><h5>{lang[isEng].dislike}</h5></li>
                        <li onClick={commentsHandler} ><CommentIcon /><h5>{shortVideo?.commentCount}</h5></li>
                        <li><ShareIcon /><h5>{lang[isEng].share}</h5></li>
                        <li><MoreVertIcon /></li>
                        <li onClick={()=> navgate(`/channels/${shortVideo?.channelId}`)}><img src={shortVideo?.channelThumbnail[0]?.url} alt="" /></li>
                    </ul> 
                </div>
                <button className='left arrow-btn' onClick={ prevShort}>
                    <KeyboardDoubleArrowLeftIcon />
                </button>
               <button className='right arrow-btn' onClick={nextShort}>
                   <KeyboardDoubleArrowRightIcon />
                </button>
            </div>
            <div className={isCommets ?"comments active" :"comments"}>
                <div className="comm-container" style={{backgroundColor: Theme[isDark].whiteColor}}>
                    <div className="comm-head" style={{color: Theme[isDark].lightPrColor}}>
                        <h5>{shortVideo?.commentCount} {lang[isEng].comments} </h5>
                        <ClearIcon onClick={()=> setIsComments(false) } />
                    </div>
                    <div className="comm-wrapper" >
                         {isComLoading ? <Loading /> :
                          <Comments comments={commets} /> }
                    </div>
                </div>
            </div>   
       </div>
    );
};

export default ShortsVideos;
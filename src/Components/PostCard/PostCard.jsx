import { Link, useNavigate } from "react-router-dom";
import { useContext, useRef, useState } from "react";

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';

import VideoCard from '../VideoCard/VideoCard';

import './PostCard.scss';
import { statesContext } from "../../Contexts/statesContext";
import { language } from "../../Utils/language";


const PostCard = ({community})=>{

    const {theme, lang} = useContext(statesContext);
    
    // const [playingVideoId,setPlayingVideoId] = useState('');

    const navigate = useNavigate()

    const { authorChannelId,
            postId,
            authorThumbnail = null,
            thumbnail = null,
            authorText,
            publishedTimeText,
            contentText,
            attachment = {type: "none"},
            voteCountText = null,
            replyCount
        } = community;

const [isCkecked,setIsCkecked] = useState(null);

    const Choices = ()=>{
        return (
            <div className={`${theme} choices`}>
                 {
                    attachment?.choices?.map((choice,i)=>(
                        <div className={`${theme} ${isCkecked === i && 'active'} choice`}
                            onClick={()=> {
                                if(isCkecked === i){
                                    setIsCkecked(null)
                                }else {
                                    setIsCkecked(i)
                                }
                            }}
                        >
                            <span className={isCkecked !== i &&  "not-check"} >
                                {
                                    isCkecked === i && <CheckCircleIcon/>
                                }
                            </span>
                            <div className={`${theme} choi-box`}>
                                <h4 className={`${theme} name`}>
                                     { choice}
                                </h4>
                                <h4 className={`${theme} percentage`}>

                                </h4>
                                {
                                    isCkecked  !== null && 
                                    <div 
                                        style={{width: `${Math.random().toFixed(2) * 100}%`}} 
                                        className={`${theme} ${isCkecked === i && 'active'} percentage-progres`}
                                        >
                                    </div>
                                }
                            </div>
                       </div>
                    ))
                 }
            </div>
        )
    }

    const imgHolder = useRef(null);

    const scrollLeft = (dir)=>{
        imgHolder.current.scrollBy({
            top: 0,
            left: dir + imgHolder.current.offsetWidth,
            behavior: "smooth",
        });
    };


    const next = ()=>{
        if(lang === 'ar')  {
            scrollLeft('-')
        }else {
            scrollLeft('+')
        }
    };

    const prev = ()=>{

        if(lang === 'ar'){
            scrollLeft('+')
        } else {
            scrollLeft('-');
        }
    };

    return (
        <div className={`${theme} community`}>
            <div className={`${theme} auther`}>
                <Link to={`/channels/${authorChannelId}/home`} className="auth-img">
                    <img src={authorThumbnail[1]?.url || thumbnail[1]?.url} alt="auther" />
                </Link>
                <section>
                    <div className={`${theme} auth-n-publish`}>
                        <h4 className="name"> {authorText} </h4>
                        <span>{publishedTimeText}</span>
                    </div>
                </section>
            </div>
            <div className={`${theme} content-text`}>
                <article>
                    {contentText}
                </article>
                {
                    voteCountText && 
                <h5 className={`${theme} vote-count`}>
                    {attachment?.type === 'poll' ? attachment?.totalVotes : voteCountText + ' ' + language[lang].votes} 
                </h5>
                }
            </div>
            <div className={`${theme} attachment`} >
               {
                attachment?.type === 'image' ?
                <div className="images" ref={imgHolder}>
                    <img 
                        src={attachment?.image[1]?.url} 
                        alt={attachment?.type} 
                        onClick={()=> navigate(`/post/${postId}`)}
                        />
                </div>
                 : 
                attachment?.type === 'multi_image' ? 
                <div className="images" ref={imgHolder}>
                    {
                        attachment?.image?.map((scr,i)=>(
                            <div className="img-holder" >
                                <img 
                                    key={scr[1]?.url} 
                                    src={scr[3]?.url} 
                                    alt="post" 
                                    onClick={()=> navigate(`/post/${postId}`)}
                                   />
                                <span className="albu"><PermMediaOutlinedIcon /></span>
                               { attachment?.image?.length - 1 !== i && 
                                 <button onClick={next}  className="next icon"><ArrowForwardIosOutlinedIcon /></button>
                               }
                               {
                                    i !== 0 && 
                                    <button onClick={prev} className="prev icon"><ArrowBackIosNewOutlinedIcon/></button>
                               }
                            </div>
                        ))
                    }
                    
                </div> :
                attachment?.type === 'poll' ?
                  <Choices /> :
                attachment?.type === 'video' && 
                 <div className={`${theme} videos search`}>
                    <VideoCard
                        data={attachment} 
                        renderFrom={'search'} 
                    />
                 </div>

               }
            </div>
            <div className={`${theme} stistisic`}>
                <div className={`${theme} like`}>
                    <ThumbUpOutlinedIcon />
                    <h5>{voteCountText}</h5>
                </div>
                <div className={`${theme} dislike`}>
                    <ThumbDownOffAltOutlinedIcon />
                </div>
                {
                    replyCount && 
                    <div className={`${theme} comment`} 
                        onClick={()=> navigate(`/post/${postId}`)}>
                        <CommentOutlinedIcon />
                        <h5>{replyCount}</h5>
                    </div>
                }
            </div>
        </div>
    )
};

export default PostCard;
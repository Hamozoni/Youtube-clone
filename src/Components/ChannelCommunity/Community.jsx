import { Link } from "react-router-dom";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { useRef, useState } from "react";

import Videos from '../Videos/Videos';


const Community = ({community})=>{
    
    const [playingVideoId,setPlayingVideoId] = useState('');

    const { authorChannelId,
            authorThumbnail = null,
            thumbnail = null,
            authorText,
            publishedTimeText,
            contentText,
            attachment = {type: "none"},
            voteCountText,
            replyCount
        } = community;

const [isCkecked,setIsCkecked] = useState(null)

    const Choices = ()=>{
        return (
            <div className="choices">
                 {
                    attachment?.choices?.map((choice,i)=>(
                        <div className="choice"
                            onClick={()=> {
                                if(isCkecked === i){
                                    setIsCkecked(null)
                                }else {
                                    setIsCkecked(i)
                                }
                            }}
                        >
                            <span className={isCkecked != i &&  "not-check"} >
                                {
                                    isCkecked === i && <CheckCircleIcon/>
                                }
                            </span>
                            <div className="choi-box">
                                <h4 className="name">
                                     { choice}
                                </h4>
                                <h4 className="percentage">

                                </h4>
                                <div className="percentage-progres"></div>
                            </div>
                        </div>
                    ))
                 }
            </div>
        )
    }

    const imgHolder = useRef(null);

    const next = ()=>{
        imgHolder.current.scrollBy({
            top: 0,
            left: 100,
            behavior: "smooth",
          });
    }
    const prev = ()=>{
        imgHolder.current.scrollBy({
            top: 0,
            left: -100,
            behavior: "smooth",
          });
    }

    return (
        <div className="community">
            <div className="auther">
                <Link to={`channels/${authorChannelId}`} className="auth-img">
                    <img src={authorThumbnail[1]?.url || thumbnail[1]?.url} alt="auther" />
                </Link>
                <section>
                    <div className="auth-n-publish">
                        <h4 className="name"> {authorText} </h4>
                        <span>{publishedTimeText}</span>
                    </div>
                    <article>
                        {contentText}
                    </article>
                </section>
            </div>

            <div className="attachment">
               {
                attachment?.type === 'image' ?
                <div className="images" ref={imgHolder}>
                    <img src={attachment?.image[1]?.url} alt={attachment?.type} />
                </div>
                 : 
                attachment?.type === 'multi_image' ? 
                <div className="images" ref={imgHolder}>
                    {
                        attachment?.image?.map((scr,i)=>(
                            <div className="img-holder">
                                <img key={scr[1]?.url} src={scr[3]?.url} alt="post"  />
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
                 <div className="videos search">
                    <Videos
                        data={attachment} 
                        renderFrom={'search'} 
                        playingVideoId={playingVideoId}
                        setPlayingVideoId={setPlayingVideoId}
                    />
                 </div>

               }
            </div>
            <div className="stistisic">
                <div className="like">
                    <ThumbUpOutlinedIcon />
                    <h5>{voteCountText}</h5>
                </div>
                <div className="dislike">
                    <ThumbDownOffAltOutlinedIcon />
                </div>
                <div className="comment">
                    <CommentOutlinedIcon />
                    <h5>{replyCount}</h5>
                </div>
            </div>
        </div>
    )
};

export default Community;
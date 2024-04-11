import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from '@mui/icons-material/Close';
// import ClearIcon from '@mui/icons-material/Clear';

import ReactPlayer from "react-player";

import "./PlayingShortCard.scss";

import { statesContext } from "../../Contexts/statesContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Comments from "../Comments/Comments";

const PlayShortCard = ({ active, short,isActivePendding}) => {

  const navgate = useNavigate();

  const { theme, staticData } = useContext(statesContext);
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  useEffect(() => {
    setIsCommentOpen(false);
  }, [short]);

  const li_class_names = `t-color-${theme}`;
  const icon_class_names = `back-hov-c-${theme}-1 border-c-${theme}-2`;

  return (
    <div className='short-v-container' id={short?.videoId}>
      <div className='short-v-player'>
        <section className='short-video'>
          <h4 className="sh-v-title">
             {short?.title?.length > 30 ? `${short?.title?.slice(0, 30)}...` : short?.title}
            </h4>
          { active ? 
              <ReactPlayer 
                    url={`hppts://www.youtube.com/watch?v=${short?.videoId}`} 
                    className="short-player" controls playing
                  /> 
              : 
                <img 
                    src={short?.thumbnail && short?.thumbnail[0]?.url} 
                    alt={short?.title} 
                    className="short-player" 
                  />
          }
        </section>
        <ul className={`${theme} ${isCommentOpen ? 'comment' : ''} sh-links-comment`}>
          <li className={li_class_names}>
            <ThumbUpIcon className={icon_class_names } />
            <h5> {(active && !isActivePendding) ? short?.likeCountText : staticData.like} </h5>
          </li>
          <li className={li_class_names}>
            <ThumbDownIcon className={icon_class_names }/>
            <h5> {staticData.dislike} </h5>
          </li>
          <li onClick={() => setIsCommentOpen(!isCommentOpen)} className={li_class_names}>
            <CommentIcon className={icon_class_names }/>
            <h5>{(active && !isActivePendding) ? short?.commentCount : staticData?.comments}</h5>
          </li>
          <li className={li_class_names}>
            <ShareIcon className={icon_class_names }/>
            <h5>{staticData.share}</h5>
          </li>
          <li>
            <MoreVertIcon className={icon_class_names }/>
          </li>
          <li onClick={() => navgate(`/channel/${short?.channelId}`)} className={li_class_names}>
            {
              (active && !isActivePendding) &&
              <img src={short?.channelThumbnail ? short?.channelThumbnail[0]?.url : ''} alt="short" />
            }
          </li>
        </ul>
      </div>
      {isCommentOpen && active ? (
        <>
         <div onClick={()=> setIsCommentOpen(false)} className={`b-g-t-${theme} c-overlay`}>
          <CloseIcon className={`${li_class_names} ${icon_class_names}`}/>
         </div>
        <div className={`shorts-comments ${theme}`}>
          <Comments id={short?.videoId} fetchQuery="comments" />
        </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default PlayShortCard;

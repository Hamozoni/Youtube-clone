import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import ClearIcon from '@mui/icons-material/Clear';

import ReactPlayer from "react-player";

import "./PlayingShortCard.scss";

import { statesContext } from "../../Contexts/statesContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Comments from "../Comments/Comments";

const PlayShortCard = ({ active, short,activeShort,isActivePendding}) => {

  const navgate = useNavigate();

  const { theme, staticData } = useContext(statesContext);
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  useEffect(() => {
    setIsCommentOpen(false);
  }, [short]);

  return (
    <div className={`${theme} short-v-container`} id={short?.videoId}>
      <div className={`${theme} short-v-player`}>
        <section className={`${theme} short-video`}>
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
        <ul className={`${theme} sh-links-comment`}>
          <li>
            <ThumbUpIcon />
            <h5> {(active && !isActivePendding) ? activeShort?.likeCountText : staticData.like} </h5>
          </li>
          <li>
            <ThumbDownIcon />
            <h5> {staticData.dislike} </h5>
          </li>
          <li onClick={() => setIsCommentOpen(!isCommentOpen)}>
            <CommentIcon />
            <h5>{(active && !isActivePendding) ? activeShort?.commentCount : staticData?.comments}</h5>
          </li>
          <li>
            <ShareIcon />
            <h5>{staticData.share}</h5>
          </li>
          <li>
            <MoreVertIcon />
          </li>
          <li onClick={() => navgate(`/channel/${short?.channelId}`)}>
            {
              (active && !isActivePendding) &&
              <img src={activeShort?.channelThumbnail ? activeShort?.channelThumbnail[0]?.url : ''} alt="short" />
            }
          </li>
        </ul>
      </div>
      {isCommentOpen && active ? (
        <div className={`shorts-comments ${theme}`}>
          <Comments id={short?.videoId} fetchQuery="comments" />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default PlayShortCard;

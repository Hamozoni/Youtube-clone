import { Link } from "react-router-dom";
import { useContext } from "react";

import "./Comment.scss";

import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";

import { statesContext } from "../../Contexts/statesContext";

const Comments = ({ comment }) => {
  const { theme, staticData } = useContext(statesContext);
  const { authorChannelId, authorThumbnail, authorText, publishedTimeText, textDisplay, likesCount, replyCount } = comment;

  return (
    <div className='comm-container'>
      <div className='comment-box'>
        <Link to={`/channel/${authorChannelId}`}>
          <img className="auther-img" src={authorThumbnail[0]?.url} alt="img" />
        </Link>
        <div className={`border-c-${theme}-2 auther-desc`}>
          <h4 className={`t-color-${theme} auth-name`}>{authorText}</h4>
          <span className={`t-color-${theme}-3 time`}>{publishedTimeText}</span>
          <p className={`t-color-${theme}-1 comment`}>{textDisplay}</p>
          <div className="like-dislike-btn">
            <button className={`t-color-${theme}-2`}>
              <ThumbUpAltOutlinedIcon />
              {likesCount}
            </button>
            <button className={`t-color-${theme}-2`}>
              <ThumbDownOffAltOutlinedIcon />
            </button>
            {replyCount > 0 && (
              <span className={`t-color-${theme}-1 replies`}>
                {replyCount} {staticData?.replies}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;

import { Link, useNavigate } from "react-router-dom";
import { useContext, useRef, useState } from "react";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import PermMediaOutlinedIcon from "@mui/icons-material/PermMediaOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";

import VideoCard from "../VideoCard/VideoCard";

import "./CommunityCard.scss";
import { statesContext } from "../../Contexts/statesContext";

const CommunityCard = ({ community }) => {
  const { theme, staticData, lang } = useContext(statesContext);

  const navigate = useNavigate();

  const { authorChannelId, postId, authorThumbnail = null, thumbnail = null, authorText, publishedTimeText, contentText, attachment = { type: "none" }, voteCountText = null, replyCount } = community;

  const [isCkecked, setIsCkecked] = useState(null);

  const Choices = () => {
    return (
      <div className={`${theme} choices`}>
        {attachment?.choices?.map((choice, i) => (
          <div
            className={`${theme} ${isCkecked === i && "active"} choice`}
            onClick={() => {
              if (isCkecked === i) {
                setIsCkecked(null);
              } else {
                setIsCkecked(i);
              }
            }}
          >
            <span className={isCkecked !== i && "not-check"}>{isCkecked === i && <CheckCircleIcon />}</span>
            <div className={`${theme} choi-box`}>
              <h4 className={`${theme} name`}>{choice}</h4>
              <h4 className={`${theme} percentage`}></h4>
              {isCkecked !== null && <div style={{ width: `${Math.random().toFixed(2) * 100}%` }} className={`${theme} ${isCkecked === i && "active"} percentage-progres`}></div>}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const imgHolder = useRef(null);

  const scrollLeft = (dir) => {
    imgHolder.current.scrollBy({
      top: 0,
      left: dir + imgHolder.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const next = () => {
    if (lang === "ar") {
      scrollLeft("-");
    } else {
      scrollLeft("+");
    }
  };

  const prev = () => {
    if (lang === "ar") {
      scrollLeft("+");
    } else {
      scrollLeft("-");
    }
  };

  const btn_class = `b-g-t-${theme} border-c-${theme}-3 t-color-${theme} back-hov-c-${theme}-2`

  return (
    <div className={`border-c-${theme}-4 back-color-${theme}-1 community`}>
      <div className='auther'>
        <Link to={`/channel/${authorChannelId}/home`} className="auth-img">
          <img src={authorThumbnail[0]?.url || thumbnail[0]?.url} alt="auther" />
        </Link>
        <section>
          <div className='auth-n-publish'>
            <h4 className={`t-color-${theme} name`}> {authorText} </h4>
            <span className={`t-color-${theme}-3`}>{publishedTimeText}</span>
          </div>
        </section>
      </div>
      <div className={`t-color-${theme} content-text`}>
        <article>{contentText}</article>
        {voteCountText && 
              <h5 className={`${theme} vote-count`}>
                  {attachment?.type === "poll" ? attachment?.totalVotes : voteCountText + " " + staticData.votes}
              </h5>}
      </div>
      <div className='attachment'>
        {attachment?.type === "image" ? (
          <div className="images" ref={imgHolder}>
            <img src={attachment?.image[1]?.url} alt={attachment?.type} onClick={() => navigate(`/community/${postId}`)} />
          </div>
        ) : attachment?.type === "multi_image" ? (
          <div className="images" ref={imgHolder}>
            {attachment?.image?.map((scr, i) => (
              <div className="img-holder">
                <img key={scr[1]?.url} src={scr[3]?.url} alt="post" onClick={() => navigate(`/community/${postId}`)} />
                <span className={`b-g-t-${theme} t-color-${theme} albu`}>
                  <PermMediaOutlinedIcon />
                </span>
                {attachment?.image?.length - 1 !== i && (
                  <button onClick={next} className={`${btn_class} next icon`}>
                    <ArrowForwardIosOutlinedIcon />
                  </button>
                )}
                {i !== 0 && (
                  <button onClick={prev} className={`${btn_class} prev icon`}>
                    <ArrowBackIosNewOutlinedIcon />
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : attachment?.type === "poll" ? (
          <Choices />
        ) : (
          attachment?.type === "video" && (
            <div className='videos search'>
              <VideoCard data={attachment} renderFrom={"search"} />
            </div>
          )
        )}
      </div>
      <div className='stistisic'>
        <div className={`t-color-${theme}-2 like`}>
          <ThumbUpOutlinedIcon />
          <h5>{voteCountText}</h5>
        </div>
        <div className={`t-color-${theme}-2  dislike`}>
          <ThumbDownOffAltOutlinedIcon />
        </div>
        {replyCount && (
          <div className={`t-color-${theme}-2  comment`} onClick={() => navigate(`/community/${postId}`)}>
            <CommentOutlinedIcon />
            <h5>{replyCount}</h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityCard;

import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./VideoCard.scss";

import { ternViewsTo } from "../../Hooks/Constans";
import { statesContext } from "../../Contexts/statesContext";

import SensorsRoundedIcon from "@mui/icons-material/SensorsRounded";
import ReactPlayer from "react-player";

const Videos = ({ data: video}) => {

  const navgate = useNavigate();

  const { 
    theme,
    lang, 
    staticData,
    playingVideoId, 
    setPlayingVideoId
   } = useContext(statesContext);

  const handleClick = () => {
    navgate(video?.videoId && `/watch/${video?.videoId}`);
  };

  return (
    <div 
        className='video-card' 
        onMouseOver={() => setPlayingVideoId(video.videoId)} 
        onMouseLeave={() => setPlayingVideoId("")} 
        >
        <div onClick={handleClick} className="video-img">
          {
              playingVideoId === video.videoId ? (
                  <>
                    <ReactPlayer 
                      url={`hppts://www.youtube.com/watch?v=${video?.videoId}?autoPlay=1`} 
                      playing muted className="player absolute" 
                      />
                    <span className="nav-watch absolute" onClick={handleClick}></span>
                  </>
              ) 
              : 
              (
                <span 
                    style={lang === "en" ? { right: "5px" } : { left: "5px" }} 
                    className={video?.lengthText === "" || video?.lengthText?.toLowerCase() === "live" ? "live" : ""}
                    >
                    {
                        video?.lengthText === "" || video?.lengthText?.toLowerCase() === "live" ? 
                        (
                          <div className="live">
                            {" "}
                            {staticData?.live} <SensorsRoundedIcon />{" "}
                          </div>
                        ) : 
                        (
                           video?.lengthText
                        )
                    }
                </span>
              )
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
              {
                video.authorThumbnail?.length ? 
                  <Link 
                      to={video?.channelId && `/channel/${video?.channelId}/home`} 
                      className="img"
                      >
                      <img src={video?.authorThumbnail[0]?.url} alt="channel" />
                  </Link>
                :''
              }
              {
                video.channelThumbnail?.length &&
                <Link to={video?.channelId && `/channel/${video?.channelId}/home`} className="img">
                    <img src={video?.channelThumbnail[0]?.url} alt="" />
                </Link>
              }
              <div className="titles">
                  <Link 
                      className={`t-color-${theme}`} 
                      to={video?.videoId && `/watch/${video?.videoId}`}
                      >
                      <h4 className="video-title">
                          {`${video?.title?.length > 53 ? video?.title.slice(0, 53) + "..." : video?.title}`}
                      </h4>
                  </Link>

                  <Link className={`t-color-${theme}-2`} to={`/channel/${video?.channelId}/home`}>
                    {
                      video?.channelTitle?.lengt &&
                        <h5 className={`${theme} chanel-title`}>
                          {video?.channelTitle?.length > 20 ? `${video?.channelTitle?.slice(0, 20)}...` : video?.channelTitle}
                        </h5> 
                    }
                  </Link>
                  <div className={`t-color-${theme}-4 stats`}>
                      <span className={`${theme} views-count moment`}>
                        {ternViewsTo(video?.viewCount)} {staticData.views}
                      </span>
                      <h5 
                          className={`${theme} moment`}
                          >{video?.publishedTimeText || video?.publishedText}
                      </h5>
                  </div>
                  <div className={`t-color-${theme}-2 video-desc`}>
                      <p className="desc-content">
                          {video?.description}
                      </p>
                  </div>
              </div>
            </div>
        </div>
    </div>
  );
};

export default Videos;

import "./PlayList.scss";
import { Link, useNavigate } from "react-router-dom";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import { statesContext } from "../../Contexts/statesContext";
import { useContext } from "react";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";

const Playlist = ({ playlist }) => {
  const { theme, staticData,lang, dispatch } = useContext(statesContext);
  const { videoId, playlistId, thumbnail, channelTitle, videoCount, title, publishedTimeText, channelId, videos } = playlist;

  const navgate = useNavigate();

  const handlNavgate = (e) => {
    if (e.target.nodeName !== "A") {
      dispatch({ type: "add-to-history", payload: playlist });
      navgate(`/watch/${videoId}/list/${playlistId}/1`);
    }
  };

  return (
    <div className='playlist-card' onClick={handlNavgate}>
      <div className="playlist-img">
        <div className="p-img">
          <img src={thumbnail[1]?.url || thumbnail[0]?.url} alt={channelTitle} />
        </div>
        <div className="more-videos">
          <img src={thumbnail[1]?.url || thumbnail[0]?.url} alt={channelTitle} />
        </div>
        <section className="count" style={lang === "en" ? { right: "10px" } : { left: "10px" }}>
          <PlaylistPlayIcon />
          <h5> {videoCount} </h5>
        </section>
        <section className="play-all absolute">
          <PlayArrowRoundedIcon />
          {staticData?.playAll}
        </section>
      </div>
      <div className={`t-color-${theme}  p-t-box`}>
        <h4 className='p-l-title'>
            {title?.length > 53 ? title.slice(0, 53) + "..." : title}
        </h4>
         <h5 className='type'>
             {publishedTimeText}
         </h5>
        {channelTitle && (
          <Link to={`/channel/${channelId}`} className={`t-color-${theme}-3 type`}>
            {channelTitle}
          </Link>
        )}
        <div className="first-tow-video">
          {videos?.map((video) => (
            <section className={`t-color-${theme}-3 details`}>
              <h5>{video?.title}</h5>
              <h5>. {video?.lengthText}</h5>
            </section>
          ))}
          <Link to={`/watch/${videoId}/list/${playlistId}/1`} className={`t-color-${theme}-3`}>
              {staticData?.viewAll}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Playlist;

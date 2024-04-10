import { useNavigate } from "react-router-dom";
import { statesContext } from "../../Contexts/statesContext";
import { useContext } from "react";

import "./ShortsCard.scss";
import ReactPlayer from "react-player";

const ShortCard = ({ short}) => {
  const { theme,  playingVideoId, setPlayingVideoId, dispatch } = useContext(statesContext);

  const navgate = useNavigate();

  const clickHandler = (id) => {
    dispatch({ type: "add-to-history", payload: short });
    navgate(`/shorts?id=${id}`);
  };

  return (
    <div 
        className="short-card" 
        onClick={()=>clickHandler(short?.videoId)} 
        onMouseOver={() => setPlayingVideoId(short?.videoId)} 
        onMouseLeave={() => setPlayingVideoId("")} 
        onTouchEnd={() => setPlayingVideoId(short?.videoId)}
        >
      <div className="short-img">
        {short?.thumbnail ? <img src={short?.thumbnail[0]?.url} alt={"channel"} /> : <div></div>}
        {playingVideoId === short?.videoId && <ReactPlayer className="short-player absolute" url={`hppts://www.youtube.com/watch?v=${short?.videoId}?autoPlay=1`} playing muted />}
        <span className="absolute short-layout"></span>
      </div>
      <div className='short-desc'>
        <h4 className={`t-color-${theme} short-title`}>
           {short?.title?.length > 30 ? `${short?.title.slice(0, 30)}...` : short?.title}
        </h4>
        <h6 className={`t-color-${theme}-3 sh-viwes`}>
           {short?.viewCountText}
        </h6>
      </div>
    </div>
  );
};

export default ShortCard;

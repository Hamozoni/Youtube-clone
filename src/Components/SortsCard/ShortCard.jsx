import { useNavigate } from 'react-router-dom';
import { statesContext } from '../../Contexts/statesContext';
import { useContext } from 'react';

import './ShortsCard.scss';
import ReactPlayer from 'react-player';

const ShortCard = ({short,shorts})=> {

    const { theme, setShorts,playingVideoId, setPlayingVideoId } = useContext(statesContext);

    const navgate = useNavigate();

    const clickHandler = ()=> {
         
        setShorts(shorts.map((short)=>{
          if('thumbnail' in short){
            return short
          } else {
            return;
          }
        }));

        navgate(`/short/${short?.videoId}`)
    }

    return (
        <div 
            className='short-card'
            onClick={clickHandler}
            onMouseOver={()=> setPlayingVideoId(short?.videoId)}
            onMouseLeave={()=> setPlayingVideoId('')}
            onTouchEnd={()=> setPlayingVideoId(short?.videoId)}
        >
            <div className="short-img">
           { short?.thumbnail ?
            <img 
                src={short?.thumbnail[0]?.url} 
                alt={'channel'}
            />: <div></div>}
              {
                playingVideoId === short?.videoId && 
                <ReactPlayer 
                    className='short-player absolute' 
                    url={`hppts://www.youtube.com/watch?v=${short?.videoId}?autoPlay=1`} 
                    playing
                    muted
                />

              }

            </div>
            <div className="short-desc">
                <h4 
                    className={`${theme} short-title`} 
                    >
                    { short?.title?.length > 30 ? `${short?.title.slice(0,30)}...`: short?.title }
                </h4>
                <h6 
                    className={`${theme} sh-viwes`} 
                    >
                    {short?.viewCountText}
                </h6>
            </div>
        </div>
    )
}

export default ShortCard;
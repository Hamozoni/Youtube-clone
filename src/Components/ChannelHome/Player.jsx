import  ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import { statesContext } from '../../Contexts/statesContext';
import { language } from '../../Utils/language';

import './Player.scss';
import { useContext } from 'react';

const Player = ({data})=>{
    const {description, publishedTimeText, videoId, title,viewCount} = data;

    const {lang,theme} = useContext(statesContext);
    const {views} = language[lang];
    return (
        <div className={`${theme} ch-home-player`}>
             <ReactPlayer 
                url={`hppts://www.youtube.com/watch?v=${videoId}?autoplay=1&mute=0?`}
                className='player'
                controls
                playing
            />
            <section className={`${theme} player-desc`}>
                <h4 className={`${theme} pl-title`}>
                    <Link to={`/video/${videoId }`} >
                        {title}
                    </Link>
                </h4>
                <div className={`${theme} time-views`}>
                    <span> {`${Number(viewCount)?.toLocaleString()} ${views}`}</span>
                    <span> {publishedTimeText}</span>
                </div>
                <aside>
                    {description}
                </aside>
            </section>
        </div>
        
    )
};

export default Player;
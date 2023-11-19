import  ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import { isThemeDark } from '../../Contexts/Theme';
import { language } from '../../Utils/language';

import './Player.scss';
import { useContext } from 'react';

const Player = ({data})=>{
    const {description, publishedTimeText, videoId, title,viewCount} = data;

    const {lang} = useContext(isThemeDark);
    const {views} = language[lang];
    return (
        <div className="ch-home-player">
             <ReactPlayer 
                url={`hppts://www.youtube.com/watch?v=${videoId}?autoplay=1&mute=0?`}
                className='player'
                controls
                playing
            />
            <section className="player-desc">
                <h4 className='pl-title'>
                    <Link to={`/video/${videoId }`} >
                        {title}
                    </Link>
                </h4>
                <div className="time-views">
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
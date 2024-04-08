import  ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';

import { statesContext } from '../../../../Contexts/statesContext';

import './Player.scss';
import { useContext } from 'react';

const Player = ({data})=>{

    const {description, publishedTimeText, videoId, title,viewCount} = data;
    const {theme,staticData} = useContext(statesContext);
    const {views} = staticData;

    return (
        <div className='ch-home-player'>
             <ReactPlayer 
                url={`hppts://www.youtube.com/watch?v=${videoId}?autoplay=1&mute=0?`}
                className='player'
                controls
                playing
                width='100%'
                height='unset'
            />
            <section className='player-desc'>
                <h4 className='pl-title'>
                    <Link to={`/video/${videoId }`} className={`t-color-${theme}`} >
                        {title}
                    </Link>
                </h4>
                <div className={`t-color-${theme}-3 time-views`}>
                    <span> {`${Number(viewCount)?.toLocaleString()} ${views}`}</span>
                    <span> {publishedTimeText}</span>
                </div>
                <aside className={`t-color-${theme}-1`}>
                    {description}
                </aside>
            </section>
        </div>
        
    )
};

export default Player;
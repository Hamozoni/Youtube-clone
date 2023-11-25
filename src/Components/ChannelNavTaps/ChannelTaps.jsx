import { useContext } from "react";
import { statesContext } from "../../Contexts/statesContext";
import { language } from "../../Utils/language";

import './ChannelTaps.scss';


const ChannelTaps = ({channelContent,setChannelContent,setIsAboutChannelOpen})=>{

    const {  lang, theme } = useContext(statesContext);

    return (
        <nav className={`${theme} channel-nav`} >
            <ul className={`${theme} nav`} >
                <li 
                    className={channelContent === 'home'? 'active': ''}
                    onClick={()=> setChannelContent('home')}
                    >
                        { language[lang].home }
                </li>
                <li
                    className={channelContent === 'videos' ? 'active': ''}
                    onClick={()=> setChannelContent('videos')}
                    >
                        { language[lang].videos }
                </li>
                <li 
                    className={channelContent === 'shorts' ? 'active': ''} 
                    onClick={()=> setChannelContent('shorts')}
                    >
                        { language[lang].shorts }
                </li>
                <li
                    className={channelContent === 'live' ? 'active': ''} 
                    onClick={()=> setChannelContent('live')}
                    >
                        { language[lang].live }
                </li>
                <li
                    className={channelContent === 'playlists' ? 'active': ''}
                    onClick={()=> setChannelContent('playlists')}
                    >
                        {language[lang].playlists}
                </li>
                <li
                    className={channelContent === 'community' ? 'active': ''}
                    onClick={()=> setChannelContent('community')}
                    >
                        {language[lang].community}
                </li>
                <li
                    onClick={()=> setIsAboutChannelOpen(true)}
                    >
                        {language[lang].about}
                </li>
            </ul>
       </nav>
    )
};

export default ChannelTaps;
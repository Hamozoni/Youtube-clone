import { useContext } from "react";
import { statesContext } from "../../Contexts/statesContext";
import { language } from "../../Utils/language";

import './ChannelTaps.scss';
import { useNavigate, useParams} from "react-router-dom";


const ChannelTaps = ({setIsAboutChannelOpen})=>{

    const {  lang, theme } = useContext(statesContext);
    const {id, section } = useParams();


    const navigate = useNavigate();

    const handleNavigate = (param)=>{
        if(param === "home" || param === "community" ){
            navigate(`/channels/${id}/${param}`);
        }else if (param === "playlists" ){
            navigate(`/channels/${id}/${param}?sort_by=date_added`);
        }else {
            navigate(`/channels/${id}/${param}?sort_by=newest`);
        }
    }

    return (
        <nav className={`${theme} channel-nav`} >
            <ul className={`${theme} nav`} >
                <li 
                    className={section === 'home' || section === undefined ? 'active': ''}
                    onClick={()=> handleNavigate('home')}
                    >
                        { language[lang].home }
                </li>
                <li
                    className={section === 'videos' ? 'active': ''}
                    onClick={()=> handleNavigate('videos')}
                    >
                        { language[lang].videos }
                </li>
                <li 
                    className={section === 'shorts' ? 'active': ''} 
                    onClick={()=> handleNavigate('shorts')}
                    >
                        { language[lang].shorts }
                </li>
                <li
                    className={section === 'liveStreams' ? 'active': ''} 
                    onClick={()=> handleNavigate('liveStreams')}
                    >
                        { language[lang].live }
                </li>
                <li
                    className={section === 'playlists' ? 'active': ''}
                    onClick={()=> handleNavigate('playlists')}
                    >
                        {language[lang].playlists}
                </li>
                <li
                    className={section === 'community' ? 'active': ''}
                    onClick={()=> handleNavigate('community')}
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
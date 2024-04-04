import { NavLink } from "react-router-dom";
import { useContext } from "react";
import Logo from "../Logo/Logo";

import './style.scss';
//Icons
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import RestoreOutlinedIcon from '@mui/icons-material/RestoreOutlined';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';
import AudiotrackOutlinedIcon from '@mui/icons-material/AudiotrackOutlined';
import SensorsOutlinedIcon from '@mui/icons-material/SensorsOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import OutlinedFlagTwoToneIcon from '@mui/icons-material/OutlinedFlagTwoTone';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

import { language } from "../../Utils/language";
import { statesContext } from "../../Contexts/statesContext";
import SideNavbarSmall from "./SideNavSmall";


const SideNavbar = ()=> {

    const { theme, lang, setIsSideNavbarOpen } = useContext(statesContext);

    const { 
            labrary, 
            history, 
            yourVideos, 
            watchLater, 
            likedVideos, 
            trending,
            music,
            live,
            gaming,
            sports,
            reportHistory,
            help,
            sendFeedback
        } = language[lang];

    return (
        <nav 
            className={`b-g-t-${theme} side-navbar`}
            onClick={()=> setIsSideNavbarOpen(false)}
            >
            <header className={`back-color-${theme} nav-header`}>
                 <Logo  /> 
            </header>
            <div className={`back-color-${theme} nav-container`}>
                <SideNavbarSmall />
                <h3 className={`t-color-${theme} title`}>
                    you
                </h3>
                <div className={`border-c-${theme}-1 library-history nav-icons`}>
                    <NavLink 
                        to='/labrary' 
                        className={`t-color-${theme}-2 back-hov-c-${theme}-1 back-act-c-${theme}-2`}
                        >
                        <VideoLibraryOutlinedIcon />
                        <h3 >{labrary}</h3>
                    </NavLink >
                    <NavLink  
                        to='/history' 
                        className={`t-color-${theme}-2 back-hov-c-${theme}-1 back-act-c-${theme}-2`}
                        >
                        <RestoreOutlinedIcon />
                        <h3>{history}</h3>
                    </NavLink >
                    <NavLink  
                        to='/yourVideos' 
                        className={`t-color-${theme}-2 back-hov-c-${theme}-1 back-act-c-${theme}-2 `}
                        >
                        <OndemandVideoOutlinedIcon />
                        <h3> {yourVideos }</h3>
                    </NavLink >
                    <NavLink 
                        to='/watchLater' 
                        className={`t-color-${theme}-2 back-hov-c-${theme}-1 back-act-c-${theme}-2`}
                        >
                        <WatchLaterOutlinedIcon />
                        <h3>{ watchLater }</h3>
                    </NavLink >
                    <NavLink  
                        to='/likedVideos'
                        className={`t-color-${theme}-2 back-hov-c-${theme}-1 back-act-c-${theme}-2`}
                        >
                        <ThumbUpOutlinedIcon />
                        <h3> {likedVideos} </h3>
                    </NavLink >
                </div>
                <h3 className={`t-color-${theme} title`}>
                    explore
                </h3>
                <div className={`border-c-${theme}-1 explor nav-icons`}>
                     <NavLink 
                        to='/explore?type=now' 
                        className={`t-color-${theme}-2 back-hov-c-${theme}-1 back-act-c-${theme}-2`}
                        >
                        <WhatshotOutlinedIcon />
                        <h3>{trending}</h3>
                    </NavLink >
                    <NavLink  
                        to='/explore?type=music' 
                        className={`t-color-${theme}-2 back-hov-c-${theme}-1 back-act-c-${theme}-2`}
                        >
                        <AudiotrackOutlinedIcon />
                        <h3>{music}</h3>
                    </NavLink >
                    <NavLink 
                        to='/explore?type=movies' 
                        className={`t-color-${theme}-2 back-hov-c-${theme}-1 back-act-c-${theme}-2`}
                        >
                        <SensorsOutlinedIcon />
                        <h3> {live} </h3>
                    </NavLink >
                    <NavLink  
                        to='/explore?type=games' 
                        className={`t-color-${theme}-2 back-hov-c-${theme}-1 back-act-c-${theme}-2`}
                        >
                        <SportsEsportsOutlinedIcon />
                        <h3> {gaming}</h3>
                    </NavLink >
                    <NavLink  
                        to='/explore?type=sports' 
                        className={`t-color-${theme}-2 back-hov-c-${theme}-1 back-act-c-${theme}-2`}
                        >
                        < EmojiEventsOutlinedIcon />
                        <h3>{ sports} </h3>
                    </NavLink >
                </div>
                <h3 className={`t-color-${theme} title`}>
                    more from myh
                </h3>
                <div className={`border-c-${theme}-1 more-from-myh nav-icons`}>
                    <a 
                        href='music.maiyahia.com' 
                        className={`t-color-${theme}-2 back-hov-c-${theme}-1 back-act-c-${theme}-2`}
                        >
                        <TravelExploreIcon />
                        <h3>MYH Music</h3>
                    </a >
                    <a 
                       href='travel.maiyahia.com' 
                       className={`t-color-${theme}-2 back-hov-c-${theme}-1 back-act-c-${theme}-2`}
                       >
                        <TravelExploreIcon />
                        <h3>Travel Advisor</h3>
                    </a >
                </div>
                <div className={`border-c-${theme}-1 sitting-help nav-icons`}>
                    <NavLink 
                        to='/settings' 
                        className={`t-color-${theme}-2 back-hov-c-${theme}-1 back-act-c-${theme}-2`}
                        >
                        <SettingsOutlinedIcon />                    
                        <h3>settings</h3>  
                    </NavLink>
                    <NavLink 
                        to='/reportHistory' 
                        className={`t-color-${theme}-2 back-hov-c-${theme}-1 back-act-c-${theme}-2 `}
                        >
                        <OutlinedFlagTwoToneIcon />                      
                        <h3>{reportHistory}</h3> 
                    </NavLink>
                    <NavLink 
                        to='/help' 
                        className={`t-color-${theme}-2 back-hov-c-${theme}-1 back-act-c-${theme}-2`}
                        >
                        <HelpOutlineOutlinedIcon />                      
                        <h3>{help}</h3> 
                    </NavLink>
                    <NavLink 
                        to='/sendFeedback' 
                        className={`t-color-${theme}-2 back-hov-c-${theme}-1 back-act-c-${theme}-2`}
                        >
                        <AnnouncementOutlinedIcon />                     
                        <h3>{sendFeedback}</h3>  
                    </NavLink>
                </div>
                <footer className={`${theme} navbar-footer`}>

                </footer>
            </div>
        </nav>
    );
};

export default SideNavbar;

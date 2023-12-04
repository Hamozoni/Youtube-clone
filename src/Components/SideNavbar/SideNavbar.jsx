import { Link } from "react-router-dom";
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
import { useContext } from "react";
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
            className={`${theme} side-navbar`}
            onClick={()=> setIsSideNavbarOpen(false)}
            >
            <header className={`${theme} nav-header`}>
                 <Logo  /> 
            </header>
            <div className={`${theme} nav-container`}>
                <SideNavbarSmall />
                <h3 className="title">you</h3>
                <div className={`${theme} library-history nav-icons`}>
                    <Link to='/'>
                        <VideoLibraryOutlinedIcon />
                        <h3>{labrary}</h3>
                    </Link>
                    <Link to='/'>
                        <RestoreOutlinedIcon />
                        <h3>{history}</h3>
                    </Link>
                    <Link to='/'>
                        <OndemandVideoOutlinedIcon />
                        <h3> {yourVideos }</h3>
                    </Link>
                    <Link to='/'>
                        <WatchLaterOutlinedIcon />
                        <h3>{ watchLater }</h3>
                    </Link>
                    <Link to='/'>
                        <ThumbUpOutlinedIcon />
                        <h3> {likedVideos} </h3>
                    </Link>
                </div>
                <h3 className="title">explore</h3>
                <div className={`${theme} explor nav-icons`}>
                     <Link to='/search/trending'>
                        <WhatshotOutlinedIcon />
                        <h3>{trending}</h3>
                    </Link>
                    <Link to='/search/music'>
                        <AudiotrackOutlinedIcon />
                        <h3>{music}</h3>
                    </Link>
                    <Link to='/search/live'>
                        <SensorsOutlinedIcon />
                        <h3> {live} </h3>
                    </Link>
                    <Link to='/search/gaming'>
                        <SportsEsportsOutlinedIcon />
                        <h3> {gaming}</h3>
                    </Link>
                    <Link to='/search/sports'>
                        < EmojiEventsOutlinedIcon />
                        <h3>{ sports} </h3>
                    </Link>
                </div>
                <h3 className="title">more from myh</h3>
                <div className={`${theme} more-from-myh nav-icons`}>
                    <Link to='/'>
                        <TravelExploreIcon />
                        <h3>MYH Music</h3>
                    </Link>
                    <Link to='/'>
                        <TravelExploreIcon />
                        <h3>Travel Advisor</h3>
                    </Link>
                </div>
                <div className={`${theme} sitting-help nav-icons`}>
                    <Link to='/settings'>
                        <SettingsOutlinedIcon />                    
                        <h3>settings</h3>  
                    </Link>
                    <Link to='/'>
                        <OutlinedFlagTwoToneIcon />                      
                        <h3>{reportHistory}</h3> 
                    </Link>
                    <Link to='/'>
                        <HelpOutlineOutlinedIcon />                      
                        <h3>{help}</h3> 
                    </Link>
                    <Link to='/'>
                        <AnnouncementOutlinedIcon />                     
                        <h3>{sendFeedback}</h3>  
                    </Link>
                </div>
                <footer className={`${theme} navbar-footer`}>

                </footer>
            </div>
        </nav>
    );
};

export default SideNavbar;

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

import { language } from "../../Utils/language";
import { isThemeDark } from "../../Contexts/Theme";
import { useContext } from "react";
import SideNavbarSmall from "./SideNavSmall";


const SideNavbar = ({isSideNavbarOpen,setIsSideNavbarOpen})=> {

    const {lang} = useContext(isThemeDark);

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
        <nav className="side-navbar" onClick={()=> setIsSideNavbarOpen(false)}>
            <header className="nav-header">
                 <Logo isSideNavbarOpen={isSideNavbarOpen} setIsSideNavbarOpen={setIsSideNavbarOpen} /> 
            </header>
            <div className="nav-container">
                <SideNavbarSmall />
                <div className="library-history nav-icons">
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
                <div className="subscriptions nav-icons">
                    <Link to='/'>
                        <h3>{trending}</h3>
                    </Link>
                </div>
                <div className="explor nav-icons">
                     <Link to='/'>
                        <WhatshotOutlinedIcon />
                        <h3>{trending}</h3>
                    </Link>
                    <Link to='/'>
                        <AudiotrackOutlinedIcon />
                        <h3>{music}</h3>
                    </Link>
                    <Link to='/'>
                        <SensorsOutlinedIcon />
                        <h3> {live} </h3>
                    </Link>
                    <Link to='/'>
                        <SportsEsportsOutlinedIcon />
                        <h3> {gaming}</h3>
                    </Link>
                    <Link to='/'>
                        < EmojiEventsOutlinedIcon />
                        <h3>{ sports} </h3>
                    </Link>
                </div>
                <div className="more-from-myh nav-icons">
                    <Link to='/'>
                        <h3>MYH Music</h3>
                    </Link>
                    <Link to='/'>
                        <h3>Travel Advisor</h3>
                    </Link>
                </div>
                <div className="sitting-help nav-icons">
                    <Link to='/'>
                        <SettingsOutlinedIcon />                    
                        <h3>sittings</h3>  
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
                <footer className="navbar-footer">

                </footer>
            </div>
        </nav>
    );
};

export default SideNavbar;

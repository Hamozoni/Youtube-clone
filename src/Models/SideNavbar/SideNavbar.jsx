import { NavLink } from "react-router-dom";
import { useContext } from "react";
import Logo from "../../Components/Logo/Logo";

import "./style.scss";
//Icons
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";
import AudiotrackOutlinedIcon from "@mui/icons-material/AudiotrackOutlined";
import SensorsOutlinedIcon from "@mui/icons-material/SensorsOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import OutlinedFlagTwoToneIcon from "@mui/icons-material/OutlinedFlagTwoTone";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import AnnouncementOutlinedIcon from "@mui/icons-material/AnnouncementOutlined";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

import { statesContext } from "../../Contexts/statesContext";
import SideNavbarSmall from "./SideNavSmall";

const navLinks = [
  {
    name: 'youe',
    data: [
      {
        to: 'labrary',
        icon: VideoLibraryOutlinedIcon
      },
      {
        to: 'history',
        icon: RestoreOutlinedIcon
      },
      {
        to: 'yourVideos',
        icon: OndemandVideoOutlinedIcon
      },
      {
        to: 'watchLater',
        icon: WatchLaterOutlinedIcon
      },
      {
        to: 'likedVideos',
        icon:ThumbUpOutlinedIcon
      }
    ]

  },
  {
    name: 'explore',
    data: [
      {
        to: 'labrary',
        icon: VideoLibraryOutlinedIcon
      },
      {
        to: 'history',
        icon: RestoreOutlinedIcon
      },
      {
        to: 'yourVideos',
        icon: OndemandVideoOutlinedIcon
      },
      {
        to: 'watchLater',
        icon: WatchLaterOutlinedIcon
      },
      {
        to: 'likedVideos',
        icon:ThumbUpOutlinedIcon
      }
    ]
  }
]

const SideNavbar = () => {
  const { theme, staticData, setIsSideNavbarOpen } = useContext(statesContext);

  const { labrary, history, yourVideos, watchLater, likedVideos, trending, music, live, gaming, sports, reportHistory, help, sendFeedback } = staticData;

  const nav_class_names = `t-color-${theme}-2 back-hov-c-${theme}-1 back-act-c-${theme}-2`

  return (
    <nav className={`b-g-t-${theme} side-navbar`} onClick={() => setIsSideNavbarOpen(false)}>
      <header className={`back-color-${theme} nav-header`}>
        <Logo />
      </header>
      <div className={`back-color-${theme} nav-container`}>
        <SideNavbarSmall />
        <h3 className={`t-color-${theme} title`}>you</h3>
        <div className={`border-c-${theme}-1 library-history nav-icons`}>
          <NavLink to="/labrary" className={nav_class_names }>
            <VideoLibraryOutlinedIcon />
            <h3>{labrary}</h3>
          </NavLink>
          <NavLink to="/history" className={nav_class_names }>
            <RestoreOutlinedIcon />
            <h3>{history}</h3>
          </NavLink>
          <NavLink to="/yourVideos" className={nav_class_names }>
            <OndemandVideoOutlinedIcon />
            <h3> {yourVideos}</h3>
          </NavLink>
          <NavLink to="/watchLater" className={nav_class_names }>
            <WatchLaterOutlinedIcon />
            <h3>{watchLater}</h3>
          </NavLink>
          <NavLink to="/likedVideos" className={nav_class_names }>
            <ThumbUpOutlinedIcon />
            <h3> {likedVideos} </h3>
          </NavLink>
        </div>
        <h3 className={`t-color-${theme} title`}>explore</h3>
        <div className={`border-c-${theme}-1 explor nav-icons`}>
          <NavLink to="/explore?type=now" className={nav_class_names }>
            <WhatshotOutlinedIcon />
            <h3>{trending}</h3>
          </NavLink>
          <NavLink to="/explore?type=music" className={nav_class_names }>
            <AudiotrackOutlinedIcon />
            <h3>{music}</h3>
          </NavLink>
          <NavLink to="/explore?type=movies" className={nav_class_names }>
            <SensorsOutlinedIcon />
            <h3> {live} </h3>
          </NavLink>
          <NavLink to="/explore?type=games" className={nav_class_names }>
            <SportsEsportsOutlinedIcon />
            <h3> {gaming}</h3>
          </NavLink>
          <NavLink to="/explore?type=sports" className={nav_class_names }>
            <EmojiEventsOutlinedIcon />
            <h3>{sports} </h3>
          </NavLink>
        </div>
        <h3 className={`t-color-${theme} title`}>more from myh</h3>
        <div className={`border-c-${theme}-1 more-from-myh nav-icons`}>
          <a href="music.maiyahia.com" className={nav_class_names }>
            <TravelExploreIcon />
            <h3>MYH Music</h3>
          </a>
          <a href="travel.maiyahia.com" className={nav_class_names }>
            <TravelExploreIcon />
            <h3>Travel Advisor</h3>
          </a>
        </div>
        <div className={`border-c-${theme}-1 sitting-help nav-icons`}>
          <NavLink to="/settings" className={nav_class_names }>
            <SettingsOutlinedIcon />
            <h3>settings</h3>
          </NavLink>
          <NavLink to="/reportHistory" className={nav_class_names }>
            <OutlinedFlagTwoToneIcon />
            <h3>{reportHistory}</h3>
          </NavLink>
          <NavLink to="/help" className={nav_class_names }>
            <HelpOutlineOutlinedIcon />
            <h3>{help}</h3>
          </NavLink>
          <NavLink to="/sendFeedback" className={nav_class_names }>
            <AnnouncementOutlinedIcon />
            <h3>{sendFeedback}</h3>
          </NavLink>
        </div>
        <footer className={`${theme} navbar-footer`}></footer>
      </div>
    </nav>
  );
};

export default SideNavbar;

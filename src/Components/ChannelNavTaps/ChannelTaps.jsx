import { NavLink } from "react-router-dom";
import { useContext } from "react";

import { statesContext } from "../../Contexts/statesContext";

import "./ChannelTaps.scss";

const channelNavData = [
  {
    en: 'home',
    ar: 'الصفحة الرئيسية'
  },
  {
    en: 'videos',
    ar: 'الصفحة الرئيسية'
  },
  {
    en: 'shorts',
    ar: 'الصفحة الرئيسية'
  },
  {
    en: 'playlists',
    ar: 'الصفحة الرئيسية'
  },
  {
    en: 'liveStreams',
    ar: 'الصفحة الرئيسية'
  },
  {
    en: 'community',
    ar: 'الصفحة الرئيسية'
  }
  
]

const ChannelTaps = ({ tabs, setIsAboutChannelOpen }) => {

  const { staticData, theme,lang } = useContext(statesContext);

  return (
    <nav className={`back-color-${theme} border-c-${theme}-2 channel-nav`}>
      <ul className="nav">
        {
          channelNavData?.map((tap) =>
              <li>
                <NavLink 
                        className={`t-color-${theme}-2 back-before-c-${theme}-7 border-c-${theme}-5`} 
                        to={tap.en}>
                  {tap[lang]}
                </NavLink>
              </li>
          )
        }
        <li 
            className={`t-color-${theme}-2  about`} 
            onClick={() => setIsAboutChannelOpen(true)}
            >
           {staticData.about}
        </li>
      </ul>
    </nav>
  );
};

export default ChannelTaps;

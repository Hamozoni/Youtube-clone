import { NavLink } from "react-router-dom";
import { useContext } from "react";

import { statesContext } from "../../Contexts/statesContext";

import "./ChannelTaps.scss";

const ChannelTaps = ({ tabs, setIsAboutChannelOpen }) => {
  const { staticData, theme } = useContext(statesContext);

  return (
    <nav className={`back-color-${theme} border-c-${theme}-2 channel-nav`}>
      <ul className="nav">
        {tabs?.map((tap) =>

        tap !== 'Search' &&  tap !== 'بحث' ?
              <li>
                <NavLink 
                        className={`t-color-${theme}-2 back-before-c-${theme}-7 border-c-${theme}-5`} 
                        to={`${tap === "Live" ? "liveStreams" : tap.toLowerCase()}`}>
                  {tap}
                </NavLink>
              </li>
            :''
        )}
        <li className={`t-color-${theme}-2  about`} onClick={() => setIsAboutChannelOpen(true)}>
           {staticData.about}
        </li>
      </ul>
    </nav>
  );
};

export default ChannelTaps;

import "./ChannelAbout.scss";
import { statesContext } from "../../Contexts/statesContext";
import { useContext } from "react";

import CloseIcon from "@mui/icons-material/Close";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PublicIcon from "@mui/icons-material/Public";

const ChannelAbout = ({ chanelDetail, setIsAboutChannelOpen }) => {
  const { theme, staticData } = useContext(statesContext);

  return (
    <section
      className={`b-g-t-${theme} channel-about`}
      onClick={(e) => {
        e.stopPropagation();
        setIsAboutChannelOpen(false);
      }}
    >
      <div className={`back-color-${theme}-3 about-container`}>
        <nav className={`t-color-${theme} about-nav`} onClick={() => setIsAboutChannelOpen(false)}>
          <h3 className="about-title">{staticData?.about}</h3>
          <CloseIcon />
        </nav>
        <section className='channel-desc'>
          <h4 className={`t-color-${theme}-2 describtion`}>{chanelDetail?.description}</h4>
          <section className='channel-links'>
            <h3 className={`t-color-${theme}`}> {staticData?.links}</h3>
            {chanelDetail?.links?.map((link) => (
              <div key={link?.link} className={`${theme} link`}>
                <div className='icon'>
                  <img src={link?.favicon[3]?.url} alt="" />
                </div>
                <div className='link-title'>
                  <h6 className={`t-color-${theme}-1`}>{link?.title}</h6>
                  <a href={link?.link} target="_blank" className='link-c'>
                    {link?.link}
                  </a>
                </div>
              </div>
            ))}
          </section>
          <section className='channel-details'>
            <h3 className={`t-color-${theme}`}>channel details</h3>
            <ul className={`t-color-${theme}-2 details`}>
              <li>
                <RecordVoiceOverIcon /> {chanelDetail?.subscriberCountText + " " + staticData?.subscribers}
              </li>
              <li>
                <SmartDisplayOutlinedIcon /> {chanelDetail?.videosCountText}
              </li>
              <li>
                <TrendingUpOutlinedIcon /> {chanelDetail?.viewCountText}
              </li>
              <li>
                <InfoOutlinedIcon /> {chanelDetail?.joinedDateText}
              </li>
              <li>
                <PublicIcon /> {chanelDetail?.country}
              </li>
            </ul>
          </section>
        </section>
      </div>
    </section>
  );
};

export default ChannelAbout;

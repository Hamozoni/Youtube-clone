import './ChannelAbout.scss';
import { language } from '../../Utils/language';
import  { statesContext } from '../../Contexts/statesContext';
import { useContext } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PublicIcon from '@mui/icons-material/Public';


const ChannelAbout = ({chanelDetail,setIsAboutChannelOpen})=> {

    const { lang,theme } = useContext(statesContext);

    return (
         <section className={`${theme} channel-about`} 
                onClick={(e)=>{
                     e.stopPropagation() 
                     setIsAboutChannelOpen(false)}}>
            <div className={`${theme} about-container`}>
                <nav 
                    className={`${theme} about-nav`} 
                    onClick={()=> setIsAboutChannelOpen(false)}
                    >
                    <h3 className="about-title">{language[lang]?.about}</h3>
                    <CloseIcon />
                </nav>
                <section className={`${theme} channel-desc`}>
                    <h4 className={`${theme} describtion`}>
                        {chanelDetail?.description}
                    </h4>
                    <section className={`${theme} channel-links`}>
                        <h3>{language[lang]?.links}</h3>
                        { chanelDetail?.links?.map((link)=>(
                            <div key={link?.link} className={`${theme} link`}>
                                <div className={`${theme} icon`}>
                                    <img src={link?.favicon[3]?.url} alt="" />
                                </div>
                                <div className={`${theme} link-title`}>
                                    <h6>{link?.title}</h6>
                                    <a href={link?.link} target='_blank' > {link?.link}</a>
                                </div>
                            </div>
                        )) 
                        }
                    </section>
                    <section className={`${theme} channel-details`}>
                        <h3>channel details</h3>
                        <ul className={`${theme} details`}>
                            <li> <RecordVoiceOverIcon /> {chanelDetail?.subscriberCountText + " " + language[lang]?.subscribers} </li>
                            <li> <SmartDisplayOutlinedIcon /> {chanelDetail?.videosCountText} </li>
                            <li> <TrendingUpOutlinedIcon /> {chanelDetail?.viewCountText} </li>
                            <li> <InfoOutlinedIcon /> {chanelDetail?.joinedDateText} </li>
                            <li> <PublicIcon /> {chanelDetail?.country} </li>
                        </ul>
                    </section>
                </section>
            </div>
         </section>
    )
}

export default ChannelAbout;
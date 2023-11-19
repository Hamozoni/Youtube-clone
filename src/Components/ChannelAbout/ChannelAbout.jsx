import './ChannelAbout.scss';
import { language } from '../../Utils/language';
import  { isThemeDark } from '../../Contexts/Theme';
import { useContext } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PublicIcon from '@mui/icons-material/Public';
import { Link } from 'react-router-dom';


const ChannelAbout = ({chanelDetail,setIsAboutChannelOpen})=> {

    const { lang } = useContext(isThemeDark);

    return (
         <section className="channel-about" 
                onClick={(e)=>{
                     e.stopPropagation() 
                     setIsAboutChannelOpen(false)}}>
            <div className="about-container">
                <nav className="about-nav" onClick={()=> setIsAboutChannelOpen(false)}>
                    <h3 className="about-title">{language[lang]?.about}</h3>
                    <CloseIcon />
                </nav>
                <section className='channel-desc'>
                    <h4 className="describtion">{chanelDetail?.description}</h4>
                    <section className='channel-links'>
                        <h3>{language[lang]?.links}</h3>
                        { chanelDetail?.links?.map((link)=>(
                            <div key={link?.link} className="link">
                                <div className="icon">
                                    <img src={link?.favicon[3]?.url} alt="" />
                                </div>
                                <div className="link-title">
                                    <h6>{link?.title}</h6>
                                    <Link to={link?.link} target='blank' > {link?.link}</Link>
                                </div>
                            </div>
                        )) 
                        }
                    </section>
                    <section className='channel-details'>
                        <h3>channel details</h3>
                        <ul className="details">
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

{/* <div className="desc-det">
<h5 style={{color: Theme[isDark].primaryColor}}>
     {language[lang].description}
</h5>
<p style={{color: Theme[isDark].lightPrColor}}>
    {about?.snippet?.description}
</p>
</div>
<div className="stats">
<h5 style={{color: Theme[isDark].primaryColor}}>
    {language[lang].stats}
</h5>
<div className="joined" style={{color: Theme[isDark].lightPrColor}}>
    <span>
        {language[lang].joined}
    </span>    
    {new Date( about?.snippet?.publishedAt).toDateString() }
</div>
<div className="views"
    style={{color: Theme[isDark].lightPrColor}}
    >
    {Number(about?.statistics?.viewCount).toLocaleString()}
    <span>{language[lang].views}</span>   
</div>

</div> */}
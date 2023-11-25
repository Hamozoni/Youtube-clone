import { useContext, useState} from 'react';
import { Link } from 'react-router-dom';

import './MainChannelCard.scss';

import channelImageAlt from './6387389.png';

import { Theme } from '../../Utils/Colors';
import { statesContext } from '../../Contexts/statesContext';
import { language } from '../../Utils/language';

import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

const MainChannelCard = ({data,setIsAboutChannelOpen, renderFrom})=> {

    const { theme, lang } = useContext(statesContext);
    const [isSubscribe,setIsSubscribe] = useState(false);

    const onClickHandler = ()=>{ 
        setIsSubscribe(!isSubscribe);
    }

    return (  
            <div className={` ${renderFrom} ${theme} main-chan-card`} >
                <div className="card" >
                    <Link to={`/channels/${data?.channelId}`} className={`${theme} img-l`}>
                        <img 
                            className={`${theme} chan-img`}
                            src={ renderFrom === 'channel' ? data?.avatar[2]?.url :
                                renderFrom === 'watch' ? data?.channelThumbnail[1].url :
                                renderFrom === 'home-channel' || renderFrom === 'search' ? data?.thumbnail[1].url : channelImageAlt
                            } 
                            alt={data?.title} 
                        />
                    </Link>
               </div>
                <div className={`${theme} subscribe`}>
                    <div className={`${theme} subsc-title`}>
                            <Link to={`/channels/${data?.channelId}`} className={`${theme} name-l`}>
                                <h4 className={`${theme} name`} >
                                    {
                                        renderFrom === 'watch' &&  (data?.channelTitle?.length > 15 ? data?.channelTitle?.slice(0,15) + '...'  : data?.channelTitle)
                                    }
                                    { 
                
                                         renderFrom !== 'watch' &&   (data?.title?.length > 15 ?  data?.title?.slice(0,15) + '...' : data?.title)
                
                                    }
                                    {
                                        renderFrom === 'watch' && data?.channelBadges ? <CheckCircleRoundedIcon /> : ""
                                    }
                                   { renderFrom === 'channel' && data?.isVerified  ?  <CheckCircleRoundedIcon /> :""}
                                </h4>
                            </Link>
                            <h5 className={`${theme} subsc`} >
                                {renderFrom === 'channel' && `${data?.channelHandle} . `}
                                { data?.subscriberCountText} 
                                 
                                {renderFrom === 'channel' &&  data?.videosCountText}
                            </h5>
                            {
                                renderFrom === 'channel' && 
                                <p className={`${theme} chan-desc`} onClick={()=> setIsAboutChannelOpen(true)}>
                                    { data?.description?.length > 100 ? data?.description?.slice(0,90) + "..." :  data?.description }
                                </p>
                            }
                        </div>
                        <button
                             className={`${isSubscribe && "subscribed"} ${theme} subsc-btn`} 
                              onClick={onClickHandler}
                        >
                            { isSubscribe &&  <NotificationsNoneOutlinedIcon />}
                            { isSubscribe ?  language[lang].subscribed : language[lang].subscribe}
                            { isSubscribe &&  <KeyboardArrowDownOutlinedIcon />}
                        </button>
                </div>
            </div>
    );
};

export default MainChannelCard;
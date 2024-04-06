import { useContext, useState } from "react";
import { statesContext } from "../../Contexts/statesContext";

import "./ChannelSubscribeBtn.scss";

import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsOffOutlinedIcon from '@mui/icons-material/NotificationsOffOutlined';
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';

import { language } from "../../Utils/language";

const ChannelSubscribeBtn = () => {

    const {theme,lang} = useContext(statesContext);

    const [isSubscribed,setIsSubscribed] = useState(false);
    const [notifationType,setNotifationType] = useState('personalized')
  return (
    <div className={`${isSubscribed ? 'subscribed' : ''} subs-btn`}>
        <button 
            onClick={()=> setIsSubscribed(true)}
            className={`${isSubscribed ? `back-color-${theme}-1 ` : `back-color-${theme}-4 `} t-color-${theme} back-hov-c-${theme}-2 subs-b`}>
            {
                isSubscribed ? 
                <>
                 {
                    notifationType === 'personalized' ? 
                    <NotificationsOutlinedIcon />
                    : notifationType === 'all' ? <NotificationsActiveIcon/>
                    : <NotificationsOffOutlinedIcon />
                 }
                  {language[lang].subscribed}
                  <KeyboardArrowDownOutlinedIcon />
                </>
                :language[lang].subscribe

            }
        </button>
        <div className={`back-color-${theme}-3 notif-selec`}>
            <ul className={`t-color-${theme}-2 not-opp`}>
                <li 
                    className={`${notifationType === 'all' ? 'active' : ''} back-hov-c-${theme}-2 back-act-c-${theme}-1`}
                    onClick={()=> setNotifationType('all')}
                    >
                    <NotificationsActiveIcon />
                    all
                </li>
                <li 
                   className={`${notifationType === 'personalized' ? 'active' : ''} back-hov-c-${theme}-2 back-act-c-${theme}-1`}
                   onClick={()=> setNotifationType('personalized')}>
                    <NotificationsOutlinedIcon />
                    personalized
                </li>
                <li 
                   className={`${notifationType === 'none' ? 'active' : ''} back-hov-c-${theme}-2 back-act-c-${theme}-1`}
                   onClick={()=> setNotifationType('none')}>
                    <NotificationsOffOutlinedIcon />
                    none
                </li>
                <li 
                    className={` back-hov-c-${theme}-1`}
                    onClick={()=> setIsSubscribed(false)}>
                    <PersonRemoveOutlinedIcon />
                     unsubscribe
                </li>
            </ul>
        </div>
    </div>
  )
};

export default ChannelSubscribeBtn;
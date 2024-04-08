import { useContext, useState } from "react";
import { statesContext } from "../../Contexts/statesContext";

import "./ChannelSubscribeBtn.scss";

import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import NotificationsOffOutlinedIcon from "@mui/icons-material/NotificationsOffOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";

const ChannelSubscribeBtn = () => {
  const { theme, staticData } = useContext(statesContext);

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [notifationType, setNotifationType] = useState("personalized");

  const li_class_names = ` back-hov-c-${theme}-2 back-act-c-${theme}-1`;
  const btn_class_names = `${isSubscribed ? `back-color-${theme}-1 ` : `back-color-${theme}-2`} t-color-${theme} back-hov-c-${theme}-2 subs-b border-c-${theme}-3 `;

  return (
    <div className={`${isSubscribed ? "subscribed" : ""} subs-btn`}>
      <button onClick={() => setIsSubscribed(true)} className={btn_class_names}>
        {isSubscribed ? (
          <>
            {notifationType === "personalized" ? <NotificationsOutlinedIcon /> : notifationType === "all" ? <NotificationsActiveIcon /> : <NotificationsOffOutlinedIcon />}
            {staticData?.subscribed}
            <KeyboardArrowDownOutlinedIcon />
          </>
        ) : (
          staticData?.subscribe
        )}
      </button>
      <div className={`back-color-${theme}-3 border-c-${theme}-5 notif-selec`}>
        <ul className={`t-color-${theme}-2 not-opp`}>
          <li 
            className={`${notifationType === "all" ? "active" : ""} ${li_class_names}`} 
            onClick={() => setNotifationType("all")}>
            <NotificationsActiveIcon />
            all
          </li>
          <li 
              className={`${notifationType === "personalized" ? "active" : ""} ${li_class_names}`} 
              onClick={() => setNotifationType("personalized")}>
            <NotificationsOutlinedIcon />
            personalized
          </li>
          <li 
            className={`${notifationType === "none" ? "active" : ""} ${li_class_names}`} 
            onClick={() => setNotifationType("none")}>
            <NotificationsOffOutlinedIcon />
            none
          </li>
          <li className={` back-hov-c-${theme}-1`} onClick={() => setIsSubscribed(false)}>
            <PersonRemoveOutlinedIcon />
            unsubscribe
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ChannelSubscribeBtn;

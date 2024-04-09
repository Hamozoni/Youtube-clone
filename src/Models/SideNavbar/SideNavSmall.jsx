import { statesContext } from "../../Contexts/statesContext";
import { useContext } from "react";
import { NavLink } from "react-router-dom";

import "./style.scss";

import HomeIcon from "@mui/icons-material/Home";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";

const SideNavbarSmall = ({ homeShort = "" }) => {
  const { theme, staticData } = useContext(statesContext);

  const { home, shorts, subscribtions } = staticData;

  const nav_class_names = `t-color-${theme}-2 back-hov-c-${theme}-1 back-act-c-${theme}-2 link`

  return (
    <div className={`${homeShort} border-c-${theme}-1 nav-icons `}>
      <NavLink className={nav_class_names} to="/">
        <HomeIcon />
        <h3> {home}</h3>
      </NavLink>
      <NavLink className={nav_class_names} to="/shorts">
        <SmartDisplayOutlinedIcon />
        <h3>{shorts}</h3>
      </NavLink>
      <NavLink className={nav_class_names} to="/subscribtions">
        <SubscriptionsOutlinedIcon />
        <h3>{subscribtions}</h3>
      </NavLink>
    </div>
  );
};

export default SideNavbarSmall;

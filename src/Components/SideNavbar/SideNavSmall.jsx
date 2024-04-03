import { language } from "../../Utils/language";
import { statesContext } from "../../Contexts/statesContext";
import { useContext } from "react";
import {NavLink } from "react-router-dom";

import './style.scss';


import HomeIcon from '@mui/icons-material/Home';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';

const SideNavbarSmall = ({homeShort= ''})=> {
    
    const {theme, lang} = useContext(statesContext);

    const { 
        home, 
        shorts, 
        subscribtions, 
    } = language[lang];

    return(
        <div className={`${homeShort} border-c-${theme}-1 nav-icons `}>
             <NavLink 
                className={`t-color-${theme}-2 back-hov-c-${theme}-1 back-act-c-${theme}-2 link`} 
                to='/'
                >
                <HomeIcon />
                <h3> {home}</h3>
            </NavLink>
            <NavLink 
                className={`t-color-${theme}-2 back-hov-c-${theme}-1 back-act-c-${theme}-2 link`} 
                to='/shorts'
                >
                <SmartDisplayOutlinedIcon />
                <h3>{ shorts }</h3>
                
            </NavLink>
            <NavLink 
                className={`t-color-${theme}-2 back-hov-c-${theme}-1 back-act-c-${theme}-2 link`} 
                to='/subscribtions'
                >
                <SubscriptionsOutlinedIcon />
                <h3>{ subscribtions }</h3>
            </NavLink>
       </div>
    )
};

export default SideNavbarSmall;
import { language } from "../../Utils/language";
import { statesContext } from "../../Contexts/statesContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

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
        <div className={`${homeShort} ${theme} nav-icons`}>
             <Link className={`${theme} link`} to='/'>
                <HomeIcon />
                <h3> {home}</h3>
            </Link>
            <Link className={`${theme} link`} to='/'>
                <SmartDisplayOutlinedIcon />
                <h3>{ shorts }</h3>
                
            </Link>
            <Link className={`${theme} link`} to='/'>
                <SubscriptionsOutlinedIcon />
                <h3>{ subscribtions }</h3>
            </Link>
       </div>
    )
};

export default SideNavbarSmall;
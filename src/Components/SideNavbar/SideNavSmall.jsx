import { language } from "../../Utils/language";
import { isThemeDark } from "../../Contexts/Theme";
import { useContext } from "react";
import { Link } from "react-router-dom";

import './style.scss';


import HomeIcon from '@mui/icons-material/Home';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';

const SideNavbarSmall = ({homeShort= ''})=> {
    
    const {lang} = useContext(isThemeDark);

    const { 
        home, 
        shorts, 
        subscribtions, 
    } = language[lang];

    return(
        <div className={`${homeShort} nav-icons`}>
             <Link className="link" to='/'>
                <HomeIcon />
                <h3> {home}</h3>
            </Link>
            <Link className="link" to='/'>
                <SmartDisplayOutlinedIcon />
                <h3>{ shorts }</h3>
                
            </Link>
            <Link className="link" to='/'>
                <SubscriptionsOutlinedIcon />
                <h3>{ subscribtions }</h3>
            </Link>
       </div>
    )
};

export default SideNavbarSmall;
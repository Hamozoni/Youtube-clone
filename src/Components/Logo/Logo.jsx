import './Logo.scss'

import { statesContext } from '../../Contexts/statesContext';
import { useContext } from 'react';
import { language } from '../../Utils/language';
import MenuIcon from '@mui/icons-material/Menu';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Link } from 'react-router-dom';


const Logo = ()=>{

    const { theme, lang,isSideNavbarOpen, setIsSideNavbarOpen} = useContext(statesContext);

   const onClickSideNav = ()=> {
        setIsSideNavbarOpen(!isSideNavbarOpen)
    }

    return (
            <div className={`${theme} logo`}>
                <div 
                   className={`${theme} menu-icon`} 
                   onClick={onClickSideNav}
                   >
                    <MenuIcon/>
                </div>          
                <Link to='/'>
                    <span className={`${theme} icon`}>
                        <PlayArrowIcon />
                    </span>
                    { language[lang]?.logo }
                </Link>  
        </div>
    )
};

export default Logo;
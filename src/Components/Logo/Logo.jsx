import './Logo.scss'

import { isThemeDark } from '../../Contexts/Theme';
import { useContext } from 'react';
import { language } from '../../Utils/language';
import MenuIcon from '@mui/icons-material/Menu';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Link } from 'react-router-dom';


const Logo = ({isSideNavbarOpen,setIsSideNavbarOpen})=>{

    const {lang} = useContext(isThemeDark)

   const onClickSideNav = ()=> {
        setIsSideNavbarOpen(!isSideNavbarOpen)
    }

    return (
            <div className="logo">
                <div className="menu-icon" onClick={onClickSideNav}>
                    <MenuIcon/>
                </div>          
                <Link to='/'>
                    <span className="icon">
                        <PlayArrowIcon />
                    </span>
                    { language[lang].logo }
                </Link>  
        </div>
    )
};

export default Logo;
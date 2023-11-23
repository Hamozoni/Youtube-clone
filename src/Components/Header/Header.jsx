// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Search from '../Search/Search';
// import { Link } from 'react-router-dom';
// import WbSunnyIcon from '@mui/icons-material/WbSunny';
// import Brightness4Icon from '@mui/icons-material/Brightness4';
import './Header.scss';

import { isThemeDark } from '../../Contexts/Theme';
import { useContext} from 'react';
import { Theme } from '../../Utils/Colors';
// import { language } from '../../Utils/language';
import Logo from '../Logo/Logo';
import ProfileCreate from './ProfileCreate';

const Header = ({ isSideNavbarOpen, setIsSideNavbarOpen})=> {


     
    const {isDark} = useContext(isThemeDark);
    return (
        <header className='main-header' >
            <div className="container">
                <Logo isSideNavbarOpen={isSideNavbarOpen} setIsSideNavbarOpen={setIsSideNavbarOpen} />
                <div className="left-bar">

                    <Search />
                    {/* <div className="theme" onClick={()=>{
                            if(+localStorage.getItem('maimed-tube-theme') === 0)  {
                                localStorage.setItem('maimed-tube-theme',1);
                                setIsDark(Number(localStorage.getItem('maimed-tube-theme')));
                            }else {
                                localStorage.setItem('maimed-tube-theme',0);
                                setIsDark(Number(localStorage.getItem('maimed-tube-theme')));
                            }    
                        }}>
                    { isDark === 0 ? <Brightness4Icon className='light-icon' />  :
                        <WbSunnyIcon className='dark-icon'  />
                        }
                    </div> */}
                </div>
                <ProfileCreate />
            </div>
        </header>
    );
};

export default Header;
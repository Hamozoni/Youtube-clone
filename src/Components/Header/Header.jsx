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

    // const [isLangMenu,setIsLangMenu] = useState(false)
     
    const {isDark} = useContext(isThemeDark);
    return (
        <header >
            <div className="container">
                <Logo isSideNavbarOpen={isSideNavbarOpen} setIsSideNavbarOpen={setIsSideNavbarOpen} />
                <div className="left-bar">
                    {/* <div className="lang">
                        <h4 className="lang-t" 
                            onClick={()=>setIsLangMenu(!isLangMenu) }
                            style={{color: Theme[isDark].primaryColor}}
                            >
                            {language[lang].language}
                        </h4>
                        {isLangMenu &&
                        <div 
                            className="langs" 
                            style={{backgroundColor: Theme[isDark].whiteColor, color: Theme[isDark].lightPrColor}}
                            >
                            <h5 onClick={()=> {
                                localStorage.setItem('YMHtube-language',"eng");
                                setIsLangMenu(false);
                                setLang(localStorage.getItem('YMHtube-language'));
                            }}>English</h5>
                            <h5 onClick={()=> {
                                localStorage.setItem('YMHtube-language',"arb"); 
                                setIsLangMenu(false);
                                setLang(localStorage.getItem('YMHtube-language')) 
                            }}>العربية</h5>
                        </div>
                        } 
                    </div> */}
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
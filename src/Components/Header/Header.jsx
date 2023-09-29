import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Search from '../Search/Search';
import { Link } from 'react-router-dom';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import './Header.scss';

import { isThemeDark } from '../../Contexts/Theme';
import { useContext, useState } from 'react';
import { Theme } from '../../Utils/Colors';
import { lang } from '../../Utils/language';

const Header = ()=> {

    const [isLangMenu,setIsLangMenu] = useState(false)
     
    const {isDark,setIsDark,isEng,setIsEng} = useContext(isThemeDark);
    return (
        <header style={{backgroundColor: Theme[isDark].whiteColor}}>
            <div className="container">
                <div className="logo">
                    <Link to='/'><span className="icon"><PlayArrowIcon /></span>{lang[isEng].logo}</Link>  
                </div>
                <div className="left-bar">
                    <div className="lang">
                        <h4 className="lang-t" 
                            onClick={()=>setIsLangMenu(!isLangMenu) }
                            style={{color: Theme[isDark].primaryColor}}>
                            {lang[isEng].language}
                        </h4>
                        {isLangMenu &&
                        <div className="langs"  style={{backgroundColor: Theme[isDark].whiteColor, color: Theme[isDark].lightPrColor}}>
                            <h5 onClick={()=> {
                                localStorage.setItem('maimed-tube-lang',0);
                                setIsLangMenu(false);
                                setIsEng(+localStorage.getItem('maimed-tube-lang'));
                            }}>English</h5>
                            <h5 onClick={()=> {
                                localStorage.setItem('maimed-tube-lang',1); 
                                setIsLangMenu(false);
                                setIsEng(+localStorage.getItem('maimed-tube-lang')) 
                            }}>العربية</h5>
                        </div>
                        } 
                    </div>
                    <Search />
                    <div className="theme" onClick={()=>{
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
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
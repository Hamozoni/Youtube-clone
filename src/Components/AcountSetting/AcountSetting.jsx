import { Link } from "react-router-dom";
import { useContext, useState } from "react";

import "./AcountSetting.scss";

import GoogleIcon from '@mui/icons-material/Google';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PermIdentityRoundedIcon from '@mui/icons-material/PermIdentityRounded';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import KeyboardOutlinedIcon from '@mui/icons-material/KeyboardOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

import { language } from '../../Utils/language';
import {statesContext} from '../../Contexts/statesContext'


const AcountSetting = ()=>{

    const [witchOneRenders,setWitchOneRenders] = useState('main');

    const {lang,setLang, theme,setTheme} = useContext(statesContext);

    const ThemeMenu = ()=>{
        return (
              <div className={`${theme} oppt-menu`}  >
                    <header className={`${theme} oppt-header`}>
                        <div className={`${theme} icon`} onClick={()=> setWitchOneRenders('main') }>
                            <KeyboardBackspaceOutlinedIcon />
                        </div>
                        <h5 className={`${theme} title`}>
                            appearance
                        </h5>
                    </header>
                    <div className={`${theme} menu-oppt`}>
                        <div className={`${theme} oppt`}>
                            <span>{theme === '' && <CheckOutlinedIcon />}</span>
                            <h5>auto theme</h5>
                        </div>
                        <div className={`${theme} oppt`}>
                            <span>{theme === '' && <CheckOutlinedIcon />}</span>
                            <h5>use device theme</h5>
                        </div>
                        <div className={`${theme} oppt`}onClick={()=>{ 
                            setTheme('dark');
                            localStorage.setItem('maimed-tube-theme','dark');
                            }}>
                            <span>{theme === 'dark' && <CheckOutlinedIcon />}</span>
                            <h5>dark theme</h5>
                        </div>
                        <div className={`${theme} oppt`} onClick={()=> {
                            setTheme('light');
                            localStorage.setItem('maimed-tube-theme','light')
                            } }>
                            <span>{theme === 'light' && <CheckOutlinedIcon />}</span>
                            <h5>light theme</h5>
                        </div>
                    </div>
                </div> 
        )
    }

    const LanguageMenu = () =>{
        return (
                <div className={`${theme} oppt-menu`}>
                        <header className={`${theme} oppt-header`}>
                            <div className={`${theme} icon`} onClick={()=> setWitchOneRenders('main') }>
                                <KeyboardBackspaceOutlinedIcon />
                            </div>
                            <h5 className={`${theme} title`}>
                               Choose your language
                            </h5>
                        </header>
                        <div  className={`${theme} menu-oppt`}>
                            <div 
                                className={`${theme} oppt`}
                                onClick={()=> {
                                localStorage.setItem('YMHtube-language',"en");
                                setLang(localStorage.getItem('YMHtube-language'));
                            }}>
                                <span>{lang === 'en' && <CheckOutlinedIcon />}</span>
                                <h5>english</h5>
                            </div>
                            <div 
                                className={`${theme} oppt`}
                                onClick={()=> {
                                localStorage.setItem('YMHtube-language',"ar"); 
                                setLang(localStorage.getItem('YMHtube-language')) 
                            }}>
                                <span>{lang === 'ar' && <CheckOutlinedIcon />}</span>
                                <h5>العربية</h5>
                            </div>
                        </div> 
                 </div>
        )
    };

    const AcountContainer = ()=>{
        return (
            <div className={`${theme} acount-container open-menu`} >
                <header className={`${theme} acount-header`}>
                    <div className={`${theme} user-info open-menu`}>
                        <div className="user-image">
                            <img src="" alt="" />
                        </div>
                        <section className={`${theme} user-name`}>
                            <h4 className={`${theme} name`}>Mohamed Yahia</h4>
                            <h5 className={`${theme} channel-handle`}>@mohammedyahia9711</h5>
                            <Link to='/' >View your channel</Link>
                        </section>
                    </div>
                </header>
                <div className="acount-body">
                    <div className="acou-body-cont">

                        <ul className={`${theme} google-aco`}>
                            <li> <GoogleIcon /> google acount</li>
                            <li> <ContactsOutlinedIcon /> switch acount </li>
                            <li> <LogoutOutlinedIcon/> sign out</li>
                        </ul>
                        <ul className={`${theme} google-aco`}>
                            <li> <PermIdentityRoundedIcon /> your data in myhtube</li>
                            <li onClick={()=> setWitchOneRenders('theme')}> <DarkModeOutlinedIcon /> appearance: {theme} </li>
                            <li onClick={()=> setWitchOneRenders('lang')}> <TranslateOutlinedIcon/>{language[lang].language}: english</li>
                            <li> <AdminPanelSettingsOutlinedIcon/> restricted mode: off </li>
                            <li> <PublicOutlinedIcon/> location: Saudi arbia </li>
                            <li> <KeyboardOutlinedIcon/> keyboard shortcuts</li>
                        </ul>
                        <ul className={`${theme} google-aco`}>
                            <li> <SettingsOutlinedIcon /> settings</li>
                            <li> <HelpOutlineOutlinedIcon /> help</li>
                            <li> <FeedbackOutlinedIcon/> send feedback</li>
                        </ul>

                    </div>
                </div>
            </div>
        )
    }

    return (
        <div 
            className={`${theme} acount-setting open-menu`} 
            style={lang === 'en' ? {right: '40px'} : {left: '40px'}}
            >
            {
                witchOneRenders === 'main' ? <AcountContainer /> :
                witchOneRenders === 'lang' ? <LanguageMenu /> :
                witchOneRenders === 'theme' && <ThemeMenu />
            }

        </div>
    )
};

export default AcountSetting;
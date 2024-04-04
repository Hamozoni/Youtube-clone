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

const AcountSetting = ({setIsAcountModel})=>{

    const [witchOneRenders,setWitchOneRenders] = useState('main');

    const {lang,setLang, theme,setTheme} = useContext(statesContext);

    const ThemeMenu = ()=>{
        return (
              <div className={`back-color-${theme}-1 oppt-menu`}  >
                    <header className={`border-c-${theme}-2 oppt-header`}>
                        <div 
                            className={`t-color-${theme}-1 back-hov-c-${theme}-2 icon`} 
                            onClick={()=> setWitchOneRenders('main') }
                            >
                            <KeyboardBackspaceOutlinedIcon />
                        </div>
                        <h5 className={`t-color-${theme}-1 title`}>
                            appearance
                        </h5>
                    </header>
                    <div className={`${theme} menu-oppt`}>
                        <div className={` t-color-${theme}-1 back-hov-c-${theme}-2 oppt`}>
                            <span>{theme === '' && <CheckOutlinedIcon />}</span>
                            <h5>auto theme</h5>
                        </div>
                        <div className={`t-color-${theme}-1 back-hov-c-${theme}-2 oppt`}>
                            <span>{theme === '' && <CheckOutlinedIcon />}</span>
                            <h5>use device theme</h5>
                        </div>
                        <div className={`${theme === 'dark' ? 'active' : ''} back-act-c-${theme}-3 t-color-${theme}-1 back-hov-c-${theme}-2 oppt`}
                           onClick={()=>{ 
                            setTheme('dark');
                            localStorage.setItem('maimed-tube-theme','dark');
                            }}>
                            <span>{theme === 'dark' && <CheckOutlinedIcon />}</span>
                            <h5>dark theme</h5>
                        </div>
                        <div className={`${theme === 'light' ? 'active' : ''} back-act-c-${theme}-3  t-color-${theme}-1 back-hov-c-${theme}-2 oppt`} onClick={()=> {
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
                <div className={`back-color-${theme}-1 oppt-menu`}>
                        <header className={`border-c-${theme}-2 oppt-header`}>
                            <div 
                                className={`t-color-${theme}-1 back-hov-c-${theme}-2 icon`} 
                                onClick={()=> setWitchOneRenders('main') }>
                                <KeyboardBackspaceOutlinedIcon />
                            </div>
                            <h5 className={`t-color-${theme}-1 title`}>
                               Choose your language
                            </h5>
                        </header>
                        <div  className={`${theme} menu-oppt`}>
                            <div 
                                className={`${lang === 'en' ? 'active' : ''} back-act-c-${theme}-3 back-hov-c-${theme}-2 t-color-${theme}-3 oppt`}
                                onClick={()=> {
                                        localStorage.setItem('YMHtube-language',"en");
                                        setLang(localStorage.getItem('YMHtube-language'));
                                    }}
                                 >
                                <span>{lang === 'en' && <CheckOutlinedIcon />}</span>
                                <h5>english</h5>
                            </div>
                            <div 
                                className={`${lang === 'ar' ? 'active' : ''} back-act-c-${theme}-3 back-hov-c-${theme}-2 t-color-${theme}-3 oppt`}
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
            <div className={`back-color-${theme}-1 acount-container open-menu`} >
                <header className={`border-c-${theme}-1 acount-header`}>
                    <div className={`${theme} user-info open-menu`}>
                        <div className={`back-color-${theme}-2 user-image`}>
                            <img src="" alt="" />
                        </div>
                        <section className={`t-color-${theme}-1 user-name`}>
                            <h4 className={`${theme} name`}>
                                Mohamed Yahia
                            </h4>
                            <h5 
                              className={`${theme} channel-handle`}
                              >
                                @mohammedyahia9711
                            </h5>
                            <Link to='/'className={`t-color-${theme}-6`} >
                                View your channel
                            </Link>
                        </section>
                    </div>
                </header>
                <div className="acount-body">
                    <div className={`acou-body-cont`}>

                        <ul className={`border-c-${theme}-2  google-aco`}>
                            <li className={`back-hov-c-${theme}-2 t-color-${theme}-2`}> 
                                <GoogleIcon /> 
                                 google acount
                            </li>
                            <li className={`back-hov-c-${theme}-2 t-color-${theme}-2`}> 
                                <ContactsOutlinedIcon /> 
                                switch acount 
                            </li>
                            <li className={`back-hov-c-${theme}-2 t-color-${theme}-2`}> 
                                <LogoutOutlinedIcon/> 
                                sign out
                            </li>
                        </ul>
                        <ul className={`border-c-${theme}-2  google-aco`}>
                            <li className={`back-hov-c-${theme}-2 t-color-${theme}-2`}> 
                                <PermIdentityRoundedIcon /> 
                                your data in myhtube
                            </li>
                            <li 
                                className={`back-hov-c-${theme}-2 t-color-${theme}-2`}
                                onClick={()=> setWitchOneRenders('theme')}
                                > 
                                <DarkModeOutlinedIcon />
                                 appearance: {theme} 
                            </li>
                            <li 
                                className={`back-hov-c-${theme}-2 t-color-${theme}-2`}
                                onClick={()=> setWitchOneRenders('lang')}
                                > 
                                <TranslateOutlinedIcon/>
                                {language[lang].language}: english
                            </li>
                            <li className={`back-hov-c-${theme}-2 t-color-${theme}-2`}> 
                                <AdminPanelSettingsOutlinedIcon/> 
                                restricted mode: off
                             </li>
                            <li className={`back-hov-c-${theme}-2 t-color-${theme}-2`}> 
                                <PublicOutlinedIcon/> 
                                location: Saudi arbia 
                            </li>
                            <li className={`back-hov-c-${theme}-2 t-color-${theme}-2`}> 
                                <KeyboardOutlinedIcon/> 
                                keyboard shortcuts
                            </li>
                        </ul>
                        <ul className={`border-c-${theme}-2  google-aco`}>
                            <li className={`back-hov-c-${theme}-2 t-color-${theme}-2`}>
                                 <SettingsOutlinedIcon /> 
                                 settings
                            </li>
                            <li className={`back-hov-c-${theme}-2 t-color-${theme}-2`}> 
                                <HelpOutlineOutlinedIcon /> 
                                help
                            </li>
                            <li className={`back-hov-c-${theme}-2 t-color-${theme}-2`}> 
                               <FeedbackOutlinedIcon/> 
                               send feedback
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
        )
    }

    return (
        <div 
            onClick={(e)=> {
                if(e.target.classList.contains('acount-setting')){
                    setIsAcountModel(false)
                }
            }}
            className={`b-g-t-${theme} acount-setting open-menu`} 
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
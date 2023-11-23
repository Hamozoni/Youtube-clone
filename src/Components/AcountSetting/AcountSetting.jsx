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
import {isThemeDark} from '../../Contexts/Theme'


const AcountSetting = ()=>{

    const [witchOneRenders,setWitchOneRenders] = useState('main');

    const {lang,setLang,isDark,setIsDark} = useContext(isThemeDark);
    // onClick={()=>{
    //     if(localStorage.getItem('maimed-tube-theme') === 'dark')  {
    //             localStorage.setItem('maimed-tube-theme','light');
    //                 setIsDark(Number(localStorage.getItem('maimed-tube-theme')));
    //             }else {
    //                 localStorage.setItem('maimed-tube-theme','dark');
    //                 setIsDark(localStorage.getItem('maimed-tube-theme'));
    //             }    
    //         }}>

    const ThemeMenu = ()=>{
        return (
              <div className="oppt-menu" >
                    <header className="oppt-header">
                        <div className="icon" onClick={()=> setWitchOneRenders('main') }>
                            <KeyboardBackspaceOutlinedIcon />
                        </div>
                        <h5 className="title">
                            appearance
                        </h5>
                    </header>
                    <div className="menu-oppt">
                        <div className="oppt">
                            <span>{isDark === '' && <CheckOutlinedIcon />}</span>
                            <h5>auto theme</h5>
                        </div>
                        <div className="oppt">
                            <span>{isDark === '' && <CheckOutlinedIcon />}</span>
                            <h5>use device theme</h5>
                        </div>
                        <div className="oppt">
                            <span>{isDark === 'dark' && <CheckOutlinedIcon />}</span>
                            <h5>dark theme</h5>
                        </div>
                        <div className="oppt">
                            <span>{isDark === 'light' && <CheckOutlinedIcon />}</span>
                            <h5>light theme</h5>
                        </div>
                    </div>
                </div> 
        )
    }

    const LanguageMenu = () =>{
        return (
                <div className="oppt-menu">
                        <header className="oppt-header">
                            <div className="icon" onClick={()=> setWitchOneRenders('main') }>
                                <KeyboardBackspaceOutlinedIcon />
                            </div>
                            <h5 className="title">
                               Choose your language
                            </h5>
                        </header>
                        <div  className="menu-oppt" >
                            <div 
                                className="oppt"
                                onClick={()=> {
                                localStorage.setItem('YMHtube-language',"en");
                                setLang(localStorage.getItem('YMHtube-language'));
                            }}>
                                <span>{lang === 'en' && <CheckOutlinedIcon />}</span>
                                <h5>english</h5>
                            </div>
                            <div 
                                className="oppt"
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
            <div className="acount-container open-menu">
                <header className="acount-header">
                    <div className="user-info open-menu">
                        <div className="user-image">
                            <img src="" alt="" />
                        </div>
                        <section className="user-name">
                            <h4 className="name">Mohamed Yahia</h4>
                            <h5 className="channel-handle">@mohammedyahia9711</h5>
                            <Link to='/' >View your channel</Link>
                        </section>
                    </div>
                </header>
                <div className="acount-body">
                    <div className="acou-body-cont">

                        <ul className="google-aco">
                            <li> <GoogleIcon /> google acount</li>
                            <li> <ContactsOutlinedIcon /> switch acount </li>
                            <li> <LogoutOutlinedIcon/> sign out</li>
                        </ul>
                        <ul className="google-aco">
                            <li> <PermIdentityRoundedIcon /> your data in myhtube</li>
                            <li onClick={()=> setWitchOneRenders('theme')}> <DarkModeOutlinedIcon /> appearance: {isDark} </li>
                            <li onClick={()=> setWitchOneRenders('lang')}> <TranslateOutlinedIcon/>{language[lang].language}: english</li>
                            <li> <AdminPanelSettingsOutlinedIcon/> restricted mode: off </li>
                            <li> <PublicOutlinedIcon/> location: Saudi arbia </li>
                            <li> <KeyboardOutlinedIcon/> keyboard shortcuts</li>
                        </ul>
                        <ul className="google-aco">
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
        <div className="acount-setting open-menu">
            {
                witchOneRenders === 'main' ? <AcountContainer /> :
                witchOneRenders === 'lang' ? <LanguageMenu /> :
                witchOneRenders === 'theme' && <ThemeMenu />
            }

        </div>
    )
};

export default AcountSetting;
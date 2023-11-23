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

import { language } from '../../Utils/language';
import {isThemeDark} from '../../Contexts/Theme'


const AcountSetting = ()=>{

    const [isLangMenu,setIsLangMenu] = useState(false);
    const {lang,setLang} = useContext(isThemeDark);

    const LanguageMenu = () =>{
        return (
                <div className="lang">
                        <h4 className="lang-t" 
                            onClick={()=>setIsLangMenu(!isLangMenu) }
                            >
                            {language[lang].language}
                        </h4>
                        {isLangMenu &&
                        <div 
                            className="langs" 
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
                    </div>
        )
    }

    return (
        <div className="acount-setting">
            <div className="acount-container">
                <header className="acount-header">
                    <div className="user-info">
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
                            <li> <DarkModeOutlinedIcon /> appearance: dark </li>
                            <li> <TranslateOutlinedIcon/>{language[lang].language}: english</li>
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

        </div>
    )
};

export default AcountSetting;

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
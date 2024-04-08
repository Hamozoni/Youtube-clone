import { Link } from "react-router-dom";
import { useContext, useState } from "react";

import "./AcountSetting.scss";

import {handleSelectedTheme} from "../../Hooks/themeHandler";

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

import {statesContext} from '../../Contexts/statesContext'

const AcountSetting = ({setIsAcountModel})=>{

    console.log(window.matchMedia('(prefers-color-scheme: dark)').matches)

    const [witchOneRenders,setWitchOneRenders] = useState('main');

    const {lang,staticData,setLang, theme,selectedTheme,setSelectedTheme} = useContext(statesContext);

    const ThemeMenu = ()=>{

        const li_Class_names = `back-act-c-${theme}-4 t-color-${theme}-3 back-hov-c-${theme}-3 oppt`
        return (
              <div className={`back-color-${theme}-2 oppt-menu`}  >
                    <header className={`border-c-${theme}-2 oppt-header`}>
                        <div 
                            className={`t-color-${theme}-1 back-hov-c-${theme}-3 icon`} 
                            onClick={()=> setWitchOneRenders('main') }
                            >
                            <KeyboardBackspaceOutlinedIcon />
                        </div>
                        <h5 className={`t-color-${theme}-1 title`}>
                            appearance
                        </h5>
                    </header>
                    <div className={`${theme} menu-oppt`}>
                        <div 
                            onClick={()=>handleSelectedTheme("autoTheme",setSelectedTheme)}
                            className={`${selectedTheme === 'autoTheme' ? 'active' : ''} ${li_Class_names}`}
                            >
                            <span>{selectedTheme === 'autoTheme' && <CheckOutlinedIcon />}</span>
                            <h5>auto theme</h5>
                        </div>
                        <div 
                            onClick={()=>handleSelectedTheme("deviceTheme",setSelectedTheme)}
                            className={`${selectedTheme === 'deviceTheme' ? 'active' : ''} ${li_Class_names}`}
                            >
                            <span>{selectedTheme === 'deviceTheme' && <CheckOutlinedIcon />}</span>
                            <h5>use device theme</h5>
                        </div>
                        <div className={`${selectedTheme === 'dark' ? 'active' : ''} ${li_Class_names}`}
                             onClick={()=>handleSelectedTheme("dark",setSelectedTheme)}
                            >
                            <span>{selectedTheme === 'dark' && <CheckOutlinedIcon />}</span>
                            <h5>dark theme</h5>
                        </div>
                        <div className={`${selectedTheme === 'light' ? 'active' : ''} ${li_Class_names}`} 
                             onClick={()=>handleSelectedTheme("light",setSelectedTheme)}
                           > 
                            <span>{selectedTheme === 'light' && <CheckOutlinedIcon />}</span>
                            <h5>light theme</h5>
                        </div>
                    </div>
                </div> 
        )
    }

    const LanguageMenu = () =>{

        const li_class_names = `back-act-c-${theme}-4 back-hov-c-${theme}-3 t-color-${theme}-3 oppt`
        return (
                <div className={`back-color-${theme}-2 oppt-menu`}>
                        <header className={`border-c-${theme}-2 oppt-header`}>
                            <div 
                                className={`t-color-${theme}-1 back-hov-c-${theme}-3 icon`} 
                                onClick={()=> setWitchOneRenders('main') }>
                                <KeyboardBackspaceOutlinedIcon />
                            </div>
                            <h5 className={`t-color-${theme}-1 title`}>
                               Choose your language
                            </h5>
                        </header>
                        <div  className={`${theme} menu-oppt`}>
                            <div 
                                className={`${lang === 'en' ? 'active' : ''} ${li_class_names}`}
                                onClick={()=> {
                                        localStorage.setItem('YMHtube-language',"en");
                                        setLang(localStorage.getItem('YMHtube-language'));
                                    }}
                                 >
                                <span>{lang === 'en' && <CheckOutlinedIcon />}</span>
                                <h5>english</h5>
                            </div>
                            <div 
                                className={`${lang === 'ar' ? 'active' : ''} ${li_class_names}`}
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



        const li_class_names = `back-hov-c-${theme}-3 t-color-${theme}-2`;
        const border_class = `border-c-${theme}-4`;
        return (
            <div className={`back-color-${theme}-2 acount-container open-menu`} >
                <header className={`${border_class} acount-header`}>
                    <div className={`${theme} user-info open-menu`}>
                        <div className={`back-color-${theme}-3 user-image`}>
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

                        <ul className={`${border_class}  google-aco`}>
                            <li className={li_class_names}> 
                                <GoogleIcon /> 
                                 google acount
                            </li>
                            <li className={li_class_names}> 
                                <ContactsOutlinedIcon /> 
                                switch acount 
                            </li>
                            <li className={li_class_names}> 
                                <LogoutOutlinedIcon/> 
                                sign out
                            </li>
                        </ul>
                        <ul className={`${border_class} google-aco`}>
                            <li className={li_class_names}> 
                                <PermIdentityRoundedIcon /> 
                                your data in myhtube
                            </li>
                            <li 
                                className={li_class_names}
                                onClick={()=> setWitchOneRenders('theme')}
                                > 
                                <DarkModeOutlinedIcon />
                                 appearance: {selectedTheme} 
                            </li>
                            <li 
                                className={li_class_names}
                                onClick={()=> setWitchOneRenders('lang')}
                                > 
                                <TranslateOutlinedIcon/>
                                {staticData.language}: english
                            </li>
                            <li className={li_class_names}> 
                                <AdminPanelSettingsOutlinedIcon/> 
                                restricted mode: off
                             </li>
                            <li className={li_class_names}> 
                                <PublicOutlinedIcon/> 
                                location: Saudi arbia 
                            </li>
                            <li className={li_class_names}> 
                                <KeyboardOutlinedIcon/> 
                                keyboard shortcuts
                            </li>
                        </ul>
                        <ul className={`${border_class} google-aco`}>
                            <li className={li_class_names}>
                                 <SettingsOutlinedIcon /> 
                                 settings
                            </li>
                            <li className={li_class_names}> 
                                <HelpOutlineOutlinedIcon /> 
                                help
                            </li>
                            <li className={li_class_names}> 
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
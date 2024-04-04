import { createContext, useEffect, useReducer, useState } from "react";
import { reducer } from "./Reducer";

export const statesContext = createContext(null);

const initalstate = {
    history : [],
    likedVideos: [],
    subscribtion: [],
};

const StatesContextComponent = ({children})=>{


    const [state,dispatch] = useReducer(reducer,initalstate);

    const [theme, setTheme] = useState('dark');
    const [lang, setLang] = useState('en');
    const [shorts, setShorts] = useState([]);
    const [isSideNavbarOpen, setIsSideNavbarOpen] = useState(false);
    const [isAcountNavOpen, setIsAcountNavOpen] = useState(false);
    const [playingVideoId, setPlayingVideoId] = useState('');
    const [isRecording, setIsRecording] = useState(false);


    useEffect(()=>{

        if(localStorage.getItem('YMHtube-language')) {
            setLang(localStorage.getItem('YMHtube-language'))   
        }else {
          localStorage.setItem('YMHtube-language',lang);
        };
    
        if(lang === "ar") {
          document.dir = 'rtl';
        }else {
          document.dir = 'ltr';
        };
          
      },[lang]);
    
      useEffect(()=>{
          if(localStorage.getItem('maimed-tube-theme')) {
            setTheme(localStorage.getItem('maimed-tube-theme'))   
          }else {
            localStorage.setItem('maimed-tube-theme',theme);
          };
    
          document.body.className = `back-color-${theme}`;
          
      },[theme]);

    return (
        <statesContext.Provider 
            value={
                    { 
                        theme, 
                        setTheme, 
                        lang, 
                        setLang,
                        shorts, 
                        setShorts,
                        setIsAcountNavOpen, 
                        isAcountNavOpen, 
                        isSideNavbarOpen,
                        setIsSideNavbarOpen,
                        playingVideoId,
                        setPlayingVideoId,
                        state,
                        dispatch,
                        isRecording,
                        setIsRecording
                   }
                }
           > 
            {children}
        </statesContext.Provider>
    )
};

export default StatesContextComponent;

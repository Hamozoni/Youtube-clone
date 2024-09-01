import jsonUrl from "../Data/staticData.json"
import { createContext, useEffect, useReducer, useState } from "react";
import { reducer } from "./Reducer";
import { handleThemechanges } from "../Utils/themeHandler";
import { handleSetLanguage } from "../Utils/langHandler";

export const statesContext = createContext(null);


const initalstate = {
  history: [],
  likedVideos: [],
  subscribtion: [],
};

const StatesContextComponent = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initalstate);

  const [theme, setTheme] = useState("dark");
  const [selectedTheme, setSelectedTheme] = useState("deviceTheme");
  const [lang, setLang] = useState("en");
  const [shorts, setShorts] = useState([]);
  const [isSideNavbarOpen, setIsSideNavbarOpen] = useState(false);
  const [playingVideoId, setPlayingVideoId] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [staticData, setStaticData] = useState({});

  useEffect(()=> {
    handleSetLanguage(lang,setStaticData,setLang);
  },[lang]);

  useEffect(()=> {
    if(selectedTheme === 'deviceTheme') {
      const mediaTheme = window.matchMedia('(prefers-color-scheme: dark)');


      const handleChange = ({matches})=> {
        if(matches){
          setTheme('dark');
        }else{
          setTheme('light');
        }
      }
      mediaTheme.addEventListener('change',handleChange);
  
       return ()=> mediaTheme.removeEventListener('change',handleChange)

    }
     
  },[])

  useEffect(() => {
    handleThemechanges(setSelectedTheme,selectedTheme,setTheme)
    document.body.className = `back-color-${theme}`;
  }, [selectedTheme,theme]);

  return (
    <statesContext.Provider
      value={{
        theme,
        setTheme,
        lang,
        setLang,
        shorts,
        setShorts,
        isSideNavbarOpen,
        setIsSideNavbarOpen,
        playingVideoId,
        setPlayingVideoId,
        state,
        dispatch,
        isRecording,
        setIsRecording,
        staticData,
        selectedTheme,
        setSelectedTheme
      }}
    >
      {children}
    </statesContext.Provider>
  );
};

export default StatesContextComponent;

import jsonUrl from "../Data/staticData.json"
import { createContext, useEffect, useReducer, useState } from "react";
import { reducer } from "./Reducer";

export const statesContext = createContext(null);


const initalstate = {
  history: [],
  likedVideos: [],
  subscribtion: [],
};

const StatesContextComponent = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initalstate);

  const [theme, setTheme] = useState("dark");
  const [lang, setLang] = useState("en");
  const [shorts, setShorts] = useState([]);
  const [isSideNavbarOpen, setIsSideNavbarOpen] = useState(false);
  const [playingVideoId, setPlayingVideoId] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [staticData, setStaticData] = useState({});

  useEffect(() => {

    if (localStorage.getItem("YMHtube-language")) {
      setLang(localStorage.getItem("YMHtube-language"));
    } else {
      localStorage.setItem("YMHtube-language", lang);
    }

    if (lang === "ar") {
      document.dir = "rtl";
      setStaticData(jsonUrl[1])
    } else {
      document.dir = "ltr";
      setStaticData(jsonUrl[0])
    }
  }, [lang]);

  useEffect(() => {

    if (localStorage.getItem("maimed-tube-theme")) {
      setTheme(localStorage.getItem("maimed-tube-theme"));
    } else {
      // window.matchMedia('(prefers-color-scheme: dark)')
      // .addEventListener('change',({ matches }) => {
      //       if (matches) {
      //         console.log("change to dark mode!")
      //       } else {
      //         console.log("change to light mode!")
      //       }
      //     })
      localStorage.setItem("maimed-tube-theme", theme);
    }

    document.body.className = `back-color-${theme}`;
  }, [theme]);

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
      }}
    >
      {children}
    </statesContext.Provider>
  );
};

export default StatesContextComponent;

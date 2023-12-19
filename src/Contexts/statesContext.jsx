import { createContext, useReducer, useState } from "react";
import { reducer } from "./Reducer";

export const statesContext = createContext(null);


const StatesContextComponent = ({children})=>{

    const initalstate = {
        history : [],
        likedVideos: [],
        subscribtion: [],
    };

    const [state,dispatch] = useReducer(reducer,initalstate);

    const [theme, setTheme] = useState('dark');
    const [lang, setLang] = useState('en');
    const [shorts, setShorts] = useState([]);
    const [isSideNavbarOpen, setIsSideNavbarOpen] = useState(false);
    const [isAcountNavOpen, setIsAcountNavOpen] = useState(false);
    const [playingVideoId, setPlayingVideoId] =useState('');

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
                        dispatch
                   }
                }
           > 
            {children}
        </statesContext.Provider>
    )
};

export default StatesContextComponent;

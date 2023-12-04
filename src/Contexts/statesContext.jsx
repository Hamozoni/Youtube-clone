import { createContext, useState } from "react";

export const statesContext = createContext(null);


const StatesContextComponent = ({children})=>{


    const [theme, setTheme] = useState('dark');
    const [lang, setLang] = useState("en");
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
                        setPlayingVideoId
                   }
                }
           > 
            {children}
        </statesContext.Provider>
    )
};

export default StatesContextComponent;

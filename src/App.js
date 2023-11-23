import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import SideNavbar from './Components/SideNavbar/SideNavbar'
import Home from './Pages/Home/Home';
import VideoDetails from './Pages/VideoDetails/VideoDetails';
import ChanelDetails from './Pages/ChanelDetails/ChanelDetails';
import SearchFeed from './Pages/SearchFeed/SearchFeed';
import PlayListVideos from './Pages/PlayListVideos/PlayListVideos';
import ShortsVideos from './Pages/ShortsVideos/ShortsVideos';

import { isThemeDark } from './Contexts/Theme';
import { useEffect, useState } from 'react';
import AcountSetting from './Components/AcountSetting/AcountSetting';

const App = ()=> {
  const [isDark, setIsDark] = useState(0);
  const [lang, setLang] = useState("en");
  const [shorts, setShorts] = useState([]);
  const [isSideNavbarOpen, setIsSideNavbarOpen] = useState(false);
  const [isAcountNavOpen, setIsAcountNavOpen] = useState(true);


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
    }
    if(localStorage.getItem('maimed-tube-theme')) {
      setIsDark(Number(localStorage.getItem('maimed-tube-theme')))   
    }else {
      localStorage.setItem('maimed-tube-theme',isDark);
    };
      
    const body =  document.getElementsByTagName('body');
    
    if(isDark === 1){
      body[0].classList.add('dark-mode');
    }else {
      body[0].classList.remove('dark-mode');
    }
    

  },[isDark,lang,setLang,setIsDark])

  return (
    <isThemeDark.Provider 
          value={{ isDark, setIsDark, lang, setLang,shorts, setShorts }} >
      < BrowserRouter >
        <Header 
              isSideNavbarOpen={isSideNavbarOpen} 
              setIsSideNavbarOpen={setIsSideNavbarOpen}
        />
        {isSideNavbarOpen && 
         <SideNavbar 
            isSideNavbarOpen={isSideNavbarOpen}  
            setIsSideNavbarOpen={setIsSideNavbarOpen}/>
          }
          {
            isAcountNavOpen && 
            <AcountSetting />

          }
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/video/:id' element={<VideoDetails />} />
          <Route path='/channels/:id' element={<ChanelDetails />} />
          <Route path='/search/:word' element={<SearchFeed />} />
          <Route path='/playlist/:id' element={<PlayListVideos />} />
          <Route path='/short/:id' element={<ShortsVideos />} />
        </Routes>
       </BrowserRouter>
    </isThemeDark.Provider>
  );
}

export default App;

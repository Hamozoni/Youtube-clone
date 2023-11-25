import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import SideNavbar from './Components/SideNavbar/SideNavbar'
import Home from './Pages/Home/Home';
import VideoDetails from './Pages/VideoDetails/VideoDetails';
import ChanelDetails from './Pages/ChanelDetails/ChanelDetails';
import SearchFeed from './Pages/SearchFeed/SearchFeed';
import PlayListVideos from './Pages/PlayListVideos/PlayListVideos';
import ShortsVideos from './Pages/ShortsVideos/ShortsVideos';

// import StatesContextComponent from './Contexts/statesContext';
import {statesContext} from './Contexts/statesContext';
import { useContext, useEffect } from 'react';
import AcountSetting from './Components/AcountSetting/AcountSetting';

const App = ()=> {

  const {lang, setLang, theme,setTheme, isSideNavbarOpen, isAcountNavOpen } = useContext(statesContext);
  // const [Theme, setTheme] = useState('dark');
  // const [lang, setLang] = useState("en");
  // const [shorts, setShorts] = useState([]);
  // const [isSideNavbarOpen, setIsSideNavbarOpen] = useState(false);
  // const [isAcountNavOpen, setIsAcountNavOpen] = useState(false);


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

    if(localStorage.getItem('maimed-tube-theme')) {
      setTheme(localStorage.getItem('maimed-tube-theme'))   
    }else {
      localStorage.setItem('maimed-tube-theme',theme);
    };
      
    const body =  document.getElementsByTagName('body');
    
    if(theme === 'dark'){
      body[0].classList.add('dark-mode');
    }else {
      body[0].classList.remove('dark-mode');
    }
    

  },[theme,lang,setLang,setTheme]);


    // const rootEl = document.getElementById('root');
     
    // rootEl.onclick = (e)=>{
    //   console.log(e.target.classList)
    //    if(e.target.classList.contains('open-menu')){
    //       console.log("yes")

    //    }else {
    //     setIsAcountNavOpen(false);
    //    }
    // }




  return (
      < BrowserRouter >
        <Header />
        {isSideNavbarOpen && 
         <SideNavbar />
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
  );
}

export default App;

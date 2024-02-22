import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import SideNavbar from './Components/SideNavbar/SideNavbar'
import Home from './Pages/Home/Home';
import Watch from './Pages/Watch/Watch';
import Channel from './Pages/Channel/Channel.jsx';
import SearchFeed from './Pages/SearchFeed/SearchFeed';
import PlayList from './Pages/Playlist/Playlist.jsx';

import {statesContext} from './Contexts/statesContext';
import { useContext, useEffect } from 'react';
import AcountSetting from './Components/AcountSetting/AcountSetting';
import Post from './Pages/Post/Post';
import ChannelHome from './Components/ChannelHome/ChannelHome.jsx';
import ChannelContent from './Components/ChannelContent/ChannelContent.jsx';
import Shorts from './Pages/Shorts/Shorts.jsx';
import History from './Pages/History/History.jsx';
import LikedVideos from './Pages/LikedVideos/LikedVideos.jsx';
import SearchRecorder from './Components/SearchRecording/SearchRecorder.jsx';


const App = ()=> {

  const {lang, setLang, theme,setTheme, isSideNavbarOpen, isAcountNavOpen,isRecording } = useContext(statesContext);

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


  return (
      < BrowserRouter >
        <Header />
          { 
            isSideNavbarOpen && 
            <SideNavbar />
          }
          {
            isAcountNavOpen && 
            <AcountSetting />

          }
          {
            isRecording && 
            <SearchRecorder />
          }
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/explore' exact element={<Home />} />
          <Route path='/watch/:id' element={<Watch />} />
          <Route path='/channels/:id' element={<Channel />} >
              <Route index element={<ChannelHome />} />
              <Route path='home' element={<ChannelHome />} />
              <Route path=':section' element={<ChannelContent/>} />
          </Route >
          <Route path='/search' element={<SearchFeed />} />
          <Route path='/watch/:id/list/:plId/:index' element={<PlayList />} />
          <Route path='/shorts' element={<Shorts/>} />
          <Route path='/post/:id' element={<Post />} />
          <Route path='/history' element={<History />} />
          <Route path='/likedVideos' element={<LikedVideos />} />
        </Routes>
        {
          
        }
       </BrowserRouter>
  );
}

export default App;

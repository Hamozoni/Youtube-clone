import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Layouts/Header/Header.jsx';
import SideNavbar from './Models/SideNavbar/SideNavbar.jsx'
import Home from './Pages/Home/Home';
import Watch from './Pages/Watch/Watch';
import SearchFeed from './Pages/SearchFeed/SearchFeed';
import PlayList from './Pages/Playlist/Playlist.jsx';

import {statesContext} from './Contexts/statesContext';
import { useContext, useEffect, useState } from 'react';
import Shorts from './Pages/Shorts/Shorts.jsx';
import History from './Pages/History/History.jsx';
import LikedVideos from './Pages/LikedVideos/LikedVideos.jsx';
import SearchRecorder from './Models/SearchRecording/SearchRecorder.jsx';
import Loading from './Components/Loading/Loading.jsx';
import Channel from './Pages/Channel/Channel.jsx';
import ChannelContent from './Pages/Channel/Outlets/ChannelContent/ChannelContent.jsx';
import ChannelHome from "./Pages/Channel/Outlets/ChannelHome/ChannelHome.jsx"
import Community from './Pages/Community/Community.jsx';


const App = ()=> {

  const {isSideNavbarOpen,isRecording } = useContext(statesContext);

  const [isLoader,setLoader] = useState(true)


  useEffect(()=>{

  const timeOut = setTimeout(()=>{
      setLoader(false);
    },3000);

    return ()=> clearTimeout(timeOut)
  },[setLoader])


  return (
      < BrowserRouter >
        <Header />
          { 
            isSideNavbarOpen && 
            <SideNavbar />
          }
          {
            isRecording && 
            <SearchRecorder />
          }
          {
            isLoader && 
            <Loading />
          }
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/explore' exact element={<Home />} />
          <Route path='/watch/:id' element={<Watch />} />
          <Route path='/channel/:id' element={<Channel />} >

              
              <Route index element={<ChannelHome />} />
              <Route path='home' element={<ChannelHome />} />
              <Route path=':section' element={<ChannelContent/>} />
          </Route >
          <Route path='/search' element={<SearchFeed />} />
          <Route path='/watch/:id/list/:plId/:index' element={<PlayList />} />
          <Route path='/shorts' element={<Shorts/>} />
          <Route path='/community/:id' element={<Community />} />
          <Route path='/history' element={<History />} />
          <Route path='/likedVideos' element={<LikedVideos />} />
        </Routes>
        {
          
        }
       </BrowserRouter>
  );
}
export default App;

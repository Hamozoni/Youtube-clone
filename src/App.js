import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
// pages
import Home from './Pages/Home/Home';
import Watch from './Pages/Watch/Watch';
import SearchFeed from './Pages/SearchFeed/SearchFeed';
import PlayList from './Pages/Playlist/Playlist.jsx';
import Shorts from './Pages/Shorts/Shorts.jsx';
import History from './Pages/History/History.jsx';
import LikedVideos from './Pages/LikedVideos/LikedVideos.jsx';
import Channel from './Pages/Channel/Channel.jsx';
import ChannelContent from './Pages/Channel/Outlets/ChannelContent/ChannelContent.jsx';
import ChannelHome from "./Pages/Channel/Outlets/ChannelHome/ChannelHome.jsx"
import Community from './Pages/Community/Community.jsx';
// layouts
import Header from './Layouts/Header/Header.jsx';
// models
import SearchRecorder from './Models/SearchRecording/SearchRecorder.jsx';
import SideNavbar from './Models/SideNavbar/SideNavbar.jsx';
// contexts
import {statesContext} from './Contexts/statesContext';

const App = ()=> {

  const {isSideNavbarOpen,isRecording } = useContext(statesContext);

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

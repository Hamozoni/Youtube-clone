import './ChanelDetails.scss';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchApi, fetchChannelApi } from '../../Utils/FetchApi';
import { Theme } from '../../Utils/Colors';
import { isThemeDark } from '../../Contexts/Theme';
import { language } from '../../Utils/language';

import Loading from '../../Components/Loading/Loading';
import MainChannelCard from '../../Components/MainChannelCard/MainChannelCard';
import Playlist from '../../Components/PlayListCard/PlayList';
import ShortsCard from '../../Components/SortsCard/ShortsCard';
import ChannelAbout from '../../Components/ChannelAbout/ChannelAbout';
import Error from '../../Components/Error/Error';
import ChannelHome from '../../Components/ChannelHome/ChannelHome';
import SideNavbarSmall from '../../Components/SideNavbar/SideNavSmall';
import ChannelCommunity from '../../Components/ChannelCommunity/ChannelCommunity';
import ChannelVideos from '../../Components/ChannelVideos/ChannelVideos';
import ChannelTaps from '../../Components/ChannelNavTaps/ChannelTaps';

const ChanelDetails = ()=> {


    // const [playingVideoId, setPlayingVideoId] =useState('');

    const [channelContent,setChannelContent] = useState('home');

    const [chanelDetail,setChanelDetail] = useState();
    const [channelPlayLists,setChannelPlaylists] = useState([]);
    // const [channelLive,setChannelLive] = useState(null);
    const [isLoading,setIsLoading] = useState(true);

    const { id } = useParams();
    const {lang} = useContext(isThemeDark);

    const [isError,setIsErroe] = useState(false);
    const [error,setErroe] = useState(null);
    const [isAboutChannelOpen,setIsAboutChannelOpen] = useState(false);

    useEffect(()=>{
        setIsLoading(true);
        fetchChannelApi(`channel/about?id=${id}&lang=${lang}`)
        .then((data)=>{
            setChanelDetail(data);  
            setIsLoading(false)  ;
            console.log(data)
        })
        fetchChannelApi(`channel/playlists?id=${id}&lang=${lang}&sortby=lastdateadded`)
        .then((data)=> {
            setChannelPlaylists(data?.data);
            setIsLoading(false) 
            console.log(data)
        })
        .catch((error)=> {
            setIsLoading(false);
            setIsErroe(true)
            setErroe(error)
        })
        
    },[id,lang]);

    return (

        isError ? <Error error={error} />:
    
        <div className="chanel-details">
             <SideNavbarSmall homeShort='home-short' />
            <div className="container">
                <div className="banner">
                  { chanelDetail?.banner && 
                        <img 
                            src={ chanelDetail?.banner[1]?.url || 
                                chanelDetail?.banner[2]?.url}
                            alt="" 
                        />
                  }
                </div>
                   { isLoading & chanelDetail ? <Loading /> : <MainChannelCard data={chanelDetail} setIsAboutChannelOpen={setIsAboutChannelOpen}  renderFrom="channel"/>}
                   <ChannelTaps channelContent={channelContent} setChannelContent={setChannelContent} setIsAboutChannelOpen={setIsAboutChannelOpen}  />
                <div className="channel-content">
                    {isAboutChannelOpen &&  <ChannelAbout chanelDetail={chanelDetail} setIsAboutChannelOpen={setIsAboutChannelOpen} />}
                    {isLoading ? <Loading />:
                    <>{
                        channelContent === 'videos' ?
                         <ChannelVideos id={id} type='videos'/>
                        : 
                        channelContent === 'playlists' ?
                            <div className="playlist-container">
                                { channelPlayLists?.map((playlist)=>( 
                                    playlist?.type === "playlist" ?
                                       <Playlist playlist={playlist} />
                                   : playlist?.type === "playlist_listing" &&
                                       playlist?.data?.map((data)=>(
                                          <Playlist playlist={data} />
                                      ))
                                   ))
                                }
                            </div> 
                        : 
                        channelContent === 'live' ? 
                           <ChannelVideos id={id} type='liveStreams'/>
                        :
                        channelContent === 'shorts' ?
                            <div className="channel-shorta">
                                <ShortsCard id={id} />
                            </div>
                        :
                        channelContent === 'home' ?
                          <ChannelHome id={id} /> 
                        : channelContent === 'community' && 
                         <ChannelCommunity id={id} />
                    }</>
                  }
               
                </div>

            </div>
        </div>
    );
};

export default ChanelDetails;
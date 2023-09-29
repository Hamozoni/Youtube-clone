import './ChanelDetails.scss';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchApi, fetchApiB, fetchChannelApi } from '../../Utils/FetchApi';
import { Theme } from '../../Utils/Colors';
import { isThemeDark } from '../../Contexts/Theme';
import { lang } from '../../Utils/language';


import Loading from '../../Components/Loading/Loading';
import MainChannelCard from '../../Components/MainChannelCard/MainChannelCard';
import Videos from '../../Components/Videos/Videos';
import Playlist from '../../Components/PlayListCard/PlayList';
import ShortsCard from '../../Components/SortsCard/ShortsCard';
import ChannelAbout from '../../Components/ChannelAbout/ChannelAbout';
import Error from '../../Components/Error/Error';

const ChanelDetails = ()=> {

    const { isDark, isEng } = useContext(isThemeDark);

    const [channelContent,setChannelContent] = useState('videos');

    const [chanelDetail,setChanelDetail] = useState();
    const [channelPlayLists,setChannelPlaylists] = useState(null);
    const [channelLive,setChannelLive] = useState(null);
    const [channelViveos,setChannelVideos] = useState(null);
    const [channelShorts,setChannelShorts] = useState(null)
    const [channelAbout,setChannelAbout] = useState(null)
    const [isLoading,setIsLoading] = useState(true);

    const { id } = useParams();

    const [isError,setIsErroe] = useState(false);
    const [error,setErroe] = useState(null);

    useEffect(()=>{
        setIsLoading(true)
        fetchApi(`channel?id=${id}`)
        .then((data)=>{
            setChanelDetail(data.meta)
            setChannelVideos(data?.data)
            setIsLoading(false);
           
        })
        .catch((error)=> {
            setIsErroe(true)
            setErroe(error)
        })

        fetchApiB(`channels?part=snippet,statistics&id=${id}`)
        .then((data)=>{
            setChannelAbout(data.items[0])
        })

        fetchChannelApi(`channel/playlists?id=${id}&sortby=lastdateadded`)
        .then((data)=> {
            setChannelPlaylists(data?.data)
        })

        fetchChannelApi(`channel/liveStreams?id=${id}&sortby=lastdateadded`)
        .then((data)=> {
            setChannelLive(data?.data)
        })
        fetchChannelApi(`channel/shorts?id=${id}&sortby=lastdateadded`)
        .then((data)=> {
            setChannelShorts(data?.data)
        })
        
    },[id])
    return (

        isError ? <Error error={error} />:
    
        <div className="chanel-details">
            <div className="container">
                <div className="banner">
                  { chanelDetail?.image.banner &&  <img src={chanelDetail?.image?.banner[1]?.url || chanelDetail?.image?.banner[2]?.url} alt="" />}
                </div>
                 {isLoading & chanelDetail ? <Loading /> : <MainChannelCard id={id} />}
                <div className="channel-nav" style={{backgroundColor: Theme[isDark].tranWhiteColor}}>
                    <ul className="nav" style={{color: Theme[isDark].blueColor}}>
                        <li style={{backgroundColor: Theme[isDark].whiteColor, color: Theme[isDark].lightPrColor}}
                            className={channelContent === 'home'? 'active': ''}
                            onClick={()=> setChannelContent('home')}> {lang[isEng].home}</li>
                        <li style={{backgroundColor: Theme[isDark].whiteColor, color: Theme[isDark].lightPrColor}}
                            className={channelContent === 'videos' ? 'active': ''}
                            onClick={()=> setChannelContent('videos')}>{lang[isEng].videos}</li>
                        <li style={{backgroundColor: Theme[isDark].whiteColor, color: Theme[isDark].lightPrColor}}
                            className={channelContent === 'shorts' ? 'active': ''} 
                            onClick={()=> setChannelContent('shorts')}>{lang[isEng].shorts}</li>
                        <li style={{backgroundColor: Theme[isDark].whiteColor, color: Theme[isDark].lightPrColor}}
                            className={channelContent === 'live' ? 'active': ''} 
                            onClick={()=> setChannelContent('live')}>{lang[isEng].live}</li>
                        <li style={{backgroundColor: Theme[isDark].whiteColor, color: Theme[isDark].lightPrColor}}
                            className={channelContent === 'playlists' ? 'active': ''}
                            onClick={()=> setChannelContent('playlists')}>{lang[isEng].playlists}</li>
                        <li style={{backgroundColor: Theme[isDark].whiteColor, color: Theme[isDark].lightPrColor}}
                            className={channelContent === 'about' ? 'active': ''}
                            onClick={()=> setChannelContent('about')}>{lang[isEng].about}</li>
                    </ul>
                </div>
                <div className="channel-content">
                    {isLoading ? <Loading />:
                    <>{
                        channelContent === 'videos' ?
                        <Videos videos={channelViveos}  isChannell={false} />       
                        : 
                        channelContent === 'playlists' ?
                        <div className="playlist-container">
                            {channelPlayLists.length > 0 ? channelPlayLists?.map((playlist)=>( <Playlist playlist={playlist} /> )) : ''}
                        </div> 
                        : 
                        channelContent === 'live' ? <Videos videos={channelLive}/> :
                        channelContent === 'shorts' ?
                        <div className="channel-shorta">
                            <ShortsCard data={channelShorts} />
                        </div>
                        : channelContent === 'about' && 
                        <div className="channel-about">
                            <ChannelAbout about={channelAbout} />
                        </div>
                    }</>
                  }
               
                </div>

            </div>
        </div>
    );
};

export default ChanelDetails;
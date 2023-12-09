import './Channel.scss';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchChannelApi } from '../../Utils/FetchApi';
import { statesContext } from '../../Contexts/statesContext';

import Loading from '../../Components/Loading/Loading';
import MainChannelCard from '../../Components/MainChannelCard/MainChannelCard';
import ChannelAbout from '../../Components/ChannelAbout/ChannelAbout';
import Error from '../../Components/Error/Error';
import ChannelHome from '../../Components/ChannelHome/ChannelHome';
import SideNavbarSmall from '../../Components/SideNavbar/SideNavSmall';
import ChannelContent from '../../Components/ChannelContent/ChannelContent';
import ChannelTaps from '../../Components/ChannelNavTaps/ChannelTaps';

const ChanelDetails = ()=> {

    const [channelContent,setChannelContent] = useState('home');

    const [chanelDetail,setChanelDetail] = useState(null);
    const [isLoading,setIsLoading] = useState(true);

    const { id } = useParams();
    const {lang} = useContext(statesContext);

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
        .catch((error)=> {
            setIsLoading(false);
            setIsErroe(true)
            setErroe(error)
        })
        
    },[id,lang]);

    return (

        isError ? <Error error={error} />: isLoading ? <Loading /> :
        <div className='chanel-details'>
             <SideNavbarSmall homeShort='home-short' />
            <div className='container'>
                <div className='banner'>
                    {
                        chanelDetail?.banner &&
                        <img 
                            src={ chanelDetail?.banner[1]?.url || 
                                chanelDetail?.banner[2]?.url} 
                            alt="" 
                        />
                    }
                </div>
                <MainChannelCard data={chanelDetail} setIsAboutChannelOpen={setIsAboutChannelOpen}  renderFrom="channel"/>
                <ChannelTaps channelContent={channelContent} setChannelContent={setChannelContent} setIsAboutChannelOpen={setIsAboutChannelOpen}  />
                <div className="channel-content">
                    {isAboutChannelOpen &&  <ChannelAbout chanelDetail={chanelDetail} setIsAboutChannelOpen={setIsAboutChannelOpen} />}
                    <>{
                        channelContent === 'videos' ?
                         <ChannelContent id={id} type='videos'/>
                        : 
                        channelContent === 'playlists' ?
                          <ChannelContent id={id} type='playlists'/>
                        : 
                        channelContent === 'live' ? 
                           <ChannelContent id={id} type='liveStreams'/>
                        :
                        channelContent === 'shorts' ?
                            <ChannelContent id={id} type='shorts'/>
                        :
                        channelContent === 'home' ?
                          <ChannelHome id={id} /> 
                        : channelContent === 'community' && 
                          <ChannelContent id={id} type='community'/>
                    }</>
                </div>

            </div>
        </div>
    );
};

export default ChanelDetails;
import { useContext, useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import './Channel.scss';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { fetchChannelApi } from '../../Utils/FetchApi';
import { statesContext } from '../../Contexts/statesContext';

import ChannelAbout from '../../Components/ChannelAbout/ChannelAbout';
import Error from '../../Components/Error/Error';
import SideNavbarSmall from '../../Components/SideNavbar/SideNavSmall';
import ChannelTaps from '../../Components/ChannelNavTaps/ChannelTaps';
import { language } from '../../Utils/language';
import ChannelSubscribeBtn from '../../Components/ChannelSubscibeBtn/ChannelSubscribeBtn';

const ChanelDetails = ()=> {

    const [chanelDetail,setChanelDetail] = useState(null);
    const [isLoading,setIsLoading] = useState(true);

    const { id,section} = useParams();
    const {lang} = useContext(statesContext);

    const [error,setError] = useState(null);
    const [isAboutChannelOpen,setIsAboutChannelOpen] = useState(false);

    useEffect(()=>{
        setIsLoading(true);
        setError(null);
        fetchChannelApi(`channel/about?id=${id}&lang=${lang}`)
        .then((data)=>{
            setChanelDetail(data);
            console.log(data); 
        })
        .catch((error)=> {
            setError(error)
        })
        .finally(()=> {
            setIsLoading(false);
        })
        
    },[id,lang]);

    return (

        error ? <Error error={error} />: isLoading ? '' :
        <div className='chanel-details'>
             <SideNavbarSmall homeShort='home-short' />
            <div className='container'>
                <div className='banner'>
                    {
                        chanelDetail?.banner &&
                        <img 
                            src={ chanelDetail?.banner[1]?.url || 
                                chanelDetail?.banner[2]?.url} 
                            alt="banner" 
                        />
                    }

                    <div className="ch-card">
                        <img src={chanelDetail?.avatar[1]?.url} alt="avatar" />
                        <div className="ch-info">
                            <div className="ch-n">
                                <span>
                                     {chanelDetail?.channelHandle} {chanelDetail?.isVerified && <CheckCircleIcon /> }
                                </span>
                                <span>
                                     {chanelDetail?.subscriberCountText + " " + language[lang].subscribers}
                                </span>
                                <span>
                                     {chanelDetail?.videosCount + " " + language[lang].videos}
                                </span>
                            </div>
                            <div className="ch-desc">
                                <article>
                                    {chanelDetail?.description?.slice(0,90) + "..."}
                                </article>
                                <CheckCircleIcon onClick={()=> setIsAboutChannelOpen(true)} /> 
                            </div>
                            <ChannelSubscribeBtn />
                        </div>
                    </div>
                </div>
                <ChannelTaps 
                    setIsAboutChannelOpen={setIsAboutChannelOpen}
                    tabs={chanelDetail.tabs}
                    />
                <div className="channel-content">
                    { 
                        isAboutChannelOpen &&  
                        <ChannelAbout 
                            chanelDetail={chanelDetail} 
                            setIsAboutChannelOpen={setIsAboutChannelOpen}
                            />
                    }
                    <Outlet section={section}/>
                </div>

            </div>
        </div>
    );
};

export default ChanelDetails;
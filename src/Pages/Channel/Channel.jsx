import { useContext, useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import './Channel.scss';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { fetchChannelApi } from '../../Lib/FetchApi';
import { statesContext } from '../../Contexts/statesContext';

import ChannelAbout from '../../Components/ChannelAbout/ChannelAbout';
import Error from '../../Components/Error/Error';
import SideNavbarSmall from '../../Components/SideNavbar/SideNavSmall';
import ChannelTaps from '../../Components/ChannelNavTaps/ChannelTaps';
import ChannelSubscribeBtn from '../../Components/ChannelSubscibeBtn/ChannelSubscribeBtn';

const Channel = () => {

    const [chanelDetail,setChanelDetail] = useState(null);
    const [isLoading,setIsLoading] = useState(true);

    const { id} = useParams();
    const {staticData,theme,lang} = useContext(statesContext);

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
   
    const ChannelCard = ({chanelDetail})=> {
        return(
            <div className="ch-card">
            <img className='ch-card-img' src={chanelDetail?.avatar[2]?.url} alt="avatar" />
            <div className="ch-info">
                <h3 className={`t-color-${theme} ch-t`}>
                    {chanelDetail?.title}
                </h3>
                <div className={`t-color-${theme}-4 flix ch-n`}>
                    <span className='flix m-h'>
                         {chanelDetail?.channelHandle} {chanelDetail?.isVerified && <CheckCircleIcon /> }
                    </span>
                    <span className='m-h'>
                         {chanelDetail?.subscriberCountText + " " + staticData.subscribers}
                    </span>
                    <span className='m-h'>
                         {chanelDetail?.videosCountText}
                    </span>
                </div>
                <div 
                    onClick={()=> setIsAboutChannelOpen(true)}
                    className={`t-color-${theme}-4 flix ch-desc`}
                    >
                    <article className='m-h'>
                        {chanelDetail?.description?.slice(0,90) + "..."}
                    </article>
                    <ArrowForwardIosIcon  /> 
                </div>
                {
                    chanelDetail?.links?.length > 0 &&
                    <div className={`t-color-${theme}-1 flix ch-card-links`}>
                        <a 
                        className='link-c m-h'
                            href={chanelDetail?.links[0].link}
                            >
                            {chanelDetail?.links[0].link}
                        </a>

                        {
                            chanelDetail?.links?.length > 1 &&
                            <p className='m-h' onClick={()=> setIsAboutChannelOpen(true)}> 
                                and {chanelDetail?.links?.length - 1} more links
                            </p>
                        }

                    </div>
                }
                <ChannelSubscribeBtn />
            </div>
        </div>
        )
    }

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
                <ChannelCard chanelDetail={chanelDetail} />
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
                <Outlet />
            </div>

        </div>
    </div>
  )
}

export default Channel
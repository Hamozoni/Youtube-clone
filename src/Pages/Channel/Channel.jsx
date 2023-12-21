import './Channel.scss';
import { useContext, useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import { fetchChannelApi } from '../../Utils/FetchApi';
import { statesContext } from '../../Contexts/statesContext';

import Loading from '../../Components/Loading/Loading';
import MainChannelCard from '../../Components/MainChannelCard/MainChannelCard';
import ChannelAbout from '../../Components/ChannelAbout/ChannelAbout';
import Error from '../../Components/Error/Error';
import SideNavbarSmall from '../../Components/SideNavbar/SideNavSmall';
import ChannelTaps from '../../Components/ChannelNavTaps/ChannelTaps';

const ChanelDetails = ()=> {

    const [chanelDetail,setChanelDetail] = useState(null);
    const [isLoading,setIsLoading] = useState(true);

    const { id,section} = useParams();
    const {lang} = useContext(statesContext);

    const [isError,setIsErroe] = useState(false);
    const [error,setErroe] = useState(null);
    const [isAboutChannelOpen,setIsAboutChannelOpen] = useState(false);

    useEffect(()=>{
        setIsLoading(true);
        fetchChannelApi(`channel/about?id=${id}&lang=${lang}`)
        .then((data)=>{
            setChanelDetail(data);  
            setIsLoading(false);
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
                <ChannelTaps setIsAboutChannelOpen={setIsAboutChannelOpen}  />
                <div className="channel-content">
                    {isAboutChannelOpen &&  <ChannelAbout chanelDetail={chanelDetail} setIsAboutChannelOpen={setIsAboutChannelOpen} />}
                    <Outlet section={section}/>
                </div>

            </div>
        </div>
    );
};

export default ChanelDetails;
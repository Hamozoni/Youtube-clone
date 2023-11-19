import { useContext, useEffect,useState } from "react";

import { isThemeDark } from "../../Contexts/Theme";
import { fetchChannelApi } from "../../Utils/FetchApi";


import './style.scss';

import Error from "../Error/Error";
import Loading from "../Loading/Loading";
import Videos from "../Videos/Videos";
import MainChannelCard from "../MainChannelCard/MainChannelCard";
import ShortCard from "../SortsCard/ShortCard";
import Shorts from '../Images/shorts.svg'
import Player from "./Player";
import Playlist from "../PlayListCard/PlayList";

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


const ChannelHome = ({id})=> {

    const {lang} = useContext(isThemeDark);
    
    const [playingVideoId,setPlayingVideoId] = useState(" ");
    const [data,setData] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect(()=>{
        setIsLoading(true)
        fetchChannelApi(`channel/home?id=${id}&lang=${lang}`)
        .then(data => {
            setData(data?.data)
            console.log(data?.data)
            setIsLoading(false);
        })
        .catch(error => {
            setError(error);
            setIsLoading(false);
        })

    },[id,lang]);


    const scrollingVideos = (class_name,type)=>{

        const videosContainer =  document.querySelector(`.${class_name}`);
        const prevIcon = document.querySelector(`.${class_name}-prev`);

        if(type === 'prev'){

            if(videosContainer.scrollLeft === 0){
                prevIcon.style.display = 'none';
            }else {
                videosContainer.scrollBy({top: 0,left:-400, behavior: 'smooth'});
            } 

        }else {
            videosContainer.scrollBy({top: 0,left: 400, behavior: 'smooth'});
        }
        
    };

    const scrollHandler = (class_name)=>{

       const prevIcon = document.querySelector(`.${class_name}-prev`);
       const nextIcon = document.querySelector(`.${class_name}-next`);
      
        const videosContainer =  document.querySelector(`.${class_name}`);
        const videosHolder =  document.querySelector(`.${class_name}-holder`);
        const videosContainerWidth = videosContainer.clientWidth;
        const videosHolderWidth = videosHolder.clientWidth;

        if(videosContainer.scrollLeft === 0 ){
            prevIcon.style.display = 'none';
        }else if(videosContainerWidth > 430 ){
            
            prevIcon.style.display = 'flex';
        }

        if (videosContainer.scrollLeft + videosContainerWidth === videosHolderWidth) {
            nextIcon.style.display = 'none';

        }if(videosContainerWidth > 430 ){
            nextIcon.style.display = 'flex';
        }
    }


    return (
        error ? <Error error={error}/> :(
            isLoading ? <Loading /> : 
            <main className="channel-home">
                {data?.map((el,i)=>(
                    <section key={i} className="part-container"> 
                        { 
                          el?.type !== 'player'  &&
                        <> 
                             <h4 
                                className="part-title">
                                    {  el?.type === 'shorts_listing' && 
                                       
                                       <img src={Shorts} alt='shorts' />

                                    }
                                    {el?.title}
                                    { el?.type === "video_listing"  &&
                                    <span >
                                        <PlayArrowIcon />
                                         Play all
                                    </span> 
                                    }
                            </h4>
                           { el?.subtitle && 
                            <p className="sub-title">
                                {el?.subtitle?.length > 250 ?`${el?.subtitle.slice(0,200)}...`: el?.subtitle}
                            </p>
                          }
    
                        </>
                        }
                        <div 
                            onScroll={()=> scrollHandler(`${el?.type }-${i}`)}
                            className={`${el?.type !== 'player' && `${el?.type }-${i}`} videos-wraper`}>
                        {
                                el?.type !== 'player' &&
                                <>
                                 <div 
                                    className={`${el?.type}-${i}-prev scroll-prev`}>
                                      <ArrowBackIosNewIcon 
                                       onClick={()=> scrollingVideos(`${el?.type }-${i}`,'prev')}
                                      />
                                  </div> 
                                  <div 

                                    className={`${el?.type}-${i}-next scroll-next`}>
                                     <ArrowForwardIosOutlinedIcon 
                                         onClick={()=> scrollingVideos(`${el?.type }-${i}`,'next')}
                                       />
                                  </div>
  
                              </>        
                        }
                            <div className={`${el?.type !== 'player' && `${el?.type }-${i}-holder ${el?.type}`} videos channel-home`} >
                               {
                                el?.type === 'player' ?
                                <Player data={el} />
                                :
                                el?.type === "video_listing"  ?
                                    el?.data?.map((video)=>(
                                        <Videos 
                                            key={video?.videoId} 
                                            data={video} 
                                            playingVideoId={playingVideoId} 
                                            setPlayingVideoId={setPlayingVideoId}
                                            renderFrom="channel-home"/>
                                    )) 
                                :     
                                el?.type === "playlist_listing" ? 
                                    el?.data?.map((video,_,arr)=>(
                                    <Playlist key={video?.videoId} playlist={video} shorts={arr} renderFrom="channel-home"/>
                                    )) 
                                :
                                el?.type === "members_listing" ?  
                                            el?.data?.map((member,i)=>(
                                                <div className="member-image"  key={member?.thumbnails[0]?.url + i} >
                                                    <img 
                                                        className="img"
                                                        src={member?.thumbnails[0]?.url} 
                                                        alt="member" 
                                                    />
                                                </div>

                                            ))
                                        
                                :
                                el?.type === 'shorts_listing' ?
                                    
                                        el?.data?.map((short,_,arr)=> (
                                            short?.type === 'shorts' &&
                                            <ShortCard key={short?.videoId} short={short} shorts={arr} />
                                        ))
                                    
                                :
                                el?.type === "channel_listing" && 
                                        
                                            el?.data?.map((channelData)=>(
                                                <MainChannelCard key={channelData?.channelId} data={channelData} renderFrom="home-channel"/>
                                            ))
                                        
                            }
                            </div>
                        </div>
                    </section>
                ))}
            </main>
        )
    );
};

export default ChannelHome;
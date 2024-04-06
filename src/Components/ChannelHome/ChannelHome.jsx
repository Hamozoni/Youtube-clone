import { useContext, useEffect,useState } from "react";

import { statesContext } from "../../Contexts/statesContext";
import { fetchChannelApi } from "../../Utils/FetchApi";


import './style.scss';

import Error from "../Error/Error";
import Loading from "../Loading/Loading";
import VideoCard from "../VideoCard/VideoCard";
import ShortCard from "../SortsCard/ShortCard";
import Shorts from '../Images/shorts.svg'
import Player from "./Player";
import Playlist from "../PlayListCard/PlayList";

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { scrollHandler } from "./scrollHandler";
import { useParams } from "react-router-dom";


const ChannelHome = ()=> {
    const { id} = useParams();

    const {lang, theme} = useContext(statesContext);
    const [data,setData] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect(()=>{
        setIsLoading(true)
        fetchChannelApi(`channel/home?id=${id}&lang=${lang}`)
        .then(data => {
            setData(data?.data)
            setIsLoading(false);
        })
        .catch(error => {
            setError(error);
            setIsLoading(false);
        });

    },[id,lang]);


    const scrollingVideos = (class_name,type)=> {
        const videosContainer =  document.querySelector(`.${class_name}`);

        if(type === 'prev'){
            videosContainer.scrollBy({top: 0,left:-400, behavior: 'smooth'});

        }else {
            videosContainer.scrollBy({top: 0,left: 400, behavior: 'smooth'});
        }
        scrollHandler(class_name,lang); 
    };

    return (
        error ? <Error error={error}/> :(
            isLoading ? <Loading /> : 
            <main className={`${theme} channel-home`}>
                {data?.map((el,i)=>(
                    <section key={i} className={`${theme} part-container`}> 
                        { 
                          el?.type !== 'player' && el?.type !== 'video' ?
                        <> 
                             <h4 
                                className={`${theme} part-title`}>
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
                            <p className={`${theme} sub-title`}>
                                {el?.subtitle?.length > 250 ?`${el?.subtitle.slice(0,200)}...`: el?.subtitle}
                            </p>
                           }
                            <div 
                                className={`${el?.type}-${i}-prev scroll-prev ${theme}`}
                                onClick={ ()=> scrollingVideos(`${el?.type }-${i}`,'prev')}
                                 >
                                    <ArrowBackIosNewIcon />
                            </div> 
                            <div 
                                className={`${el?.type}-${i}-next scroll-next ${theme}`}
                                onClick={ ()=> scrollingVideos(`${el?.type }-${i}`,'next')}
                                >
                                <ArrowForwardIosOutlinedIcon />
                            </div>
    
                        </> : ""
                        }
                        <div 
                            onLoad={()=> scrollHandler(`${el?.type }-${i}`,lang)}
                            onScroll={()=> scrollHandler(`${el?.type }-${i}`,lang)}
                            className={`${el?.type !== 'player' && `${el?.type }-${i}`} ${theme} videos-wraper`}
                            >
                            <div className={`${el?.type !== 'player' && `${el?.type }-${i}-holder ${el?.type}`} ${theme} channel-home`} >
                               {
                                el?.type === 'player' || el?.type === 'video'?
                                <Player data={el} />
                                :
                                el?.type === "video_listing"  ?
                                    el?.data?.map((video)=>(
                                        <VideoCard 
                                            key={video?.videoId} 
                                            data={video} 
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
                                                <div className={`${theme} member-image`}  key={member?.thumbnails[0]?.url + i} >
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
                                    
                                :''
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
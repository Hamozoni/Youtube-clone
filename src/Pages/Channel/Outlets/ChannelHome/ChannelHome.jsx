import { useParams } from "react-router-dom";
import { useContext, useEffect,useState } from "react";


import './style.scss';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import Error from "../../../../Components/Error/Error";
import VideoCard from "../../../../Components/VideoCard/VideoCard";
import ShortCard from "../../../../Components/SortsCard/ShortCard";
import FireLoading from "../../../../Components/Loading/SpinLoading/SpinLoading";
import Playlist from "../../../../Components/PlayListCard/PlayList";

import { statesContext } from "../../../../Contexts/statesContext";

import Shorts from '../../../../Assets/shorts.svg'
import Player from "./Player";



import { fetchChannelApi } from "../../../../Lib/FetchApi";
import { scrollHandler } from "./scrollHandler";

const ChannelHome = ()=> {
    const { id} = useParams();

    const {lang, theme,staticData} = useContext(statesContext);
    const [data,setData] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect(()=>{
        setIsLoading(true);
        setError(null)
        fetchChannelApi(`channel/home?id=${id}&lang=${lang}`)
        .then(data => {
            setData(data?.data)
        })
        .catch(error => {
            setError(error);
        })
        .finally(()=> {
            setIsLoading(false);
        })

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
            isLoading ? <FireLoading />: 
            <main className='channel-home'>
                {data?.map((el,i)=>(
                    <section key={i} className={`border-c-${theme}-2 part-container`}> 
                        { 
                          el?.type !== 'player' && el?.type !== 'video' ?
                        <> 
                             <h4 
                                className={`t-color-${theme}-1  part-title`}>
                                    {  el?.type === 'shorts_listing' && 
                                       
                                       <img src={Shorts} alt='shorts' />

                                    }
                                    {el?.title}
                                    { el?.type === "video_listing"  &&
                                    <span className={`border-c-${theme}-5 back-hov-c-${theme}-1 pl-a`} >
                                        <PlayArrowIcon />
                                        <span>
                                            {staticData?.playAll}
                                        </span>
                                    </span> 
                                    }
                            </h4>
                           { el?.subtitle && 
                            <p className={`t-color-${theme}-3 sub-title`}>
                                {el?.subtitle?.length > 250 ?`${el?.subtitle.slice(0,200)}...`: el?.subtitle}
                            </p>
                           }
                            <div 
                                className={`${el?.type}-${i}-prev scroll-prev t-color-${theme}-5 back-color-${theme}`}
                                onClick={ ()=> scrollingVideos(`${el?.type }-${i}`,'prev')}
                                 >
                                    <ArrowBackIosNewIcon />
                            </div> 
                            <div 
                                className={`${el?.type}-${i}-next scroll-next t-color-${theme}-5 back-color-${theme}`}
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
                            <div className={`${el?.type !== 'player' && `${el?.type }-${i}-holder ${el?.type}`} channel-home`} >
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
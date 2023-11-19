import { useContext, useEffect, useRef, useState } from "react";
import { fetchChannelApi } from "../../Utils/FetchApi";
import Videos from "../Videos/Videos";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";
import { language } from "../../Utils/language";
import { isThemeDark } from "../../Contexts/Theme";

import './ChannelVideos.scss';

const ChannelVideos = ({id,type})=>{

    const {lang} = useContext(isThemeDark);

    const {latest, popular, oldest} = language[lang];

    const [sortBy,setSortBy] = useState('newest');
    const [channelViveos,setChannelViveos] = useState([]);
    const [continuation,setContinuation] = useState(null);
    const [isLoadingMoreData,setIsloadingMoreData] = useState(false);
    const [isLoading,setIsLoading] = useState(true);
    const [isError,setIsError] = useState(null);

    const [playingVideoId, setPlayingVideoId] = useState('');

     useEffect(()=>{
        console.log(continuation,isLoadingMoreData,setSortBy)
        setIsLoading(true);
          fetchChannelApi(`channel/${type}?id=${id}&lang=${lang}&sort_by=${sortBy}`)
          .then((data)=>{
            setChannelViveos(data?.data);
            setContinuation(data?.continuation);
            setIsloadingMoreData(true);
            setIsLoading(false);
          })
          .catch((error)=>{
            setIsError(error);
            setIsLoading(false);
            setIsloadingMoreData('error');
          })
     },[id,type,sortBy]);

    const sortByHandler = (arg)=>{
        setSortBy(arg)
    };

    const loadingIcon = useRef(null);

    const fetchMoreData = ()=>{
        setIsloadingMoreData(false);
        if(continuation){
            fetchChannelApi(`channel/${type}?id=${id}&lang=${lang}&sort_by=${sortBy}&token=${continuation}`)
            .then((data)=>{
                setChannelViveos(prev => [...prev,...data?.data]);
                setContinuation(data?.continuation);
                setIsloadingMoreData(true);
            })
            .catch(error=> {
                setIsloadingMoreData('error');
            })
        }
    };

    useEffect(()=>{
        const windowScrollHandler = ()=>{
            if(continuation){
                const scrollPosation = window.scrollY;
                const loaderTop = loadingIcon.current.offsetTop;
                const windowHeight = window.innerHeight;

                if(scrollPosation >= loaderTop - windowHeight + 56 && isLoadingMoreData){
                    fetchMoreData();
                }

            }
        }

        window.addEventListener('scroll',windowScrollHandler);
        return ()=> window.removeEventListener('scroll',windowScrollHandler);
    },[]);


    return (
        <div className="channel-videos" > 
             <nav className="sort-by">
                <ul>
                    <li 
                        className={sortBy === 'newest' && 'active'}
                        onClick={()=> sortByHandler('newest')}
                        >
                            {latest}
                    </li>
                    <li 
                        className={sortBy === 'popular' && 'active'}
                        onClick={()=> sortByHandler('popular')}
                        >
                            {popular}
                    </li>
                    <li 
                        className={sortBy === 'oldest' && 'active'}
                        onClick={()=> sortByHandler('oldest')}
                        >
                            {oldest}
                    </li>
                </ul>
             </nav>
             <div className="videos channel" > 
             {  isError ? <Error error={isError} /> : isLoading ? <Loading /> :
                 channelViveos?.map((video)=>(
                    <Videos 
                        key={video?.videoId} 
                        data={video}  
                        playingVideoId={playingVideoId} 
                        setPlayingVideoId={setPlayingVideoId}
                        renderFrom="channel"  />   
            ))  
        }
        </div>
        {
           isLoadingMoreData != 'error' && continuation ?
           <div ref={loadingIcon} className="load-more">
               loading...
            </div> : ''
        }

      </div>  
    )
};

export default ChannelVideos;
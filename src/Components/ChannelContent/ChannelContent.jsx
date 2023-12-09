import { useContext, useEffect, useState } from "react";
import { fetchChannelApi } from "../../Utils/FetchApi";
import Videos from "../Videos/Videos";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";
import { language } from "../../Utils/language";
import { statesContext } from "../../Contexts/statesContext";

import './ChannelContent.scss';
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ShortCard from "../SortsCard/ShortCard";
import Playlist from "../PlayListCard/PlayList";
import PostCard from "../PostCard/PostCard";

const ChannelVideos = ({id,type})=>{

    const {lang, theme} = useContext(statesContext);

    const {latest, popular, oldest,  dateAdded,lastVideoAdded} = language[lang];

    let filterd = type === 'community'? '' : type === 'playlists' ? 'date_added' : 'newest';

    const [sortBy,setSortBy] = useState(filterd);
    const [channelViveos,setChannelViveos] = useState([]);
    const [continuation,setContinuation] = useState(null);
    const [isLoadingMoreData,setIsloadingMoreData] = useState(false);
    const [isLoading,setIsLoading] = useState(true);
    const [isError,setIsError] = useState(null);

    const [playingVideoId, setPlayingVideoId] = useState('');

    useEffect(()=>{
        let filterd = type === 'playlists' ? 'date_added' : 'newest';
        setSortBy(filterd)
    },[type]);

     useEffect(()=>{
          console.log(sortBy);
          setIsLoading(true);
          fetchChannelApi(`channel/${type}?id=${id}&lang=${lang}${type !== 'community' ? '' : `&sort_by=${sortBy}`}`)
          .then((data)=>{
            setChannelViveos(data?.data);
            console.log(data?.data);
            setContinuation(data?.continuation);
            setIsLoading(false);
          })
          .catch((error)=>{
            setIsError(error);
            setIsLoading(false);
          })
     },[id,type,sortBy,lang]);

    const sortByHandler = (arg)=>{
        setSortBy(arg)
    };


    const fetchMoreData = ()=>{
        setIsloadingMoreData(true);
        if(continuation){
            fetchChannelApi(`channel/${type}?id=${id}&lang=${lang}&sort_by=${sortBy}&token=${continuation}`)
            .then((data)=>{
                setChannelViveos(prev => [...prev,...data?.data]);
                setContinuation(data?.continuation);
                setIsloadingMoreData(false);
            })
            .catch(error=> {
                setIsloadingMoreData(false);
            })
        }
    };

    return (
        <div className={`${theme} channel-videos`} > 
            {
                type !== 'community' && 
                <nav className={`${theme} sort-by`}>
                    <ul>
                        <li 
                            className={sortBy === 'newest' || sortBy ===  'date_added' ? 'active' : ''}
                            onClick={()=> sortByHandler(()=>  type === 'playlists' ? 'date_added' :'newest')}
                            >
                                { type === 'playlists' ? dateAdded : latest}
                        </li>
                        <li 
                            className={sortBy === 'popular' || sortBy ===  'last_video_added' ? 'active' : ''}
                            onClick={()=> sortByHandler(()=> type === 'playlists' ? 'last_video_added':'popular')}
                            >
                                {type === 'playlists' ? lastVideoAdded : popular}
                        </li>
                        {
                            type !== 'shorts' && type !== 'playlists' &&
                            <li 
                                className={sortBy === 'oldest' && 'active'}
                                onClick={()=> sortByHandler('oldest')}
                                >
                                    {oldest}
                            </li>
                        }
                    </ul>
                </nav>
            }
             <div className={`${theme} channel-videos-container`}> 
                    {  isError ? <Error error={isError} /> : isLoading ? <Loading /> :
                        type === 'community' ?
                        <div className="community-container">
                            {
                                channelViveos?.map((community)=>(
                                    <PostCard key={community?.postId} community={community} />
                                ))
                            }
                        </div>

                        
                        :
                        type === 'shorts' ?  
                         <div className="shorts-container">
                            {
                                channelViveos?.map((short,_,arr)=>(
                                    <ShortCard key={short?.videoId} short={short} shorts={arr}/>
    
                                ))
                            }
                         </div>
                        
                        :  type === 'playlists' ?  
                           <div className="videos-playlists">
                                {
                                    channelViveos?.map((playlist)=>(
                                        <Playlist playlist={playlist} />
                                    ))
                                }
                           </div>
                        :
                          <div className="videos-playlists">
                              {

                                channelViveos?.map((video)=>(
                                    <Videos 
                                        key={video?.videoId} 
                                        data={video}  
                                        playingVideoId={playingVideoId} 
                                        setPlayingVideoId={setPlayingVideoId}
                                        renderFrom="channel" 
                                    />   
                                ))  
                              }
                          </div>
                }
            </div>
        {
           continuation &&
           <LoadMoreBtn onClickHandler={fetchMoreData} isLoadingMore={isLoadingMoreData} />
        }

      </div>  
    )
};

export default ChannelVideos;
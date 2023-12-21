import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ShortCard from "../SortsCard/ShortCard";
import Playlist from "../PlayListCard/PlayList";
import PostCard from "../PostCard/PostCard";
import VideoCard from "../VideoCard/VideoCard";
import { useContext } from "react";
import { statesContext } from "../../Contexts/statesContext";

const ContentContainer = ({channelViveos,section,handleOnClick,isLoadingMoreData,continuation})=>{

    const {theme} = useContext(statesContext);
     return (
        channelViveos?.length > 0 && 
         
            <div className={`${theme} channel-videos-container`}> 
                {
                       section === 'community' && channelViveos[0]?.type === 'post' ?
                       <div className="community-container">
                           {
                               channelViveos?.map((community)=>(
                                   <PostCard key={community?.postId} community={community} />
                               ))
                           }
                       </div>
    
                       
                       :
                       section === 'shorts' && channelViveos[0]?.type === 'shorts' ?  
                        <div className="shorts-container">
                           {
                               channelViveos?.map((short,_,arr)=>(
                                   <ShortCard key={short?.videoId} short={short} shorts={arr}/>
    
                               ))
                           }
                        </div>
                       
                       :  section === 'playlists' && channelViveos[0]?.type === 'playlist' ?  
                          <div className="videos-playlists">
                               {
                                   channelViveos?.map((playlist)=>(
                                       <Playlist key={playlist?.videoId} playlist={playlist} />
                                   ))
                               }
                          </div>
                       :channelViveos[0]?.type === 'video' && section === 'videos' || section === 'liveStreams' ?
                         <div className="videos-playlists">
                             {
    
                               channelViveos?.map((video)=>(
                                   <VideoCard 
                                       key={video?.videoId} 
                                       data={video}  
                                       renderFrom="channel" 
                                   />   
                               ))  
                             }
                         </div>
                         :''
                }
               {
                   continuation &&
                   <LoadMoreBtn onClickHandler={handleOnClick} isLoadingMore={isLoadingMoreData} />
               }
           </div>

        
     )
};

export default ContentContainer;
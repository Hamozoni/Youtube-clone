import { useContext } from "react";
import { useParams } from "react-router-dom";
// contexts
import { statesContext } from "../../../../Contexts/statesContext";
// components
import CommunityCard from "../../../../Components/CommunityCard/CommunityCard";
import ShortCard from "../../../../Components/SortsCard/ShortCard";
import Playlist from "../../../../Components/PlayListCard/PlayList";
import VideoCard from "../../../../Components/VideoCard/VideoCard";

const ContentContainer = ({channelViveos})=>{

    const {theme} = useContext(statesContext);
    const {section} = useParams();
    
     return (
        channelViveos?.length > 0 && 
         
            <div className={`${theme} channel-videos-container`}> 
                {
                       (section === 'community' && channelViveos[0]?.type === 'post' )?
                       <div className="community-container">
                           {
                               channelViveos?.map((community)=>(
                                   <CommunityCard key={community?.postId} community={community} />
                               ))
                           }
                       </div>
    
                       
                       :
                       (section === 'shorts' && channelViveos[0]?.type === 'shorts') ?  
                        <div className="shorts-container">
                           {
                               channelViveos?.map((short,_,arr)=>(
                                   <ShortCard key={short?.videoId} short={short} shorts={arr}/>
    
                               ))
                           }
                        </div>
                       
                       : ( section === 'playlists' && channelViveos[0]?.type === 'playlist') ?  
                          <div className="videos-playlists">
                               {
                                   channelViveos?.map((playlist)=>(
                                       <Playlist key={playlist?.videoId} playlist={playlist} />
                                   ))
                               }
                          </div>
                       :(channelViveos[0]?.type === 'video' && ( section === 'videos' || section === 'liveStreams') )?
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
           </div>
     )
};
export default ContentContainer;
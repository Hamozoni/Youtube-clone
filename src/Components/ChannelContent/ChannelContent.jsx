import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { fetchChannelApi } from "../../Utils/FetchApi";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";
import { language } from "../../Utils/language";
import { statesContext } from "../../Contexts/statesContext";

import './ChannelContent.scss';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ContentContainer from "./ContentContainer";


const ChannelContent = ()=>{

    const {lang, theme} = useContext(statesContext);

    const {id,section} = useParams()
    const {latest, popular, oldest,  dateAdded,lastVideoAdded} = language[lang];

    const [channelViveos,setChannelViveos] = useState([]);
    const [continuation,setContinuation] = useState(null);
    const [isLoadingMoreData,setIsloadingMoreData] = useState(false);
    const [isLoading,setIsLoading] = useState(true);
    const [isError,setIsError] = useState(null);

    const location = useLocation();
    const searchParam = location?.search?.length ? location?.search?.replace('?','&') : ''

    const sortBy = searchParam?.split('=')[1];
    console.log(`channel/${section}?id=${id}&lang=${lang}${searchParam}`)


    const fetchContent = ()=>{
        setIsLoading(true);
        if(section?.length > 0) {
            fetchChannelApi(`channel/${section}?id=${id}&lang=${lang}${searchParam}`)
            .then((data)=>{
              setChannelViveos(data?.data);
              setIsError(null);
              setContinuation(data?.continuation);
              setIsLoading(false);
            })
            .catch((error)=>{
              setIsError(error);
              setIsLoading(false);
            })
        }
    }



     useEffect(()=>{
        fetchContent();
     },[lang,searchParam,section]);



    const fetchMoreData = ()=>{
        setIsloadingMoreData(true);
        if(continuation){
            fetchChannelApi(`channel/${section}?id=${id}&lang=${lang}&token=${continuation}`)
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

    const navigate = useNavigate();

    const handleSortBy = (searchParam)=>{
           navigate(`?sort_by=${searchParam}`);
    }

    return (
       
        <div className={`${theme} channel-videos`} > 
            {
                section !== 'community' &&
                <nav className={`${theme} sort-by`}>
                    <ul>
                        <li 
                            className={sortBy === 'newest' || sortBy ===  'date_added' ? 'active' : ''}
                            onClick={()=> handleSortBy(section === 'playlists' ?'date_added' : 'newest')}
                            >
                                { section === 'playlists' ? dateAdded : latest}
                        </li>
                        <li 
                            className={sortBy === 'popular' || sortBy ===  'last_video_added' ? 'active' : ''}
                            onClick={()=> handleSortBy(section === 'playlists' ?'last_video_added' : 'popular')}
                            >
                                {section === 'playlists' ? lastVideoAdded : popular}
                        </li>
                        {
                            section !== 'shorts' && section !== 'playlists' &&
                            <li 
                                className={sortBy === 'oldest' && 'active'}
                                onClick={()=> handleSortBy('oldest')}
                                >
                                    {oldest}
                            </li>
                        }
                    </ul>
                </nav>
            }
            {
             isError ? <Error error={isError} /> : isLoading ? <Loading /> :
             <ContentContainer 
                channelViveos={channelViveos}  
                section={section}
                handleOnClick={fetchMoreData}
                isLoadingMoreData={isLoadingMoreData}
                continuation={continuation}
                />
            }

      </div>  
    )
};

export default ChannelContent;
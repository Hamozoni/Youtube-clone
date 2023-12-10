import './ListVideosCard.scss';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ClearIcon from '@mui/icons-material/Clear';

import { useParams } from 'react-router-dom';
import { memo, useContext, useEffect, useState } from 'react';
import { fetchChannelApi} from '../../Utils/FetchApi';
import  Loading from '../../Components/Loading/Loading';
import { statesContext } from '../../Contexts/statesContext';
import { useNavigate } from 'react-router-dom';

import Error from '../../Components/Error/Error';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';

const ListVideosCard = ()=> {

    const {id,plId,index} = useParams();

    const {lang, theme} = useContext(statesContext);

    const [playListDetails,setPlayListDetails] = useState(null);
    const [ListVideos,setListVideos] = useState(null);
    const [isListClose,setIsListClose] = useState(false);
    const [continuation,setContinuation] = useState(false);
    const [isLoadingMore,setIsLoadingMore] = useState(false);

    const [isLoading,setIsLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect(()=>{
        setIsLoading(true)
        fetchChannelApi(`playlist?id=${plId}&lang=${lang}`)
         .then((data)=>{
            setPlayListDetails(data?.meta);
            setListVideos(data?.data);
            setContinuation(data?.continuation);
            setIsLoading(false);
            setError(null)
            console.log(data);
         })
         .catch((error)=> {
            setIsLoading(false);
            setError(error);
         })

    },[plId]);

    const navigate = useNavigate();

    const fetchMoreData = ()=>{
        setIsLoadingMore(true);
        fetchChannelApi(`playlist?id=${plId}&token=${continuation}&lang=${lang}`)
        .then( data => {
            setListVideos(prev => [...prev,...data?.data]);
            setContinuation(data?.continuation);
            setIsLoadingMore(false);
        })
    }

    return (
        error ? <Error error={error}/> : isLoading ? <Loading /> :
         <div className={!isListClose ? `${theme} list-v-card active` :`${theme} list-v-card`}>
            <div className={`${theme} list-header`}>
                <div className={`${theme} h-left`}>
                    <h4 className={`${theme} l-title`}>
                        {playListDetails?.title}
                    </h4>
                    <h5 className={`${theme} owner-channel`} >
                        {playListDetails?.channelTitle} - {index} / {playListDetails?.videoCount}
                    </h5>
                </div>
                <button className={`${theme} l-toggle-btn`}
                        onClick={()=> setIsListClose(!isListClose)}
                        >
                   {isListClose ? <KeyboardArrowDownIcon /> : <ClearIcon />}
                </button>
            </div>
            <div className={isListClose ? `${theme} pl-v-content hidden` :`${theme} pl-v-content`}>
                {ListVideos?.map((video,i)=> (
                    <div  onClick={()=> {
                            navigate(`/watch/${video?.videoId}/list/${plId}/${video?.index}`);
                         }}
                        key={video?.videoId} 
                        className={id === video?.videoId?`${theme} active pl-card`: `${theme} pl-card`}
                        >
                       <div className={`${theme} lift-img`}>
                            <img src={video?.thumbnail[0]?.url || video?.thumbnail[1]?.url} alt="" />
                            <spa className={`${theme} v-length`}>{video?.lengthText}</spa>
                       </div>
                       <div className={`${theme} right-content`}>
                            <h5 className={`${theme} l-v-title`}>
                                {video?.title?.length > 55 ? `${video?.title.slice(0,55)}...`: video?.title}
                            </h5>
                            <h6 className={`${theme} l-ch-name`}>
                                {video?.videoOwnerChannelTitle}
                            </h6>
                       </div>
                    </div>
                ))}
                {
                    continuation?.length > 0 && 
                    <LoadMoreBtn onClickHandler={fetchMoreData} isLoadingMore={isLoadingMore}/>
               }
            </div>
        </div>
    );
};

export default memo(ListVideosCard);
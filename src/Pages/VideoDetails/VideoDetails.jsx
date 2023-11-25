import './VideoDetails.scss';
import { useState, useEffect, useContext} from 'react';
import { useParams } from 'react-router-dom';

import Loading from '../../Components/Loading/Loading';
import RelatedVideos from "../../Components/RelatedVideos/RelatedVideos"
import { fetchChannelApi } from '../../Utils/FetchApi';
import VideoPlayer from '../../Components/VidiesPlayer/VideoPlayer';
import Error from '../../Components/Error/Error';
import { statesContext } from '../../Contexts/statesContext';

const VideoDetails = ()=> {

    const { lang, theme} = useContext(statesContext);


    const {id} = useParams();
    const [isLoading,setIsLoading] = useState(true);
    const [videos,setVideos] = useState([]);
    const [isError,setIsErroe] = useState(false);
    const [error,setErroe] = useState(null);
    const [videoDetail,setVideoDetail] = useState();
    const [relatedKeywords,setRelatedKeywords] = useState(null);
    const [keyword,setKeywords] = useState(null);
    const [iskeyChanged,setKeyChanged] = useState(false);
    const [continuation,setContinuation] = useState(null);
    const [isLoadingMore, setIsLoadingMore] = useState(false)

    useEffect(()=>{
        setIsErroe(false)
        setIsLoading(true)  
        fetchChannelApi(`video/info?id=${id}&extend=+1&lang=${lang}`)
        .then((data)=>{
            setVideos(data?.relatedVideos?.data);
            setContinuation(data?.relatedVideos?.continuation);
            setVideoDetail(data);
            setRelatedKeywords(data?.keywords)
            console.log(data);
            setIsLoading(false)
        })
        .catch((error)=> {
            setIsErroe(true)
            setErroe(error)
        })

    },[id,lang])

    const relatedKeywordsHandler = (key)=>{
        setKeyChanged(true);
        setKeywords(key);
        fetchChannelApi(`search?query=${key}&type=video&lang=${lang}`)
        .then((data)=>{
            setVideos(data?.data);
            setKeyChanged(false);
            setContinuation(data?.continuation);
        })
    };

    const loadMore =()=>{
        setIsLoadingMore(true);
        if(continuation?.length > 0){
            fetchChannelApi(`related?id=${id}&token=${continuation}&lang=${lang}`)
            .then((data)=>{
                setVideos( prev => [...prev,...data?.data]);
                setContinuation(data?.continuation);
                setIsLoadingMore(false)
            })
            .catch(()=>{
                setIsLoadingMore(false);
            })
        }
    }

    return (
        isError ? <Error error={error} /> : isLoading ? <Loading /> :
        <main className={`${theme} video-details`} >
            <div className={`${theme} container`}>
                <VideoPlayer id={id} videoDetail={videoDetail} />
               <section className={`${theme} related-video`}>
                    {
                        relatedKeywords?.length > 0 &&
                        <nav className="related-keywords">
                            <ul className='taps'>
                                {
                                    relatedKeywords?.map((key)=>(
                                        <li className={key === keyword && 'active'} onClick={()=>relatedKeywordsHandler(key)} key={key}>{key}</li>
                                    ))
                                } 
                            </ul>
                        </nav>
                    }
                   {isLoading ? <Loading />: <RelatedVideos elements={videos} renderFrom="watch"/> } 
                   {iskeyChanged && <div className="key-loading"><span>loading...</span></div>}
                   {
                    continuation.length > 0 && 
                    <div className={`${theme} load-more`}> 
                       <button type="button" disabled={isLoadingMore} onClick={loadMore} >{isLoadingMore ? 'loading...':'load more'}</button>
                    </div>
                   }
               </section>
            </div>
        </main>
    );
};

export default VideoDetails;
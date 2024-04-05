import { useState, useEffect, useContext, createContext} from 'react';
import { useParams } from 'react-router-dom';

import './Watch.scss';

import { fetchChannelApi } from '../../Utils/FetchApi';
import { statesContext } from '../../Contexts/statesContext';

import Loading from '../../Components/Loading/Loading';
import RelatedVideos from "../../Components/RelatedVideos/RelatedVideos"
import VideoPlayer from '../../Components/VidiesPlayer/VideoPlayer';
import Error from '../../Components/Error/Error';
import LoadMoreBtn from '../../Components/LoadMoreBtn/LoadMoreBtn';

export const videoDetailsContext = createContext();

const VideoDetails = ({children})=> {

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
        <videoDetailsContext.Provider value={{videoDetail}}>
            <main className={`${theme} video-details`} >
                <div className={`${theme} container`}>
                    <VideoPlayer  /> 
                <section className={`${theme} related-video`}>
                        {children}
                        {
                            relatedKeywords?.length > 0 &&
                            <div className={`${theme} related-keywords video-pla`}>
                                <nav className="related-container">
                                    <ul className='taps'>
                                        {
                                            relatedKeywords?.map((key)=>(
                                                <li 
                                                    className={key === keyword ? `active ${theme}` : theme}
                                                    onClick={()=>relatedKeywordsHandler(key)} 
                                                    key={key}
                                                    >
                                                        {key}
                                                </li>
                                            ))
                                        } 
                                    </ul>
                                </nav>
                            </div>
                        }
                    {  
                        isLoading ? <Loading /> : 
                            <RelatedVideos 
                                elements={videos} 
                                renderFrom="watch"
                                /> 
                    } 
                    { 
                        iskeyChanged && 
                            <div className="key-loading">
                                <span></span>
                            </div>
                   }
                    {
                        continuation.length > 0 && 

                        <LoadMoreBtn 
                            isLoadingMore={isLoadingMore}
                            onClickHandler={loadMore}
                             />
                    }
                </section>
                </div>
            </main>
        </videoDetailsContext.Provider>
    );
};

export default VideoDetails;
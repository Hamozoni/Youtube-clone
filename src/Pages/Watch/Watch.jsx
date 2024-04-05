import { useState, useEffect, useContext, createContext} from 'react';
import { useParams } from 'react-router-dom';

import './Watch.scss';

import { fetchChannelApi } from '../../Utils/FetchApi';
import { statesContext } from '../../Contexts/statesContext';

import RelatedVideos from "../../Components/RelatedVideos/RelatedVideos"
import VideoPlayer from '../../Components/VidiesPlayer/VideoPlayer';
import Error from '../../Components/Error/Error';
import LoadMoreBtn from '../../Components/LoadMoreBtn/LoadMoreBtn';
import Refinements from '../../Components/Refinements/Refinements';
import WatchLoading from '../../Components/Loading/WatchLoading/WatchLoading';


const VideoDetails = ({children})=> {

    const { lang, theme} = useContext(statesContext);

    const [relatedVidoes,setRelatedVideos] = useState(null);
    const [continuation,setContinuation] = useState('');
    const [error,setError] = useState(null);
    const [isPending,setIsPending] = useState(true);

    const {id} = useParams();

    const fetchRelatedVideos = ()=> {
        setError(null);
        setIsPending(true)
        fetchChannelApi(`related?id=${id}&lang=${lang}&token=${continuation}`)
        .then((data)=> {
            setRelatedVideos(data?.data);
            setContinuation(data?.continuation);
        })
        .catch((error)=> {
            setError(error)
        })
        .finally(()=> {
            setIsPending(false);
        })
    }

    useEffect(fetchRelatedVideos,[id,continuation,lang]);


    return (
        error ? <Error error={error} /> : isLoading ? <WatchLoading /> :
            <main className='video-details' >
                <div className='container'>
                    <VideoPlayer  /> 
                    <section className='related-video'>
                            {children}
                            {/* {
                                relatedKeywords?.length > 0 &&
                                <Refinements refinements={relatedKeywords} onClick={relatedKeywordsHandler} />
                            } */}
     
                            <RelatedVideos 
                                elements={videos} 
                                renderFrom="watch"
                                /> 
                        
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
    );
};

export default VideoDetails;
import { useState, useEffect, useContext} from 'react';
import { useParams } from 'react-router-dom';

import './Watch.scss';

import { fetchChannelApi } from '../../Lib/FetchApi';
import { statesContext } from '../../Contexts/statesContext';

import RelatedVideos from "../../Components/RelatedVideos/RelatedVideos"
import VideoPlayer from '../../Components/VidiesPlayer/VideoPlayer';
import Error from '../../Layouts/Error/Error';
import LoadMoreBtn from '../../Layouts/LoadMoreBtn/LoadMoreBtn';
import Refinements from '../../Components/Refinements/Refinements';
import RelatedLoading from '../../Components/Loading/WatchLoading/RelatedLoading';


const VideoDetails = ({children})=> {

    const { lang,theme} = useContext(statesContext);

    const [relatedVidoes,setRelatedVideos] = useState(null);
    const [keywords,setKeywords] = useState(null);
    const [continuation,setContinuation] = useState('');
    const [error,setError] = useState(null);
    const [isPending,setIsPending] = useState(true);
    const [isLoadingMore,setIsLoadingMore] = useState(false);
    const [isFetchingKeywordData,setIsFetchingKeywordData] = useState(false);
    const [loadMoreDataFrom,setLoadMoreDataFrom] = useState('relate')


    const {id} = useParams();

    const fetchRelatedVideos = (isLoadMore = false)=> {
        setLoadMoreDataFrom('related');
        setError(null);
        if(isLoadMore){
            setIsLoadingMore(true);
        }else {
            window.scrollTo(0,0)
            setIsPending(true);
        };

        fetchChannelApi(`related?id=${id}&lang=${lang}&token=${continuation}`)
        .then((data)=> {
            setContinuation(data?.continuation);

            if(isLoadMore){
                setRelatedVideos(prev => [...prev,...data?.data]);
            }else {
                setRelatedVideos(data?.data);
            };
        })
        .catch((error)=> {
            setError(error)
        })
        .finally(()=> {
            setIsPending(false);
            setIsLoadingMore(false);
        })
    };

    useEffect(fetchRelatedVideos,[id,lang]);

    const handleKeywordsFetch = (key,isLoadMore = false)=> {
        setError(null);
        setLoadMoreDataFrom('keyword');
        if(isLoadMore){
            setIsLoadingMore(true);
        }else {
            setIsFetchingKeywordData(true);
        };

        fetchChannelApi(`search?query=${key}&lang=${lang}`)
        .then(data => {

            if(isLoadMore) {
                setRelatedVideos(prev => [...prev,...data?.data]);
            }else {
                setRelatedVideos(data?.data);
            };

            setContinuation(data?.continuation);
        })
        .catch(error => {
            setError(error);
        })
        .finally(()=> {
            setIsFetchingKeywordData(false);
            setIsLoadingMore(false);
        })
    };

    const handleMoreData = (key)=> {
      if ( loadMoreDataFrom === 'related') {
            fetchRelatedVideos(true);
       }else {
           handleKeywordsFetch(key,true);
       } 
    }


    return (
        <main className='video-details' >
                <div className='container'>
                    <VideoPlayer  setKeywords={setKeywords} />
                        <section className='related-video'>
                                {children}
                            { 
                              error ? <Error error={error} /> : isPending ? <RelatedLoading /> :
                               <>
                                    { 
                                        keywords &&
                                        <Refinements 
                                            refinements={keywords} 
                                            onClick={handleKeywordsFetch} />
                                    }
                                
        
                                    <RelatedVideos 
                                        elements={relatedVidoes} 
                                        /> 
                                    {
                                        isFetchingKeywordData &&
                                            <div className={`b-g-t-${theme} absolute key-loading`}>
                                                <span></span>
                                            </div>
                                    }
                                    {
                                        continuation?.length > 0 && 
    
                                        <LoadMoreBtn 
                                            isLoadingMore={isLoadingMore}
                                            onClickHandler={handleMoreData}
                                            />

                                    }
                                
                
                                
                                </>
                            }
                        </section>
                </div>
            </main>
    );
};

export default VideoDetails;
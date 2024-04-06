import { useState, useEffect, useContext} from 'react';
import { useParams } from 'react-router-dom';

import './Watch.scss';

import { fetchChannelApi } from '../../Utils/FetchApi';
import { statesContext } from '../../Contexts/statesContext';

import RelatedVideos from "../../Components/RelatedVideos/RelatedVideos"
import VideoPlayer from '../../Components/VidiesPlayer/VideoPlayer';
import Error from '../../Components/Error/Error';
import LoadMoreBtn from '../../Components/LoadMoreBtn/LoadMoreBtn';
import Refinements from '../../Components/Refinements/Refinements';
import RelatedLoading from '../../Components/Loading/WatchLoading/RelatedLoading';
import { Face } from '@mui/icons-material';


const VideoDetails = ({children})=> {

    const { lang,theme} = useContext(statesContext);

    const [relatedVidoes,setRelatedVideos] = useState(null);
    const [keywords,setKeywords] = useState(null);
    const [continuation,setContinuation] = useState('');
    const [error,setError] = useState(null);
    const [isPending,setIsPending] = useState(true);
    const [isLoadingMore,setIsLoadingMore] = useState(false);
    const [isFetchingKeywordData,setIsFetchingKeywordData] = useState(false);


    const {id} = useParams();

    const fetchRelatedVideos = (isLoadMore = false)=> {
        
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

    const handleKeywordsFetch = (key)=> {
        setIsFetchingKeywordData(true)
        fetchChannelApi(`search?query=${key}&lang=${lang}`)
        .then(data => {
            setRelatedVideos(data?.data);
            console.log(data)
        })
        .catch(error => {
            setError(error);
        })
        .finally(()=> {
            setIsFetchingKeywordData(false)
        })
    }


    return (
        <main className='video-details' >
                <div className='container'>
                    <VideoPlayer  setKeywords={setKeywords} />
                    {
                         error ? <Error error={error} /> : isPending ? <RelatedLoading /> :
                        <section className='related-video'>
                                {children}
                                {
                                    keywords &&
                                    <Refinements refinements={keywords} onClick={handleKeywordsFetch} />
                                }
        
                                <RelatedVideos 
                                    elements={relatedVidoes} 
                                    renderFrom="watch"
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
                                        onClickHandler={()=> fetchRelatedVideos(true)}
                                        />
                                }
                        </section>
                    } 
                </div>
            </main>
    );
};

export default VideoDetails;
import { useState, useEffect, useContext} from 'react';
import { useParams } from 'react-router-dom';

import './Watch.scss';

import { fetchChannelApi } from '../../Utils/FetchApi';
import { statesContext } from '../../Contexts/statesContext';

import RelatedVideos from "../../Components/RelatedVideos/RelatedVideos"
import VideoPlayer from '../../Components/VidiesPlayer/VideoPlayer';
import Error from '../../Components/Error/Error';
// import LoadMoreBtn from '../../Components/LoadMoreBtn/LoadMoreBtn';
import Refinements from '../../Components/Refinements/Refinements';
import LoadingRelatedVideos from '../../Components/Loading/LoadingRelatedVideos/LoadingRelatedVideos';


const VideoDetails = ({children})=> {

    const { lang} = useContext(statesContext);

    const [relatedVidoes,setRelatedVideos] = useState(null);
    const [keywords,setKeywords] = useState(null);
    const [continuation,setContinuation] = useState('');
    const [error,setError] = useState(null);
    const [isPending,setIsPending] = useState(true);

    const {id} = useParams();

    const fetchRelatedVideos = ()=> {
        setError(null);
        setIsPending(true);
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

    useEffect(fetchRelatedVideos,[id,lang]);


    return (
        <main className='video-details' >
                <div className='container'>
                    <VideoPlayer  setKeywords={setKeywords} />
                    {
                         error ? <Error error={error} /> : isPending ? <LoadingRelatedVideos display='flex' /> :
                        <section className='related-video'>
                                {children}
                                {
                                    keywords &&
                                    <Refinements refinements={keywords} onClick='' />
                                }
        
                                <RelatedVideos 
                                    elements={relatedVidoes} 
                                    renderFrom="watch"
                                    /> 
                            
                            
                                
                                    {/* <div className="key-loading">
                                        <span></span>
                                     </div> */}
                
                            {/* {
                                continuation?.length > 0 && 

                                <LoadMoreBtn 
                                    isLoadingMore={isLoadingMore}
                                    onClickHandler={loadMore}
                                    />
                            } */}
                        </section>
                    } 
                </div>
            </main>
    );
};

export default VideoDetails;
import './PlayListVideos.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchChannelApi} from '../../Utils/FetchApi';
import  Loading from '../../Components/Loading/Loading';
import  VideoPlayer from '../../Components/VidiesPlayer/VideoPlayer';
import ListVideosCard from '../../Components/ListVideosCard/ListVideosCard';
import Error from '../../Components/Error/Error';
import RelatedVideos from '../../Components/RelatedVideos/RelatedVideos';

const PlayListVideos = ()=> {
    
    const {id} = useParams();

    const [playListDetails,setPlayListDetails] = useState(null);
    const [ListVideos,setListVideos] = useState(null);
    const [isLoading,setIsLoading] = useState(true);
    const [isError,setIsError] = useState(false);
    const [error,setError] = useState(null);
    const [videos,setVideos] = useState(null);

    const [listVideoId,setListVideoId] = useState(0)

    useEffect(()=>{
        setIsLoading(true)
        fetchChannelApi(`playlist?id=${id}`)
         .then((data)=>{
            setPlayListDetails(data?.meta);
            setListVideos(data?.data);
            console.log(data?.data)
            setIsLoading(false)
         })
         .catch((error)=> {
            setIsError(true);
            setError(error);
         })

    },[id,listVideoId])

    useEffect(()=> {
        setIsLoading(true)
        if (ListVideos) {
            fetchChannelApi(`related?id=${ListVideos[listVideoId]?.videoId}`)
            .then((data)=>{
                setVideos(data?.data);
                console.log(data?.data);
                setIsLoading(false);
            })
            .catch((error)=>{
                setIsError(true);
                setError(error);
            })

         }

    },[ListVideos,listVideoId])

    return (
        isError ? <Error error={error} /> :
        <div className="p-list-v">
          { isLoading ? <Loading /> :
           <>
            <VideoPlayer id={ListVideos[listVideoId]?.videoId} />
            <div className="right-videos">
                <ListVideosCard meta={playListDetails} data={ListVideos} setVideoId={setListVideoId} listVideoId={listVideoId} id={id} />
                <RelatedVideos elements={videos} renderFrom='watch'/>
            </div>
           </>
         }
        </div>
    );
};

export default PlayListVideos;
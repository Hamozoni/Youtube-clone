import './PlayListVideos.scss';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { fetchChannelApi} from '../../Utils/FetchApi';
import  Loading from '../../Components/Loading/Loading';
import  VideoPlayer from '../../Components/VidiesPlayer/VideoPlayer';
import ListVideosCard from '../../Components/ListVideosCard/ListVideosCard';
import Error from '../../Components/Error/Error';
import RelatedVideos from '../../Components/RelatedVideos/RelatedVideos';
import { isThemeDark } from '../../Contexts/Theme';

const PlayListVideos = ()=> {
    
    const {id} = useParams();

    const {lang} = useContext(isThemeDark);

    const [playListDetails,setPlayListDetails] = useState(null);
    const [ListVideos,setListVideos] = useState(null);
    const [isLoading,setIsLoading] = useState(true);
    const [isError,setIsError] = useState(false);
    const [error,setError] = useState(null);
    const [videos,setVideos] = useState(null);

    const [listVideoId,setListVideoId] = useState(0);
    const [videoDetail,setVideoDetail] = useState({});

    useEffect(()=>{
        setIsLoading(true)
        fetchChannelApi(`playlist?id=${id}&lang=${lang}`)
         .then((data)=>{
            setPlayListDetails(data?.meta);
            setListVideos(data?.data);
            console.log(data?.meta)
         })
         .catch((error)=> {
            setIsError(true);
            setError(error);
         })

    },[id,listVideoId])

    useEffect(()=> {
        if(ListVideos?.length) {
            setIsLoading(true)
                fetchChannelApi(`video/info?id=${ListVideos[listVideoId]?.videoId}&extend=+1&lang=${lang}`)
                .then((data)=>{
                    setVideos(data?.relatedVideos?.data);
                    setVideoDetail(data);
                    // setRelatedKeywords(data?.keywords);
                    console.log(data);
                    setIsLoading(false)
                })
                .catch((error)=>{
                    setIsError(true);
                    setError(error);
                })
        }

    },[listVideoId,id])


    return (
        isError ? <Error error={error} /> :
        <div className="p-list-v">
          { isLoading ? <Loading /> :
           <>
            <VideoPlayer videoDetail={videoDetail} id={ListVideos[listVideoId]?.videoId}/>
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
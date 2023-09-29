import './PlayListVideos.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchApi } from '../../Utils/FetchApi';
import  Loading from '../../Components/Loading/Loading';
import  VideoPlayer from '../../Components/VidiesPlayer/VideoPlayer';
import ListVideosCard from '../../Components/ListVideosCard/ListVideosCard';
import Videos from '../../Components/Videos/Videos';
import Error from '../../Components/Error/Error';

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
         fetchApi(`playlist?id=${id}`)
         .then((data)=>{
            setPlayListDetails(data?.meta);
            setListVideos(data?.data);
            setIsLoading(false)
         })
         .catch((error)=> {
            setIsError(true);
            setError(error);
         })

    },[id,listVideoId])

    useEffect(()=> {
        if (ListVideos) {
            fetchApi(`related?id=${ListVideos[listVideoId]?.videoId}&order=date`)
            .then((data)=>{
                setVideos(data?.data);
            })

         }

    },[ListVideos])

    return (
        isError ? <Error error={error} /> :
        <div className="p-list-v">
          { isLoading ? <Loading /> :
           <>
            <VideoPlayer id={ListVideos[listVideoId]?.videoId} />
            <div className="right-videos">
                <ListVideosCard meta={playListDetails} data={ListVideos} setVideoId={setListVideoId} listVideoId={listVideoId} id={id} />
                <Videos videos={videos} isChannell={false}/>
            </div>
           </>
         }
        </div>
    );
};

export default PlayListVideos;
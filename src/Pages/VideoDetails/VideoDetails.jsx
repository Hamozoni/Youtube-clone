import './VideoDetails.scss';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import Loading from '../../Components/Loading/Loading';
import Videos from '../../Components/Videos/Videos';
import { fetchApi } from '../../Utils/FetchApi';
import VideoPlayer from '../../Components/VidiesPlayer/VideoPlayer';
import Error from '../../Components/Error/Error';
import { Theme } from '../../Utils/Colors';
import { isThemeDark } from '../../Contexts/Theme';
import { lang } from '../../Utils/language';




const VideoDetails = ()=> {

    const { isDark, isEng } = useContext(isThemeDark);

    const {id} = useParams();
    const [isLoading,setIsLoading] = useState(true);
    const [videos,setVideos] = useState([]);
    const [isError,setIsErroe] = useState(false);
    const [error,setErroe] = useState(null);



    useEffect(()=>{
        setIsErroe(false)
        setIsLoading(true)  
        fetchApi(`related?id=${id}&order=date`)
        .then((data)=>{
            setVideos(data?.data);
            setIsLoading(false)
        })
        .catch((error)=> {
            setIsErroe(true)
            setErroe(error)
        })

    },[id])

    return (
        isError ? <Error error={error} /> :
        <div className="video-details">
            <div className="container">
                <VideoPlayer id={id} />
               <div className="related-video">
                    <h4 className="relate-title"
                     style={{backgroundColor: Theme[isDark].whiteColor, color: Theme[isDark].lightPrColor}} >
                        {lang[isEng].relVideos}
                    </h4>
                   {isLoading ? <Loading />: <Videos videos={videos} isChannell={false}/> } 
               </div>
            </div>
        </div>
    );
};

export default VideoDetails;
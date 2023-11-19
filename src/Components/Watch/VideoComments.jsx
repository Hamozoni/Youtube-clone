import ClearIcon from '@mui/icons-material/Clear';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Loading from '../Loading/Loading'
import Error from '../Error/Error';
import Comments from '../Comments/Comments'

import { isThemeDark } from '../../Contexts/Theme';
import { language } from '../../Utils/language';

import { useContext, useEffect, useState } from 'react';
import { fetchChannelApi } from '../../Utils/FetchApi';

const VideoComments = ({id, videoDetail})=> {

    const [comments,setComments] = useState([]);
    const [continuation,setContinuation] = useState('')
    const [isLoading,setIsLoading] = useState(true);
    const [error,setError] = useState(null);
    const [isLoadingMore,setIsLoadingMore] = useState(false);
    const [isComm,setComm] = useState(true);
    const { lang } = useContext(isThemeDark);


    useEffect(()=>{
        setIsLoading(true);
        setError(null);
        fetchChannelApi(`comments?id=${id}&sort_by=newest&lang=${lang}`)
            .then((data)=>{
                setComments(data?.data);
                setContinuation(data?.continuation);
                console.log(data)
                setIsLoading(false);
            })
            .catch((err)=>{
                setIsLoading(false);
                setError(err);
            })

    },[id,lang]);

    const loadMore = ()=>{
        setIsLoadingMore(true);
        if(continuation?.length > 0) {
            
            fetchChannelApi(`comments?id=${id}&token=${continuation}&sort_by=newest`)
            .then((data)=>{
                setComments( prev => [...prev,...data?.data]);
                setContinuation(data?.continuation);
                setIsLoadingMore(false);
            })
        }
    }

   return (

        error ? <Error error={error} /> : isLoading ? <Loading /> :
         <div className={!isComm ? "active comments": "comments"}>
                <section className="comment-head"  >
                    <h5 className='comm-title'  onClick={()=>  setComm(!isComm)}>
                        {videoDetail?.commentCountText} {language[lang].comments}
                        <span className='comm-arrows' >
                            {isComm ?<ExpandMoreIcon/> : <ClearIcon />}
                        </span>
                    </h5>
                    <div className="comm-form">
                        <div className="user-img">
                            <img src="" alt="" />
                        </div>
                        <div className="comm-input">
                            <input 
                                className='input'
                                type="text" 
                                placeholder='Add a comment...'
                            />
                            <div className="input-btn">
                                <button> cancel </button>
                                <button> comment </button>
                            </div>
                        </div>
                    </div>
                </section>
                <div className={isComm?"wrapper active":"wrapper"}>  
                    {
                        comments?.map((comment)=>(
                            <Comments key={comment?.commentId} comment={comment} />
                        ))
                    } 
                    
                    {  
                      continuation?.length > 0 &&
                        <div className='load-more'> 
                            <button  disabled={isLoadingMore} onClick={loadMore} >{isLoadingMore ? 'loading...':'load more'}</button>
                        </div>
                    }
                
                </div>

             
            </div>
   )
};

export default VideoComments;
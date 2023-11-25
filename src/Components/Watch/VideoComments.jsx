import ClearIcon from '@mui/icons-material/Clear';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Loading from '../Loading/Loading'
import Error from '../Error/Error';
import Comments from '../Comments/Comments'

import { statesContext } from '../../Contexts/statesContext';
import { language } from '../../Utils/language';

import { useContext, useEffect, useState } from 'react';
import { fetchChannelApi } from '../../Utils/FetchApi';

import './VideoComments.scss';

const VideoComments = ({id, videoDetail})=> {

    const [comments,setComments] = useState([]);
    const [continuation,setContinuation] = useState('')
    const [isLoading,setIsLoading] = useState(true);
    const [error,setError] = useState(null);
    const [isLoadingMore,setIsLoadingMore] = useState(false);
    const [isComm,setComm] = useState(true);

    const { lang,theme } = useContext(statesContext);


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
            
            fetchChannelApi(`comments?id=${id}&lang=${lang}&token=${continuation}&sort_by=newest`)
            .then((data)=>{
                setComments( prev => [...prev,...data?.data]);
                setContinuation(data?.continuation);
                setIsLoadingMore(false);
            })
        }
    }

   return (

        error ? <Error error={error} /> : isLoading ? <Loading /> :
         <div className={`${!isComm  && 'active'} ${theme} comments`}>
                <section className={`${theme} comment-head`} >
                    <h5 className={`${theme} comm-title`}  onClick={()=>  setComm(!isComm)}>
                        {videoDetail?.commentCountText} {language[lang].comments}
                        <span className={`${theme} comm-arrows`} >
                            {isComm ?<ExpandMoreIcon/> : <ClearIcon />}
                        </span>
                    </h5>
                </section>
                <div className={`${isComm && 'active'} ${theme} wrapper`}>  
                    {
                        comments?.map((comment)=>(
                            <Comments key={comment?.commentId} comment={comment} />
                        ))
                    } 
                    
                    {  
                      continuation?.length > 0 &&
                        <div className={`${theme} load-more`}> 
                            <button  disabled={isLoadingMore} onClick={loadMore} >{isLoadingMore ? 'loading...':'load more'}</button>
                        </div>
                    }
                
                </div>

             
            </div>
   )
};

export default VideoComments;
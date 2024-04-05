import ClearIcon from '@mui/icons-material/Clear';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Error from '../Error/Error';
import Comment from './Comment'

import { statesContext } from '../../Contexts/statesContext';
import { language } from '../../Utils/language';

import { useContext, useEffect, useState } from 'react';
import { fetchChannelApi } from '../../Utils/FetchApi';

import './Comments.scss';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';

const VideoComments = ({id,fetchQuery,renderedFrom})=> {

    const [comments,setComments] = useState([]);
    const [commentsCount,setCommentsCount] = useState(0);
    const [continuation,setContinuation] = useState('')
    const [isLoading,setIsLoading] = useState(true);
    const [error,setError] = useState(null);
    const [isLoadingMore,setIsLoadingMore] = useState(false);
    const [isComm,setComm] = useState(true);

    const { lang,theme } = useContext(statesContext);


    useEffect(()=>{
        setIsLoading(true);
        setError(null);
        fetchChannelApi(`${fetchQuery}?id=${id}&sort_by=newest&lang=${lang}`)
            .then((data)=>{
                setComments(data?.data);
                setCommentsCount(data?.commentsCount);
                setContinuation(data?.continuation);
                setIsLoading(false);
            })
            .catch((err)=>{
                setIsLoading(false);
                setError(err);
            })

    },[id,lang,fetchQuery]);

    const loadMore = ()=>{
        setIsLoadingMore(true);
        if(continuation?.length > 0) {
            fetchChannelApi(`${fetchQuery}?id=${id}&lang=${lang}&token=${continuation}&sort_by=newest`)
            .then((data)=>{
                setComments( prev => [...prev,...data?.data]);
                setContinuation(data?.continuation);
                setIsLoadingMore(false);
            })
        }
    }

   return (

        error ? <Error error={error} /> : isLoading ? '' :
         <div className={`${!isComm  && 'active'} ${renderedFrom} ${theme} comments`}>
                <section className={`${theme} comment-head`} >
                    <h5 className={`${theme} comm-title`}  onClick={()=>  setComm(!isComm)}>
                        {commentsCount} {language[lang].comments}
                        {
                          renderedFrom === 'watch'  &&
                            <span className={`${theme} comm-arrows`} >
                                {isComm ?<ExpandMoreIcon/> : <ClearIcon />}
                            </span>
                        }
                    </h5>
                </section>
                <div className={`${isComm && 'active'} ${renderedFrom} ${theme} wrapper`}>  
                    {
                        comments?.map((comment)=>(
                            <Comment key={comment?.commentId} comment={comment} />
                        ))
                    } 
                    
                    {  
                      continuation?.length > 0 &&
                      <LoadMoreBtn onClickHandler={loadMore} isLoadingMore={isLoadingMore}/>
                    }
                
                </div>
         </div>
   )
};

export default VideoComments;